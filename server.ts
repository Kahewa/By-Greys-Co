import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { DEFAULT_SETTINGS } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const settingsPath = path.join(process.cwd(), 'settings.json');

  // Helper to get settings
  const getSettings = () => {
    if (fs.existsSync(settingsPath)) {
      try {
        const data = fs.readFileSync(settingsPath, 'utf-8');
        return JSON.parse(data);
      } catch (err) {
        console.error("Error reading settings.json, falling back to DEFAULT_SETTINGS:", err);
      }
    }
    // If settings.json doesn't exist or is corrupted, write DEFAULT_SETTINGS to it
    try {
      fs.writeFileSync(settingsPath, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
    } catch (err) {
      console.error("Error writing settings.json:", err);
    }
    return DEFAULT_SETTINGS;
  };

  // API routes FIRST
  app.get("/api/settings", (req, res) => {
    res.json(getSettings());
  });

  app.post("/api/settings", (req, res) => {
    try {
      const updated = req.body;
      fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2), 'utf-8');
      res.json({ success: true, settings: updated });
    } catch (err) {
      console.error("Error saving settings:", err);
      res.status(500).json({ error: "Failed to save settings" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
