import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

type SubmenuProps = {
  tab: "overview" | "settings" | "integrations" | "activities";
};

const Submenu = (props: SubmenuProps) => {
  const { tab } = props;

  const router = useRouter();

  return (
    <nav className="sticky top-[64px] z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto px-8">
        <div className="relative flex h-12 items-center justify-between md:pl-32">
          <Tabs
            defaultValue="account"
            className="w-[400px]"
            orientation="horizontal"
            value={tab}
          >
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="overview"
                className="h-12 rounded-none py-3 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
                onClick={() => {
                  void router.push("/dashboard");
                }}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="h-12 rounded-none py-3 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
                onClick={() => {
                  void router.push("/dashboard/integrations");
                }}
              >
                Integrations
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="h-12 rounded-none py-3 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
                onClick={() => {
                  void router.push("/dashboard/activities");
                }}
              >
                Activities
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="h-12 rounded-none py-3 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
                onClick={() => {
                  void router.push("/dashboard/settings");
                }}
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </nav>
  );
};

export default Submenu;
