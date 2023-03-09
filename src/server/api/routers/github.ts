import { Octokit } from "octokit";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const githubRouter = createTRPCRouter({
  getPullRequests: protectedProcedure.query(async ({ ctx }) => {
    const [token] = await ctx.prisma.account.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const octokit = new Octokit({
      auth: token?.access_token,
    });

    try {
      const res = await octokit.request("GET /search/issues", {
        q: `is:pr is:open involves:gileadekelvin archived:false`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }),
});
