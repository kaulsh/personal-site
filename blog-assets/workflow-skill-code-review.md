---
name: code-review
description:
    Reviews code changes using a structured multi-pass approach before a pull
    request is raised for human review. Use when the user asks for a code
    review, wants to review a PR, or asks to review staged/committed changes.
---

# Code Review

## Step 0: Gather Context

1. Run `git diff main...HEAD` to see what changed.
2. Lines with `+` are additions; lines with `-` are deletions. Don't critique
   deleted lines unless their removal introduces a bug.
3. Check the file tree for new files not in the diff (e.g. forgotten config
   files).
4. If a Linear ticket ID is available, fetch it for the goal/requirements.

## Step 1: Multi-Pass Review

-   **Pass 1 — What & Why:** Understand the goal first. Does this solution
    belong in this layer of the stack?
-   **Pass 2 — Logic Flow:** Trace the happy path. Does the logic do what the
    description says?
-   **Pass 3 — Edge Cases:** What if input is null? API times out? Two users act
    simultaneously?
-   **Pass 4 — Housekeeping:** Readability, naming, minor optimizations.

## Step 2: Look for Omissions

Common misses:

-   Missing error handling (try/catch)
-   Missing logs or telemetry
-   Missing tests for new logic
-   Missing documentation updates

Also check deletions — ensure removing code didn't break a hidden dependency.

## Step 3: Structure the Final Report

-   **Executive Summary:** 2-sentence summary of what changes accomplish and
    whether they align with the goal. Flag architectural concerns here.
-   **Critical Logic & Edge Cases:** Functional bugs, race conditions, logic
    gaps. Rank by severity: `[Critical]`, `[Warning]`.
-   **Missing List:** What isn't there but should be (e.g. "Missing error
    handling on line 42").
-   **Readability & Nits:** Minor suggestions prefixed with `[Nit]` or
    `[Non-blocking]`.
-   **Kudos:** 1–2 things the author did well.
-   **Verdict:** **APPROVE**, **COMMENT ONLY**, or **REQUEST CHANGES**.

## Feedback Style

-   Ask questions rather than making demands: "Would a switch statement be
    cleaner as we add more cases?" not "Change this to a switch statement."
-   Prefix minor items with `[Nit]` so authors know they're non-blocking.
-   Acknowledge good work — it encourages quality and reduces defensiveness.
