// router.js
// Modular async router that reads HTML files and serves them.
// Uses fs.promises; returns proper status codes and content types.

import fs from "fs/promises";
import path from "path";
import mime from "mime"; // small helpful package (install with npm i mime). If you don't want extra deps, you can map css/html manually.

export default async function router(req, res, baseDir) {
  const url = req.url.split("?")[0];
  let filePath;
  let status = 200;

  // Map routes to files
  if (url === "/" || url === "/home") {
    filePath = path.join(baseDir, "pages", "home.html");
    status = 200;
  } else if (url === "/about") {
    filePath = path.join(baseDir, "pages", "about.html");
    status = 200;
  } else if (url === "/contact") {
    filePath = path.join(baseDir, "pages", "contact.html");
    status = 200;
  } else if (url.startsWith("/public/")) {
    // Serve static assets under /public
    filePath = path.join(baseDir, url);
    status = 200;
  } else {
    // 404
    filePath = path.join(baseDir, "pages", "404.html");
    status = 404;
  }

  try {
    const data = await fs.readFile(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";
    res.writeHead(status, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    // If file read fails, serve a fallback 404 or 500
    if (status === 404) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - Page not found</h1>");
    } else {
      console.error("File read error:", err);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    }
  }
}
