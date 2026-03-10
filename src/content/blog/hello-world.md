---
title: "Hello, World"
date: 2026-03-10
description: "A kitchen-sink post to preview how various elements render."
published: false
---

This is the first post on my blog — mostly a playground to see how everything looks before I write something real.

## Headings

### H3 looks like this

#### H4 looks like this

## Paragraphs and inline formatting

Regular body text at comfortable reading width. Here's some **bold text**, some *italic text*, and some ~~strikethrough~~. You can also combine them: ***bold and italic***. Inline `code snippets` are styled differently from prose.

Here's a [link to somewhere](https://shashank.gg), which should inherit the accent color and be clearly distinguishable from plain text.

## Lists

An unordered list:

- First item
- Second item, which is a bit longer to see how wrapping behaves at normal viewport widths
- Third item
  - Nested item one
  - Nested item two

An ordered list:

1. Design the thing
2. Build the thing
3. Ship the thing
4. Regret some decisions
5. Repeat

## Blockquotes

> The most dangerous thought you can have as a creative person is to think you know what you're doing.
>
> — Bret Victor

## Code blocks

A short inline snippet: `const x = 42`.

A fenced block with syntax highlighting:

```typescript
interface Post {
  slug: string;
  title: string;
  date: Date;
}

async function getPost(slug: string): Promise<Post | null> {
  const posts = await loadAll();
  return posts.find((p) => p.slug === slug) ?? null;
}
```

A shell snippet:

```bash
pnpm build && rsync -avz dist/ user@host:/var/www/html
```

## Horizontal rule

---

## Tables

| Tool       | Language   | Used for                  |
|------------|------------|---------------------------|
| PostgreSQL | SQL        | Primary data store        |
| Redis      | –          | Caching, pub/sub          |
| Temporal   | TypeScript | Durable workflow engine   |
| Kafka      | –          | Event streaming           |

## Images

Standard markdown image syntax. Should render full-width with some breathing room, without overflowing the prose column.

![A grey placeholder landscape](https://picsum.photos/seed/hello/1200/630)

Captioned images aren't part of the markdown spec, but you can drop a short italic line directly beneath:

![A square sample photo](https://picsum.photos/seed/world/800/800)
*A square crop — good for testing how portrait-ish ratios behave.*

## Video

An embedded `<video>` element with browser-native controls. Hosted video files drop in just like images would.

<video controls width="100%" style="border-radius: 6px;">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  Your browser does not support the video element.
</video>

## A closing note

That's most of the building blocks. If something looks off, this is the place to catch it.
