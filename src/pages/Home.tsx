import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/posts';

const LINKS = [
  { platform: 'GitHub', handle: '@kaulsh', url: 'https://www.github.com/kaulsh' },
  { platform: 'Twitter', handle: '@kaulsh', url: 'https://www.twitter.com/kaulsh' },
  { platform: 'LinkedIn', handle: 'kaulshashank', url: 'https://www.linkedin.com/in/kaulshashank' },
  { platform: 'Bluesky', handle: '@shashank.gg', url: 'https://bsky.app/profile/shashank.gg' },
];

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="page">
      <Helmet>
        <title>Shashank Kaul</title>
        <meta name="description" content="Personal site of Shashank Kaul" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shashank.gg" />
        <meta property="og:title" content="Shashank Kaul" />
        <meta property="og:description" content="Personal site of Shashank Kaul" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kaulsh" />
        <meta name="twitter:title" content="Shashank Kaul" />
        <meta name="twitter:description" content="Personal site of Shashank Kaul" />
        <link rel="canonical" href="https://www.shashank.gg" />
      </Helmet>
      <header className="site-header">
        <h1 className="site-name">Shashank Kaul</h1>
        <p className="site-handle">@kaulsh</p>
      </header>

      <section className="bio">
        <p>I build distributed systems and AI-driven products.</p>
        <p>I'm currently co-founding <a href="https://usescore.ai" target="_blank" rel="noopener noreferrer">Score</a>, where we automate quality assurance for customer experience teams using agentic AI.</p>
        <p>I have 7+ years of experience across backend infrastructure, database scaling, and AI engineering. I have worked with TypeScript, Python, PostgreSQL, MongoDB, AWS, and more.</p>
        <p>I also play Old School RuneScape, the guitar, and enjoy learning new recipes in the kitchen.</p>
        <p>I live in Chennai, India.</p>
      </section>

      <a href="/Resume - Shashank Kaul.pdf" className="resume-link">
        📝 Download my résumé
      </a>

      {posts.length > 0 && (
        <section className="section">
          <h2 className="section-title">Writing</h2>
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="post-link">
                  <span className="post-title">{post.frontmatter.title}</span>
                  <span className="post-date">{formatDate(post.frontmatter.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
        <p>
          Handcrafted with premium procrastination.
        </p>
      </footer>
    </div>
  );
}
