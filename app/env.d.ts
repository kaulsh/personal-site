/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

declare module "*.mdx" {
  import type { FC } from "react";
  const MDXContent: FC;
  export default MDXContent;
  export const frontmatter: Record<string, unknown>;
}
