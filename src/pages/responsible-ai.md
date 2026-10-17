---
layout: ../layouts/Layout.astro
title: Responsible AI — Ratas
description: How Ratas approaches safe, transparent, and accountable AI agents.
---

# Responsible AI

Ratas runs AI agents that act on your behalf — building, deploying, and
operating software, calling tools, and writing and running code. That is far
more capable than a chatbot, and far more consequential, so responsibility is
built into how the platform works. Our approach follows widely recognized
guidance such as the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
and the OECD AI Principles, adapted for agents that take real actions.

## Human oversight & control

You are always in the loop. Agents propose and act, but you hold the controls.

- **Approval for high-impact actions.** Deploying, deleting data, spending
  money, sending messages on your behalf, or changing access are surfaced for
  your review rather than run silently.
- **Reversibility.** Where an action can be undone, you can undo it. Snippets
  and widgets are versioned, so you can roll back to a known-good state.
- **Interruptible.** You can pause, stop, or override an agent at any time.
- **Scoped autonomy.** You decide how much an agent may do on its own; higher
  autonomy is opt-in, not the default.

## Transparency & explainability

- Agents keep an **auditable trace** of the steps they take, the tools they
  call, and the data they touch.
- We are clear about what is automated and what needs your confirmation.
- Agent-generated output is identifiable as agent-produced.
- When an agent takes a non-obvious action, it explains the reasoning and inputs
  behind it so you can judge whether to trust it.

## Safety & guardrails

- **Least privilege by default.** Agents operate inside defined permissions,
  scopes, and isolation boundaries — they only reach the tools and data you
  grant.
- **Confirmation for destructive operations.** Irreversible actions require
  explicit approval.
- **Sandboxed execution.** Code an agent writes runs in constrained, isolated
  environments.
- **Content boundaries.** We decline requests that enable harm, abuse, malware,
  or illegal activity, and we apply heightened caution around sensitive domains.

## Security & resilience

Agentic systems carry risks a plain model does not. We design against them:

- **Prompt injection & tool abuse.** Untrusted content (web pages, files, tool
  output) is treated as data, not as instructions that can hijack an agent.
- **Credential protection.** Secrets and connector credentials are scoped,
  stored securely, and never echoed back in plain text.
- **Blast-radius limits.** Permissions, rate limits, and isolation contain the
  impact of a mistake or a compromised step.

## Reliability & its limits

AI agents can make mistakes, misread intent, or produce incorrect or outdated
output. **Ratas is a tool, not a decision-maker.** Review agent output before
relying on it for anything consequential — especially legal, financial, medical,
or safety matters. We work to make behavior consistent and predictable, but we
do not guarantee correctness, and you should keep a human check on outcomes that
matter.

## Fairness & bias

The models Ratas builds on can reflect biases present in their training data. We
aim to reduce unfair or harmful outcomes, avoid building features that
discriminate on protected characteristics, and encourage you to review
agent-generated logic that affects people (hiring, lending, access, and similar)
before putting it into production.

## Privacy & data

- Your data is used to **run your agents** — not to train shared public models
  without your consent.
- Ratas is built on Cloudflare, whose Workers AI commits to **no training on
  your content** and **zero data retention** for standard inference. See
  Cloudflare's
  [Workers AI data usage](https://developers.cloudflare.com/workers-ai/platform/data-usage/).
- As we grow, we may run models through additional providers that hold to the
  same standard — for example AWS Bedrock, with its zero-data-retention and
  no-training commitments. See AWS's
  [Bedrock security, privacy & responsible AI](https://aws.amazon.com/bedrock/security-privacy-responsible-ai/).
- We collect the **minimum** needed to deliver the service. See our
  [Privacy Policy](/privacy) for details.
- You control your data and can export or delete it.

## Shared accountability

Responsible use is a partnership:

- **You** are responsible for how you use agents, the permissions you grant, and
  the actions you authorize — and for reviewing output before relying on it.
- **We** are responsible for the guardrails, controls, isolation, and
  transparency that make responsible use possible, and for being honest about
  what the platform can and cannot do.

## Reporting a concern

Found misuse, a safety or security issue, or unexpected behaviour? Please tell
us — we take reports seriously and will not penalize good-faith disclosure:
**admin@ratas.ai**

<!-- DRAFT: review with counsel and expand before launch. -->
