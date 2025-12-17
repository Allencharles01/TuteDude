// server.js
// Start the server: node server.js
import http from "http";
import { fileURLToPath } from "url";
import path from "path";
import router from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // Log each request (simple)
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  try {
    // Pass request/response to the router (modular + async)
    await router(req, res, __dirname);
  } catch (err) {
    // Generic 500 on unexpected errors
    console.error("Server error:", err);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>500 - Internal Server Error</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
