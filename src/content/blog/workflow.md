---
title: "Improving my development workflow"
date: 2026-03-11
description: ""
published: false
---

At Score, we've been a 2-man team for a long time now. Interns came and went, but we've continued to increase our own efficiency as time has passed.

Today, our codebase sits at about 200k lines of code; a number which can be debated endlessly about how it may or may not be absurd for a single person to manage. But that's not the point, lines of code written is in no way a function of how productive a person is nor how complicated a product is. The point is, I still have confidence to say that I have done a good job of compartmentalizing our modules and retaining a healthy mental map of how everything works and connects. But I forsee a world where I'm _still_ single handedly executing our product roadmap but the same confidence would have waivered.

There was a point sometime last year where I had almost no faith in letting Claude go beyond writing/modifying a function or two in our codebase at once. I would almost never open the Chat panel and was happy with the 10-20% productivity boost that `Tab` and `Ctrl+K` gave me. The times I did open the Chat, was to get it to write the first draft of a HTTP route, or an async event subscriber, that would invariably be re-written because I didn't like what it did.

Cut to February, I have used `Ctrl+K` a handful of times (in a month!) and I spend most of my time in Chat. At that point I realized, the only thing stopping me from shipping features incredibly fast (faster than I already did in Jan-Feb), was me. **No this is not an essay about *"autonomous agentic engineering"***.

## How I work

It's hard for a 2-person co-founder team to complicate their workflow. In most cases, such teams are usually feature request factories that have a very thin 1-2 month backlog for their ICPs where they ship MVPs of each item along with some feature requests.

On linear, a ticket usually starts of with a line or two in its description so that [Varun](https://www.linkedin.com/in/4varun20/) and I have some recollection of why this ticket exists and what we are supposed to build/fix/change. At regular occasions, we have meetings where we discuss such tickets and end up with a larger list of bullet points covering things like: what changes are there in the UI, what are we storing, what the user will do, prompt and eval changes, new notifications, new analytics events, and a lot more (superficial) line items.

These bullet points now go through my "codebase-in-a-brain" filter and out come even more bullet points separated into "Backend Changes" and "Frontend Changes". This can take me anywhere between 5 to 60 minutes depending on complexity. These bullet points are usually something like:

* "New API route (`POST /cats/meow`) in `cats.router.ts` should expect A, B, C and do X, Y, Z after which it publishes message L and M"
* "New button placed in toolbar above the table in `routes/cats.tsx` should call `POST /cats/meow`".
* "On consuming message L, do D and E. Remember that F needs to be done in case 1-5"
* ... you get the gist.

These bullet points help me narrow down how much of the code really needs to change to get things working. This in no way is an exhaustive list of work to be done, it's more like a mechanism for me to be sure that I'm not missing something crucial that will block the entire ticket from being built.

I now take the original list and this new list and give it to Cursor Chat in "Plan" mode. The model I pick here to plan is usually always Opus 4.6 (usually medium effort - sometimes high effort for larger branches). An important statement I make to Opus is to dig deeper and find anything that I might be missing to get this work completed. In my experience, this ensures that the first iteration is quite exhaustive.

After 1-2 more iterations on the plan with Opus, I end up with something I'm happy with and send one of the three models, Sonnet 4.6, Composer 1.5 or Kimi K2.5 off to do the work. Here's how I decide:

* **Sonnet 4.6**: I trust this model.
* **Composer 1.5**: I trust this model more than I should.
* **Kimi K2.5**: I don't trust this model.

My deciding factor for any model is trust. I work with every model that intrigues me and determine trust through practice. High trust models costs me more to complete work. But I have confidence in this earned trust, like you would for any employee. This does not mean that high trust models don't make mistakes; a highly trusted human can also make mistakes. It only means that they have proven themselves to be able to get the job done that aligns with me, and that their mistakes can be corrected and not repeated.

Once the code is written, I review the code changes, run the code, test it out manually, iterate if required in the same Chat and then ship it for a manual QA/UAT from Varun.

## The bottlenecks

I spent the better part of my free time last week reviewing some of my older chats where I quickly identified that there are two bottlenecks:

1. writing techincal notes from my meeting notes with varun
2. code review
3. parallelisation

### Technical notes

I have become a firm believer that codebase scanning has been solved by agentic IDEs. I have come to trust Cursor's ability to find files based on my queries more and more over time. Although the trust factor is not as high as I'd like it to be, I believe that if you apply the right model combination with it's first scan, the likelihood of missing an important file drops significantly.

### Code review

### Parallelisation

## The improvements


