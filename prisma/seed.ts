import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // ------------------------------------------------------------------ cleanup
    await prisma.blogTag.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
    console.log("🗑️ Cleared existing data");

    // ------------------------------------------------------------------ users
    const adminHash  = await bcrypt.hash("adminpass123", 10);
    const basicHash  = await bcrypt.hash("password123",  10);
    const basic2Hash = await bcrypt.hash("password123",  10);

    const admin = await prisma.user.create({
        data: {
            name:         "Admin User",
            email:        "admin@blog.com",
            passwordHash: adminHash,
            role:         "ADMIN",
        },
    });

    const alice = await prisma.user.create({
        data: {
            name:         "Alice Johnson",
            email:        "alice@blog.com",
            passwordHash: basicHash,
            role:         "BASIC",
        },
    });

    const bob = await prisma.user.create({
        data: {
            name:         "Bob Smith",
            email:        "bob@blog.com",
            passwordHash: basic2Hash,
            role:         "BASIC",
        },
    });

    console.log("👤 Created users: admin, alice, bob");

    // ------------------------------------------------------------------ tags
    const tagTS = await prisma.tag.create({ data: { name: "TypeScript" } });
    const tagNode = await prisma.tag.create({ data: { name: "Node.js"   } });
    const tagDB   = await prisma.tag.create({ data: { name: "Database"  } });
    const tagAuth = await prisma.tag.create({ data: { name: "Auth"      } });
    const tagAPI  = await prisma.tag.create({ data: { name: "REST API"  } });

    console.log("🏷️ Created tags: TypeScript, Node.js, Database, Auth, REST API");

    // ------------------------------------------------------------------ blogs
    const blog1 = await prisma.blog.create({
        data: {
            title:     "Getting Started with TypeScript",
            content:   "TypeScript is a strongly typed superset of JavaScript. In this post we cover the basics: types, interfaces, generics, and how to set up a TypeScript project from scratch.",
            authorID:  alice.userID,
            published: true,
        },
    });

    const blog2 = await prisma.blog.create({
        data: {
            title:     "Building REST APIs with Node.js and Express",
            content:   "Express is the most popular Node.js framework. We walk through setting up routes, middleware, error handling, and how to structure a scalable project.",
            authorID:  alice.userID,
            published: true,
        },
    });

    const blog3 = await prisma.blog.create({
        data: {
            title:     "PostgreSQL and Prisma ORM Deep Dive",
            content:   "Prisma makes database access easy with auto-generated types and a great developer experience. We explore schema design, migrations, relations, and seeding.",
            authorID:  bob.userID,
            published: true,
        },
    });

    const blog4 = await prisma.blog.create({
        data: {
            title:     "JWT Authentication from Scratch",
            content:   "JSON Web Tokens allow stateless authentication. This post covers signing, verifying, refresh tokens, and best practices for securing your API.",
            authorID:  bob.userID,
            published: false,
        },
    });

    const blog5 = await prisma.blog.create({
        data: {
            title:     "Admin Guide: Managing the Blog Platform",
            content:   "An internal guide for administrators covering user management, role assignment, content moderation, and platform maintenance.",
            authorID:  admin.userID,
            published: false,
        },
    });

    console.log("📝 Created 5 blogs (3 published, 2 drafts)");

    // ------------------------------------------------------------------ blog-tags
    await prisma.blogTag.createMany({
        data: [
            { blogID: blog1.blogID, tagID: tagTS.tagID   },
            { blogID: blog2.blogID, tagID: tagNode.tagID  },
            { blogID: blog2.blogID, tagID: tagAPI.tagID   },
            { blogID: blog3.blogID, tagID: tagDB.tagID    },
            { blogID: blog3.blogID, tagID: tagNode.tagID  },
            { blogID: blog4.blogID, tagID: tagAuth.tagID  },
            { blogID: blog4.blogID, tagID: tagAPI.tagID   },
            { blogID: blog5.blogID, tagID: tagAuth.tagID  },
        ],
    });

    console.log("🔗 Linked blogs to tags");

    // ------------------------------------------------------------------ comments
    await prisma.comment.createMany({
        data: [
            { content: "Great intro! Really helped me understand TypeScript basics.",   authorID: bob.userID,   blogID: blog1.blogID },
            { content: "Could you cover generics in more depth in a follow-up post?",   authorID: admin.userID, blogID: blog1.blogID },
            { content: "This is exactly what I needed for my Node project, thank you!", authorID: bob.userID,   blogID: blog2.blogID },
            { content: "How do you handle file uploads in Express 5?",                  authorID: alice.userID, blogID: blog2.blogID },
            { content: "Prisma Studio is a game changer for debugging queries.",        authorID: alice.userID, blogID: blog3.blogID },
            { content: "Do you have an example with many-to-many relations?",           authorID: admin.userID, blogID: blog3.blogID },
        ],
    });

    console.log("💬 Created 6 comments");

    // ------------------------------------------------------------------ summary
    console.log("\n✅ Seeding complete!");
    console.log("\n📋 Test credentials:");
    console.log("   Admin  → email: admin@blog.com  | password: adminpass123");
    console.log("   Alice  → email: alice@blog.com  | password: password123");
    console.log("   Bob    → email: bob@blog.com    | password: password123");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });