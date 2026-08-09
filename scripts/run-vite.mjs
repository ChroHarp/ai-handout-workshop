import { spawn } from "node:child_process";
import path from "node:path";

const viteBin = path.join(
  process.cwd(),
  "node_modules",
  "vite",
  "bin",
  "vite.js",
);

const args = process.argv.slice(2);
const hasPort = args.some((argument) => argument === "--port" || argument === "-p" || argument.startsWith("--port="));
if (!hasPort) args.push("--port", process.env.PORT || "3000");

const child = spawn(process.execPath, [viteBin, ...args], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
