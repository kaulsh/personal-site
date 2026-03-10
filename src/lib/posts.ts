export interface PostFrontmatter {
  title: string;
  date: Date;
  description?: string;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  data: Record<string, string | boolean | number | Date>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string | boolean | number | Date> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line
        .slice(colonIdx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      // Parse for boolean
      if (val === "true") {
        data[key] = true;
      } else if (val === "false") {
        data[key] = false;
      } else if (/^\d+$/.test(val)) {
        data[key] = Number(val);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        data[key] = new Date(val);
      } else {
        data[key] = val;
      }
    }
  }

  return { data, content: match[2] };
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split("/").pop()!.replace(".md", "");
      const { data, content } = parseFrontmatter(raw);
      console.log(path, data, content);
      return {
        slug,
        frontmatter: data as unknown as PostFrontmatter,
        content,
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
