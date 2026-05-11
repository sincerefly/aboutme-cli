#!/usr/bin/env node

const ESC = "\x1b[";
const RESET = `${ESC}0m`;
const rgb = (r, g, b) => `${ESC}38;2;${r};${g};${b}m`;

const styles = {
  title:   `${ESC}1m${rgb(181, 137,   0)}`,   // bold solarized yellow  (#B58900) — 3:1+ on both bg
  label:   `${ESC}1m${rgb( 38, 139, 210)}`,   // bold solarized blue    (#268BD2)
  accent:  rgb( 42, 161, 152),                 // solarized cyan         (#2AA198)
  link:    `${ESC}4m${rgb( 38, 139, 210)}`,   // underline + solarized blue
  success: rgb(133, 153,   0),                 // solarized green        (#859900)
  muted:   `${ESC}2m`,                         // dim — adapts to terminal bg
  divider: `${ESC}2m`,                         // dim
};

const HR = [{ text: "  ──────────────────────────────────────────────────", style: "divider" }];

const profile = [
  [],
  [{ text: "  ◆  东东's Blog", style: "title" }],
  HR,
  [],
  [
    { text: "  " },
    { text: "你好，我是东东", style: "accent" },
    { text: "。" },
  ],
  [
    { text: "  毕业后曾在 " },
    { text: "北京", style: "accent" },
    { text: " 工作两三年，2017 年回到 " },
    { text: "哈尔滨", style: "accent" },
    { text: " 继续做软件开发，2021 年又回到 " },
    { text: "北京", style: "accent" },
    { text: " 。" },
  ],
  [],
  [{ text: "  现在会在博客里记录值得长期保留的实践、经验和日常片段。" }],
  [
    { text: "  " },
    { text: "关注方向  ", style: "label" },
    { text: "Golang · CI/CD · Kubernetes", style: "accent" },
    { text: " · 静态博客 · 自托管服务" },
  ],
  [],
  HR,
  [
    { text: "  " },
    { text: "Blog    ", style: "label" },
    { text: "https://blog.yasking.org/", style: "link" },
  ],
  [
    { text: "  " },
    { text: "GitHub  ", style: "label" },
    { text: "https://github.com/sincerefly", style: "link" },
  ],
  [
    { text: "  " },
    { text: "npm     ", style: "label" },
    { text: "https://www.npmjs.com/~donxdone", style: "link" },
  ],
  HR,
  [],
  [
    { text: "  " },
    { text: "本站使用 ", style: "muted" },
    { text: "Pelican", style: "accent" },
    { text: " 生成，DNSPod 解析，海外走 ", style: "muted" },
    { text: "Cloudflare Pages", style: "success" },
    { text: "，国内托管在又拍云。", style: "muted" },
  ],
  [],
];

const delayMs = Number.parseInt(process.env.ABOUTME_CLI_DELAY ?? "18", 10);
const shouldColor = process.env.FORCE_COLOR !== undefined || process.env.NO_COLOR === undefined;

function colorize(text, style) {
  if (!shouldColor || !style) return text;
  return `${styles[style]}${text}${RESET}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeAnimated(text) {
  if (delayMs <= 0) {
    process.stdout.write(text);
    return;
  }
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delayMs);
  }
}

for (const line of profile) {
  for (const segment of line) {
    await writeAnimated(colorize(segment.text, segment.style));
  }
  process.stdout.write("\n");
  if (delayMs > 0 && line.length === 0) {
    await sleep(delayMs * 8);
  }
}
