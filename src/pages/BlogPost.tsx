import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MDXProvider } from '@mdx-js/react';
import { getPost } from '../lib/posts';

const SITE_URL = 'https://www.shashank.gg';

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const { title, description, date } = post.frontmatter;
  const { Content } = post;
  const postUrl = `${SITE_URL}/essay/${slug}`;

  return (
    <div className="page">
      <Helmet>
        <title>{title} — Shashank Kaul</title>
        <meta name="description" content={description ?? title} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description ?? title} />
        <meta property="article:published_time" content={new Date(date).toISOString()} />
        <meta property="article:author" content="Shashank Kaul" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kaulsh" />
        <meta name="twitter:creator" content="@kaulsh" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description ?? title} />

        {/* Canonical */}
        <link rel="canonical" href={postUrl} />
      </Helmet>
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
