import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";




export default {
	async fetch(request, env, ctx) {
		if (request.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}
		const contentType = request.headers.get("content-type") || "";

		// Ensure the request is multipart/form-data
		if (!contentType.includes("multipart/form-data")) {
			return new Response(JSON.stringify({ success: false, error: "Invalid content type. Expected multipart/form-data." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}
		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL
		}).$extends(withAccelerate());


		try {
			const formData = await request.formData();

			console.log("Request received :", Object.fromEntries(formData.entries()));

			const data = Object.fromEntries(formData.entries());

			const dbResponse = await saveToDatabase(data, prisma);


			return new Response(
				JSON.stringify({ success: true, data: dbResponse }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ success: false, error: error.message }),
				{ status: 500, headers: { "Content-Type": "application/json" } }
			);

		}


	}
}
async function saveToDatabase(data, prisma) {


				try {
					const result = await prisma.entry.create({
						data: {
							firstName: data.firstName,
							phone: data.phone,
							email: data.email,
							state: data.state,
							agreeRules: data.agreeRules,
							lastName: data.lastName,
							addprizecode: data.addprizecode,
							ticketNumber: data.ticketNumber,
						},
					});

					return result; // Ensure this is a valid JSON object
				} catch (error) {
					console.error("Database error:", error);
					throw new Error("Failed to save data.");
				}
}


