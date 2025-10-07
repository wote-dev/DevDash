"use client";

import { useState, useEffect } from "react";

// Force dynamic rendering to prevent build-time errors with Clerk
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { GitBranch, Star, GitFork, ExternalLink, Settings, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  open_issues_count: number;
  private: boolean;
}

const languageColors: { [key: string]: string } = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  Java: "bg-red-500",
  C: "bg-purple-500",
  "C++": "bg-pink-500",
  Ruby: "bg-red-600",
  PHP: "bg-indigo-500",
  HTML: "bg-orange-600",
  CSS: "bg-blue-600",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-600",
};

export default function Repositories() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const savedGithubUsername = user?.unsafeMetadata?.githubUsername as string;
  const githubAccount = user?.externalAccounts?.find(
    (account) => account.provider === "github"
  );
  const oauthGithubUsername = githubAccount?.username;
  const githubUsername = savedGithubUsername || oauthGithubUsername;

  useEffect(() => {
    async function fetchRepositories() {
      if (!githubUsername) {
        setLoading(false);
        return;
      }

      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DevDash-App',
        };

        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }

        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`,
          { headers }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: GitHubRepo[] = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, [githubUsername]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-10 w-48 mb-3" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show setup message if no GitHub username is configured
  if (!githubUsername) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Repositories
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your active repositories and their statistics
          </p>
        </div>
        <Card className="p-8 text-center">
          <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Connect Your GitHub Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            To see your repositories, please configure your GitHub username in settings.
          </p>
          <Link href="/settings">
            <Button className="bg-primary hover:bg-primary/90">
              Go to Settings
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Show error message if repos failed to load
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Repositories
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your active repositories and their statistics
          </p>
        </div>
        <Card className="p-8 text-center border-red-200 dark:border-red-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Unable to Load Repositories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <Link href="/settings">
            <Button variant="outline">
              Check Settings
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Repositories
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {repos.length} {repos.length === 1 ? 'repository' : 'repositories'} for {githubUsername}
        </p>
      </div>

      {repos.length === 0 ? (
        <Card className="p-8 text-center">
          <GitBranch className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Repositories Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No public repositories found for this GitHub account.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {repos.map((repo) => {
            const languageColor = repo.language ? languageColors[repo.language] || "bg-gray-500" : "bg-gray-500";
            const updatedDate = new Date(repo.updated_at);
            const now = new Date();
            const daysAgo = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24));
            
            let updateText = '';
            if (daysAgo === 0) {
              updateText = 'Updated today';
            } else if (daysAgo === 1) {
              updateText = 'Updated yesterday';
            } else if (daysAgo < 30) {
              updateText = `Updated ${daysAgo} days ago`;
            } else {
              updateText = `Updated ${updatedDate.toLocaleDateString()}`;
            }

            return (
              <div
                key={repo.id}
                className="bg-white dark:bg-black rounded-lg p-5 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {repo.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {repo.private && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {repo.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{repo.forks_count}</span>
                      </div>
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <span className={`h-2 w-2 rounded-full ${languageColor}`}></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{updateText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
