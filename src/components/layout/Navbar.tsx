import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Github, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-b-slate-200">
      <div className="mx-auto px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-row justify-start md:pl-32">
            <Link
              key="main"
              href="/"
              className="pl-2 text-lg font-bold text-slate-900"
            >
              Watch
            </Link>
          </div>
          {sessionData?.user && (
            <div className="flex h-full flex-row items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-7 w-7">
                    <AvatarImage
                      src={sessionData.user.image ?? ""}
                      className="aspect-square h-7 w-7"
                    />
                    {!sessionData.user.image && (
                      <AvatarFallback>
                        {sessionData.user.name?.slice(0, 2).toLocaleUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{sessionData.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a
                      href="https://github.com/gileadekelvin/watch"
                      target="_blank"
                      className="flex flex-row"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => void signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
