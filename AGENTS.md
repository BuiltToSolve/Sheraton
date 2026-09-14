<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sheraton Hotel App Rules

This project is a Next.js hotel booking system for **Sheraton**. Please follow these guidelines:

## Tech Stack & Conventions
- **Framework**: Next.js (App Router), React 19
- **Styling**: Tailwind CSS, `radix-ui`, and Framer Motion. Ensure designs feel premium and responsive.
- **Database & ORM**: PostgreSQL via Prisma (`@prisma/client`).
- **Forms & Validation**: `react-hook-form` + `zod` for robust validation.
- **Language**: Strictly use TypeScript. Ensure strict type safety.

## General AI Instructions
- Always verify the Next.js version specifics using the provided local documentation.
- Maintain a clean, modular architecture in the `app/` directory.
- Preserve all existing comments and docstrings unless explicitly asked to modify them.
