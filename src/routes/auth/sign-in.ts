import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function SignIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/sign-in",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate credentials",
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          401: z.object({
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (!userWithSameEmail) {
        return reply.status(401).send({
          error: "Unauthorized",
          message: "Invalid email or password",
        });
      }

      const passwordIsValid = await compare(password, userWithSameEmail.passwordHash);

      if (!passwordIsValid) {
        return reply.status(401).send({
          error: "Unauthorized",
          message: "Invalid email or password",
        });
      }

      const token = await app.jwt.sign({
        sub: userWithSameEmail.id,
        expiresIn: "1D",
      });

      return reply.status(200).send({ token });
    }
  );
}
