import { spawn } from "node:child_process";

const port = process.env.PORT || "3000";
const wrangler = process.platform === "win32" ? "wrangler.cmd" : "wrangler";

const child = spawn(
  wrangler,
  [
    "dev",
    "--config",
    "dist/server/wrangler.json",
    "--ip",
    "0.0.0.0",
    "--port",
    port,
    "--local",
  ],
  {
    env: {
      ...process.env,
      WRANGLER_SEND_METRICS: process.env.WRANGLER_SEND_METRICS || "false",
    },
    shell: process.platform === "win32",
    stdio: "inherit",
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
