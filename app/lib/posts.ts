import type { ComponentType } from 'react';

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  Content: ComponentType;
}

type MdxModule = {
  default: ComponentType;
  frontmatter: Record<string, unknown>;
};

const mdxModules = import.meta.glob<MdxModule>('../content/blog/*.mdx', {
  eager: true,
}) as Record<string, MdxModule>;

export function getAllPosts(): Post[] {
  return Object.entries(mdxModules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()!.replace(/\.mdx$/, '');
      return {
        slug,
        frontmatter: mod.frontmatter as unknown as PostFrontmatter,
        Content: mod.default,
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
