import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function Auth(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/auth",
      {
        schema: {
          tags: ["Auth"],
          security: [{ bearerAuth: [] }],
          summary: "Verify if the user is authenticated",
          description: "Verify if the user is authenticated",
          response: {
            204: z.null(),
            401: z.object({
              error: z.string(),
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        if (!userId) {
          return reply.status(401).send({
            error: "Unauthorized",
            message: "User not found",
          });
        }

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          return reply.status(401).send({
            error: "Unauthorized",
            message: "User not found",
          });
        }

        return reply.status(204).send();
      }
    );
}
