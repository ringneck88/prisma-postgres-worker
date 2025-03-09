import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === "/favicon.ico")
      return new Response("Resource not found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });

    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    const entry = await prisma.entry.create({
      data: {
        email: `Jon${Math.ceil(Math.random() * 1000)}@gmail.com`, // Replace with actual data
        firstName: "Jon",
        lastName: "Doe",
        ticketnumber: `ticket-${Math.ceil(Math.random() * 1000)}`,
				addprizecode: 0,
				state: '',
				userID: '',
				phone: '',
      },
    });

    return new Response(`Created new entry: ${entry.firstName} ${entry.lastName} (${entry.email}).`);
  },
}
