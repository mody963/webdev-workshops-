import type { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function showHomePage(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "..", "views", "homepage.html"));
}

export { showHomePage };
