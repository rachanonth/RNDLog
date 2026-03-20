import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Upsert the NowPage singleton
  await prisma.nowPage.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      location: "Bangkok, Thailand",
      content: `- Being a dad — most of my energy goes here
- Writing on this blog — thinking out loud about tech and life
- Building side projects — experimenting with Next.js and AI tools
- Reading — currently working through *The Pragmatic Programmer*
`,
    },
  });

  // Upsert sample posts so the seed is idempotent
  await prisma.post.upsert({
    where: { slug: "hello-world" },
    update: {},
    create: {
      title: "Hello World",
      slug: "hello-world",
      excerpt: "My first post on this new site.",
      published: true,
      content: `# Hello World

Welcome to my new site built with **Next.js 15**, **Prisma**, and **Vercel Postgres**.

## What I'm building

This blog will cover topics like:

- Software engineering
- Side projects
- Things I'm learning

## Code example

\`\`\`ts
const greet = (name: string) => \`Hello, \${name}!\`;
console.log(greet("world"));
\`\`\`

Stay tuned for more posts!
`,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
