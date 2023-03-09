import { Octokit } from "octokit";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const searchPulls = async (octokit: Octokit, query: string) => {
  const res = await octokit.request("GET /search/issues", {
    q: query,
    per_page: 30,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return res;
};

const getPullsToReview = async (octokit: Octokit, username: string) => {
  const res = await searchPulls(
    octokit,
    `is:pr is:open review-requested:${username} archived:false`
  );
  const prs = res.data.items?.map((item) => item.number);
  return prs ?? [];
};

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

    const username = "gileadekelvin";

    const pullsInvolved = await searchPulls(
      octokit,
      `is:pr is:open involves:${username} archived:false`
    );
    const pullsToReview = await getPullsToReview(octokit, username);

    const pulls = pullsInvolved.data.items?.map((item) => {
      return {
        ...item,
        review_required: pullsToReview.includes(item.number),
      };
    });

    return {
      ...pullsInvolved.data,
      items: pulls,
    };
  }),
});
