import { Octokit } from "octokit";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  listPRs: protectedProcedure.query(async ({ ctx }) => {
    const token = await ctx.prisma.account.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const octokit = new Octokit({
      auth: token?.[0]?.access_token,
    });

    try {
      const res = await octokit.request("GET /rate_limit", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log(JSON.stringify(res));
    } catch (err) {
      console.error(err);
    }
  }),
});
