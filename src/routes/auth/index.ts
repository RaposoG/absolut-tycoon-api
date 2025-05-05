import { FastifyInstance } from "fastify";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { Auth } from "./auth";

export async function AuthRoutes(app: FastifyInstance) {
  await SignIn(app);
  await SignUp(app);
  await Auth(app);
}
