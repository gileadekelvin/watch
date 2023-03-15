import { cn } from "~/utils/tailwind";

type GithubFiltersProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const GithubFilters = (props: GithubFiltersProps) => {
  const { filter, setFilter } = props;

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border border-gray-200 bg-white p-6">
      <a
        className={cn(
          "cursor-pointer text-start text-sm text-gray-400 hover:text-gray-800 focus:ring-transparent active:scale-100",
          filter === "involved" && "font-medium text-black"
        )}
        onClick={() => {
          setFilter("involved");
        }}
      >
        Involved
      </a>
      <a
        className={cn(
          "cursor-pointer text-start text-sm text-gray-400 hover:text-gray-800 focus:ring-transparent active:scale-100",
          filter === "required" && "font-medium text-black"
        )}
        onClick={() => {
          setFilter("required");
        }}
      >
        Review required
      </a>
      <a
        className={cn(
          "cursor-pointer text-start text-sm text-gray-400 hover:text-gray-800 focus:ring-transparent active:scale-100",
          filter === "approved" && "font-medium text-black"
        )}
        onClick={() => {
          setFilter("approved");
        }}
      >
        Approved
      </a>
      <a
        className={cn(
          "cursor-pointer text-start text-sm text-gray-400 hover:text-gray-800 focus:ring-transparent active:scale-100",
          filter === "changes_requested" && "font-medium text-black"
        )}
        onClick={() => {
          setFilter("changes_requested");
        }}
      >
        Changes requested
      </a>
    </div>
  );
};

export default GithubFilters;
