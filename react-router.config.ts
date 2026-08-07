import type { Config } from "@react-router/dev/config";
import fs from "node:fs";
import path from "node:path";

function getPublishedEssayPaths(): string[] {
  const dir = path.join("app", "content", "blog");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .flatMap((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const published = /^published:\s*true\s*$/m.test(raw);
      if (!published) return [];
      const slug = file.replace(/\.mdx$/, "");
      return [`/essay/${slug}`];
    });
}

export default {
  ssr: false,
  async prerender() {
    return ["/", ...getPublishedEssayPaths()];
  },
} satisfies Config;
