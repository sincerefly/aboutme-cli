import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { test } from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("CLI prints highlighted about information", async () => {
  const { stdout } = await execFileAsync("node", ["./bin/aboutme-cli.js"], {
    env: {
      ...process.env,
      ABOUTME_CLI_DELAY: "0",
      FORCE_COLOR: "1"
    }
  });

  assert.match(stdout, /\x1b\[[0-9;]+m/);
  assert.match(stdout, /\x1b\[1m\x1b\[38;2;212;96;106m/);
  assert.match(stdout, /东东's Blog/);
  assert.match(stdout, /https:\/\/blog\.yasking\.org\//);
  assert.doesNotMatch(stdout, /pages\/about\.html/);
  assert.match(stdout, /Golang · CI\/CD · Kubernetes/);
});
