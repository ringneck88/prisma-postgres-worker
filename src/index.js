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

			console.log("Request received :",request);
		//console.log("Request received env:", await JSON.stringify(await request.json()));
		const formData = await request.json();
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

		const entry = await prisma.entry.create({
			data: formData
		});


    return new Response(`Created new entry: `, entry);
  },
}
