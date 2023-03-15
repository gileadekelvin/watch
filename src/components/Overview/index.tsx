import { formatDistance } from "date-fns";
import {
  GitPullRequest,
  GitPullRequestDraft,
  Tags,
  Siren,
  FileSignature,
} from "lucide-react";

import { api } from "~/utils/api";
import Loading from "~/components/ui/loading";

const extractOwnerAndRepoFromUrl = (url: string) => {
  const matches = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)/);
  if (!matches || matches.length < 3) {
    throw new Error("Invalid GitHub URL");
  }

  const owner = matches[1];
  const repo = matches[2];

  return { owner, repo };
};

type OverviewProps = {
  filter: string;
};

const Overview = (props: OverviewProps) => {
  const { filter } = props;

  const { data, isLoading } = api.github.getPullRequests.useQuery({ filter });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2">
      {data?.items?.map((item) => {
        const { owner, repo } = extractOwnerAndRepoFromUrl(item.html_url);
        return (
          <a
            key={item.id}
            className="flex w-full flex-col rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md"
            href={item.html_url}
            target="_blank"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-row items-center gap-2">
                  <GitPullRequest className="h-5 w-5 text-emerald-500" />
                  <span className="text-md font-semibold text-black">
                    {item.title}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2 pl-7">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-600">
                      #{item.number}
                    </span>
                    <span className="text-gray-600">
                      {" "}
                      {`opened ${formatDistance(
                        new Date(item.created_at),
                        new Date()
                      )} ago by`}{" "}
                    </span>
                    <span className="font-semibold text-gray-600">
                      {item.user?.login}
                    </span>
                    {owner && repo && (
                      <>
                        <span className="text-gray-600"> in </span>
                        <span className="font-semibold text-gray-600">
                          {`${owner}/${repo}`}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              {item.draft && (
                <div className="flex flex-row items-start gap-2">
                  <Siren className="h-5 w-5 text-gray-500" />
                  <div className="flex w-fit flex-row flex-wrap items-center gap-2">
                    {item.draft && (
                      <span className="flex flex-row items-center gap-1 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        <GitPullRequestDraft className="h-3 w-3 text-gray-800" />
                        draft
                      </span>
                    )}
                  </div>
                </div>
              )}
              {item.labels.length > 0 && (
                <div className="flex flex-row items-start gap-2">
                  <div className="h-5 w-5">
                    <Tags className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex w-fit flex-row flex-wrap items-center gap-2">
                    {item.labels?.map((label) => {
                      return (
                        <span
                          key={label.id}
                          className="rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        >
                          {label.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Overview;
