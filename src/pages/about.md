---
layout: ../layouts/Layout.astro
title: About Ratas
description: What Ratas is and why it exists.
---

# About Ratas

**Ratas** is an agentic AI platform. Your agent builds, deploys, operates, and
governs the apps and workflows your business runs on — living inside your
workspace and getting things done, all under your control.

## The name

**Ratas** is short for **Ratatoskr** — the squirrel of Norse mythology that runs
up and down Yggdrasil, the world tree, carrying messages between the eagle at
the crown and the serpent at the roots.

That is exactly what an agent should be: quick, tireless, and always moving —
carrying your intent across every layer of your systems and getting the message
where it needs to go. The squirrel and the tree you see across this site are a
nod to that story.

## The four harts

In the same myth, four harts roam the branches of Yggdrasil — **Dáinn,
Dvalinn, Duneyrr, and Duraþrór**. Ratas has four of its own: the core primitives
every agent works with, layered from the smallest unit up to full processes.
Each layer composes the one below it.

### Snippet

A **snippet** is a unit of code — JavaScript, Python, SQL, Bash, and so on. It
has a typed input and a single return value and is **side-effect free**: given
the same inputs it produces the same output, and nothing else. That makes
snippets deterministic and safe to reuse.

The Rata agent generates snippets as you describe a task. When you run one,
review the output, and approve it, that code is frozen as an **immutable
version**. A snippet accumulates many versions over time, so rollback is a
pointer change — no scrubbing through chat history to recover older logic. The
snippet is the **smallest unit** in the system: Widgets, Gadgets, and Workflows
never inline code — they **reference a pinned snippet version**.

### Widget

A **widget** is a self-contained UI component the agent builds and embeds into
your app's view — for example _Weather Today_, a _to-do list_, an _agent action
log_, or _Quick Actions_. A widget is backed by snippets for its logic and data.
Widgets are versioned like snippets, but the app binds to exactly **one active
version** at a time, so what users see is always a known, pinned build.

### Gadget

A **gadget** is a full web application — a CRM, an HR tool, a PIM, a dashboard —
assembled to your requirements. It composes snippets (logic) and widgets (UI)
into a deployable app with its own URL. Gadgets run inside **isolation
boundaries**: each has its own data, and cross-gadget access is explicit and
controlled rather than implicit.

You can share a gadget's URL with your users, scope their permissions, and
**audit every action** they take. Rata can also operate a gadget on your behalf
— driving its tasks the same way it triggers snippets — so the agent is a
first-class actor inside the app, not just its author.

### Workflow

A **workflow** orchestrates a chain of steps to complete a task — comparable to
n8n or Dify, but with one key difference: **you don't wire nodes on a canvas or
need any technical know-how. You describe it to Rata and it builds the
workflow.** Under the hood it still supports the core control-flow primitives:
**sequential and conditional** branching, **error handling with retries**,
**feedback loops**, **approval gates** and human-in-the-loop input, and
**durable state management** — a run can pause and resume without losing its
place.

> Order placed → Check inventory → _(out of stock → notify the buyer)_ →
> Manager approval _(human-in-the-loop)_ → Create invoice & ship.

A workflow step can call a pinned snippet, read a gadget's data, send email, or
post to Slack or Telegram — composing the smaller primitives into an end-to-end
process.

### Agentic Workflow

Unique to Rata: an **agentic workflow** is a workflow in which one or more steps
are executed by the agent itself rather than by fixed, pre-written logic — so
steps that need perception or judgement (reading, extracting, validating) are
handled by Rata inline. For example, turning a photo of an invoice into a
validated system entry:

```text
[User submits an invoice photo]
        │
        ▼
🐿️ Rata reads the invoice ──(blurry / unreadable)──► [Ask the user to re-shoot]
        │
        ▼ (success)
🐿️ Rata pulls out the details
        │
        ▼
🐿️ Rata checks the details ◄──(missing / wrong)── [Go back and fix]
        │
        ▼ (all good)
[File it into the system]
        ▼
[Done — report the result]
```

The steps marked 🐿️ are where **Rata steps in directly** — reading, extracting,
and judging — while the rest run as ordinary automated steps.

## Why Ratas

#### Not just set up — it runs alongside you

Your agent doesn't stop at creating an app and leaving it there. It stays on
duty, quietly handling the everyday busywork so you're free to focus on the big
things.

#### Just say what you need

Forget the barriers of writing code, technical configuration, or fiddly
drag-and-drop. Simply describe what you want in natural language, and Ratas
takes care of the rest.

#### Experiment freely, without the risk

Change and undo with a single click. Everything stays under your control, so you
can confidently share what you've made with your team or your customers.

#### Start free, grow for the long run

Try it completely free on personal projects, and only upgrade when you truly
need to scale. You can prove the value with confidence before investing a single
cent.

## Who it's for

For individuals and teams who want to automate **building and running** their
software — with no need to hire developers, manage servers, or spend time
learning complicated tools.

Get off to a complete start with a free personal project, and scale smoothly
into a shared workspace whenever your team is ready.

<!-- DRAFT: review and expand before launch. -->
