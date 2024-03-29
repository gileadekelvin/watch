import { type PrismaClient } from "@prisma/client";
import { Octokit } from "octokit";
import { z } from "zod";

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

const GITHUB_FILTER: Record<string, string> = {
  involved: "",
  required: "review:required",
  approved: "review:approved",
  changes_requested: "review:changes_requested",
};

const getUsername = async (
  prisma: PrismaClient,
  userId: string,
  octokit: Octokit
): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.username) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user.username;
  }

  const userGithub = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const userUpdated = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: userGithub.data.login,
    },
  });

  return userUpdated.username as string;
};

export const githubRouter = createTRPCRouter({
  getPullRequests: protectedProcedure
    .input(z.object({ filter: z.string() }))
    .query(async ({ ctx, input }) => {
      const [token] = await ctx.prisma.account.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      const octokit = new Octokit({
        auth: token?.access_token,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const username = await getUsername(
        ctx.prisma,
        ctx.session.user.id,
        octokit
      );

      const pullsInvolved = await searchPulls(
        octokit,
        `is:pr is:open involves:${username} archived:false ${
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          GITHUB_FILTER[input.filter]
        }`
      );

      const pulls = pullsInvolved.data.items?.map((item) => {
        return {
          ...item,
        };
      });

      return {
        ...pullsInvolved.data,
        items: pulls,
      };
    }),
});
