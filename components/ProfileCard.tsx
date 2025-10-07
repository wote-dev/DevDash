"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProfileCard() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  // Get GitHub username from OAuth or metadata
  const githubAccount = user?.externalAccounts?.find(
    (account) => account.provider === "github"
  );
  const githubUsername = 
    (user?.unsafeMetadata?.githubUsername as string) || 
    githubAccount?.username || 
    user?.username || 
    "User";

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-border/50 hover:border-border transition-colors cursor-pointer"
      >
        <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={githubUsername}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <User className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </div>
        <span className="hidden sm:block text-xs font-light text-foreground whitespace-nowrap">
          {githubUsername}
        </span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-background border border-border z-50">
            <div className="py-1">
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 text-xs font-light text-foreground hover:bg-secondary transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Link>
              <SignOutButton>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-light text-foreground hover:bg-secondary transition-colors">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
