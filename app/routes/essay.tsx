import { Link } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import type { Route } from "./+types/essay";
import { getPost } from "../lib/posts";

const SITE_URL = "https://www.shashank.gg";

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = getPost(slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    slug: post.slug,
    frontmatter: post.frontmatter,
  };
}

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  if (!data) {
    return [{ title: "Not Found — Shashank Kaul" }];
  }

  const { title, description, date } = data.frontmatter;
  const postUrl = `${SITE_URL}/essay/${data.slug}`;
  const desc = description || title;

  return [
    { title: `${title} — Shashank Kaul` },
    { name: "description", content: desc },
    { property: "og:type", content: "article" },
    { property: "og:url", content: postUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    {
      property: "article:published_time",
      content: new Date(date).toISOString(),
    },
    { property: "article:author", content: "Shashank Kaul" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@kaulsh" },
    { name: "twitter:creator", content: "@kaulsh" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { tagName: "link", rel: "canonical", href: postUrl },
  ];
}

export default function Essay({ loaderData }: Route.ComponentProps) {
  const post = getPost(loaderData.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const { Content } = post;

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Shashank Kaul
      </Link>
      <article>
        <header className="post-header">
          <h1 className="post-heading">{post.frontmatter.title}</h1>
          <time className="post-time">{formatDate(post.frontmatter.date)}</time>
        </header>
        <div className="prose">
          <MDXProvider>
            <Content />
          </MDXProvider>
        </div>
      </article>
    </div>
  );
}
