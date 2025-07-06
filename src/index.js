import { PrismaClient } from './generated/prisma';
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
			datasourceUrl: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKWkdUTTU0QlQ2NzE0TUdESkU1Sk02MDMiLCJ0ZW5hbnRfaWQiOiI1ZTFlMzg5NGJkM2VhZWJjZDQ1N2JmNzAyYTFjYTIxNjcwNGEzMThmODQwZjg1OTc5ZTdjMTVkYzczMzNiNGU0IiwiaW50ZXJuYWxfc2VjcmV0IjoiZjk1NTNiZTUtNmRkYi00ZjQ5LThhZDQtNWVhMzdiYjMyYjExIn0.WVMwrdQTbpasQFYD8VAfsK7Uulp6coQwvBr_g44bGHc"
		}).$extends(withAccelerate());

		await prisma.$connect()

		try {
			const formData = await request.formData();

			console.log("Request received :", Object.fromEntries(formData.entries()));

			const data = Object.fromEntries(formData.entries());

			const dbResponse = await saveToDatabase(data, prisma);


			return new Response(
				'ok',
				{
					status: 200,
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
		console.error("Database ----- error:"+"url = "+prisma.$datasourceUrl+ "  " + error);
		throw new Error("Failed to save data.");
	}
}
