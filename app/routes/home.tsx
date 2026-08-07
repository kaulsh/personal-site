import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ExternalLinkIcon, GitHubIcon } from "../components/Icons";
import { getAllPosts } from "../lib/posts";
import { tools } from "../lib/tools";

const SITE_URL = "https://www.shashank.gg";

const LINKS = [
  {
    platform: "GitHub",
    handle: "@kaulsh",
    url: "https://www.github.com/kaulsh",
  },
  {
    platform: "Twitter",
    handle: "@kaulsh",
    url: "https://www.twitter.com/kaulsh",
  },
  {
    platform: "LinkedIn",
    handle: "kaulshashank",
    url: "https://www.linkedin.com/in/kaulshashank",
  },
  {
    platform: "Bluesky",
    handle: "@shashank.gg",
    url: "https://bsky.app/profile/shashank.gg",
  },
];

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Shashank Kaul" },
    { name: "description", content: "Personal site of Shashank Kaul" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:title", content: "Shashank Kaul" },
    {
      property: "og:description",
      content: "Personal site of Shashank Kaul",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@kaulsh" },
    { name: "twitter:title", content: "Shashank Kaul" },
    {
      name: "twitter:description",
      content: "Personal site of Shashank Kaul",
    },
    { tagName: "link", rel: "canonical", href: SITE_URL },
  ];
}

export async function loader() {
  return {
    posts: getAllPosts().map((post) => ({
      slug: post.slug,
      frontmatter: post.frontmatter,
    })),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="page">
      <header className="site-header">
        <h1 className="site-name">Shashank Kaul</h1>
        <p className="site-handle">@kaulsh</p>
      </header>

      <section className="bio">
        <p>I build distributed systems and AI-driven products.</p>
        <p>
          Currently, I'm co-founding{" "}
          <a
            href="https://usescore.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Score
          </a>
          , where we're building AI agents to automate quality assurance for
          customer experience teams.
        </p>
        <p>
          I have 8 years of experience in backend infrastructure, database
          scaling, and AI engineering, I work primarily with TypeScript, Python,
          PostgreSQL, MongoDB, and AWS.
        </p>
        <p>
          Beyond coding, I play the guitar, enjoy experimenting with new recipes
          in the kitchen, and occasionally find myself back in Old School
          RuneScape.
        </p>
        <p>I work remotely from Chennai, India.</p>
      </section>

      <p className="resume-links">
        <span className="resume-label">📝 Résumé</span>
        <a href="/resume_shashank_kaul.pdf" className="resume-link">
          PDF
        </a>
        <span className="resume-sep">·</span>
        <a href="/resume_shashank_kaul.md" className="resume-link">
          Markdown
        </a>
      </p>

      {posts.length > 0 && (
        <section className="section">
          <h2 className="section-title">Writing</h2>
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/essay/${post.slug}`} className="post-link">
                  <span className="post-title">{post.frontmatter.title}</span>
                  <span className="post-date">
                    {formatDate(post.frontmatter.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2 className="section-title">Tools</h2>
        <div className="tool-cards">
          {tools.map((tool) => (
            <article key={tool.name} className="tool-card">
              <div className="tool-card-header">
                <h3 className="tool-card-name">{tool.name}</h3>
                <span className="tool-links">
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-link"
                    aria-label={`${tool.name} on GitHub`}
                  >
                    <GitHubIcon />
                  </a>
                  {tool.website && (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tool-link"
                      aria-label={`${tool.name} website`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </span>
              </div>
              {tool.description && (
                <p className="tool-card-description">{tool.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Elsewhere on the internet</h2>
        <ul className="link-list">
          {LINKS.map((link) => (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-platform">{link.platform}</span>
                <span className="social-handle">{link.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="site-footer">
        <p>Handcrafted with premium procrastination.</p>
      </footer>
    </div>
  );
}
