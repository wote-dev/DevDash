"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { GitCommit, FolderGit2, Code2, TrendingUp, TrendingDown, Settings } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GitHubStats {
  commitsThisWeek: number;
  percentChange: number;
  activeRepos: number;
  reposUpdatedToday: number;
  topLanguages: Array<{
    language: string;
    count: number;
    percentage: number;
  }>;
  totalContributions: number;
}

interface WeeklyActivity {
  day: string;
  commits: number;
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
};

export default function Home() {
  const { user } = useUser();
  const { theme, systemTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  
  // Determine if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  const savedGithubUsername = user?.unsafeMetadata?.githubUsername as string;
  
  // Try to get GitHub username from OAuth connection
  const githubAccount = user?.externalAccounts?.find(
    (account) => account.provider === "github"
  );
  const oauthGithubUsername = githubAccount?.username;
  
  // Use OAuth username if available, otherwise use saved username
  const githubUsername = savedGithubUsername || oauthGithubUsername;

  useEffect(() => {
    async function fetchGitHubStats() {
      if (!githubUsername) {
        setLoading(false);
        return;
      }
      
      // Auto-save OAuth username to metadata if not already saved
      if (oauthGithubUsername && !savedGithubUsername && user) {
        try {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              githubUsername: oauthGithubUsername,
            },
          });
        } catch (err) {
          console.error('Error saving GitHub username:', err);
        }
      }

      try {
        const response = await fetch(`/api/github/stats?username=${githubUsername}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }

        const data = await response.json();
        setStats(data.stats);
        setWeeklyActivity(data.weeklyActivity);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError('Failed to load GitHub statistics');
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStats();
  }, [githubUsername, oauthGithubUsername, savedGithubUsername, user]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-7 w-48 mb-1" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-3 w-24 mb-3" />
                <Skeleton className="h-6 w-12 mb-2" />
                <Skeleton className="h-3 w-20" />
              </Card>
            ))}
          </div>
          <Card className="p-4">
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-[320px] w-full" />
          </Card>
        </div>
      </div>
    );
  }

  // Show setup message if no GitHub username is configured
  if (!githubUsername) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-foreground mb-1">
            Developer Activity
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your coding progress and repository statistics
          </p>
        </div>
        <Card className="p-8 text-center">
          <Settings className="h-8 w-8 mx-auto mb-3 text-muted-foreground/50" />
          <h2 className="text-base font-medium text-foreground mb-2">
            Connect Your GitHub Account
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            To see your real developer statistics, please configure your GitHub username in settings.
          </p>
          <Link href="/settings">
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              Go to Settings
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Show error message if stats failed to load
  if (error || !stats) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-foreground mb-1">
            Developer Activity
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your coding progress and repository statistics
          </p>
        </div>
        <Card className="p-8 text-center border-red-200/50 dark:border-red-900/50">
          <h2 className="text-base font-medium text-foreground mb-2">
            Unable to Load Statistics
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {error || "Please check your GitHub username in settings and try again."}
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
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-foreground mb-1">
          Developer Activity
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your coding progress and repository statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Commits Card */}
        <Card className="p-4 hover:border-foreground/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Commits This Week
            </span>
            <GitCommit className="h-4 w-4 text-muted-foreground/40" />
          </div>
          <div className="text-2xl font-light text-foreground mb-1.5">
            {stats.commitsThisWeek}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            {stats.percentChange >= 0 ? (
              <TrendingUp className="h-3 w-3 text-foreground/60" />
            ) : (
              <TrendingDown className="h-3 w-3 text-foreground/60" />
            )}
            <span className="text-foreground/60">
              {stats.percentChange >= 0 ? "+" : ""}{stats.percentChange}%
            </span>
            from last week
          </p>
        </Card>

        {/* Active Repos Card */}
        <Card className="p-4 hover:border-foreground/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Active Repos
            </span>
            <FolderGit2 className="h-4 w-4 text-muted-foreground/40" />
          </div>
          <div className="text-2xl font-light text-foreground mb-1.5">
            {stats.activeRepos}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.reposUpdatedToday} updated today
          </p>
        </Card>

        {/* Languages Card */}
        <Card className="p-4 hover:border-foreground/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Languages
            </span>
            <Code2 className="h-4 w-4 text-muted-foreground/40" />
          </div>
          <div className="text-2xl font-light text-foreground mb-2">
            {stats.topLanguages.length}
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.slice(0, 5).map((lang) => {
              return (
                <div key={lang.language} className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-foreground/30"></div>
                  <span className="text-xs text-muted-foreground">
                    {lang.language}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="p-4">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-foreground mb-0.5">Weekly Activity</h2>
          <p className="text-xs text-muted-foreground">
            Commit activity over the past week
          </p>
        </div>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyActivity}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "hsl(0, 0%, 12%)" : "hsl(0, 0%, 92%)"}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke={isDark ? "hsl(0, 0%, 55%)" : "hsl(0, 0%, 45%)"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isDark ? "hsl(0, 0%, 55%)" : "hsl(0, 0%, 45%)"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "hsl(0, 0%, 6%)" : "hsl(0, 0%, 100%)",
                  border: isDark ? "1px solid hsl(0, 0%, 12%)" : "1px solid hsl(0, 0%, 92%)",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  fontSize: "12px",
                }}
                labelStyle={{ 
                  color: isDark ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 15%)", 
                  fontWeight: 500,
                  marginBottom: "4px"
                }}
              />
              <Line
                type="monotone"
                dataKey="commits"
                stroke={isDark ? "hsl(0, 0%, 70%)" : "hsl(0, 0%, 30%)"}
                strokeWidth={2}
                dot={{
                  fill: isDark ? "hsl(0, 0%, 70%)" : "hsl(0, 0%, 30%)",
                  strokeWidth: 0,
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                  fill: isDark ? "hsl(0, 0%, 85%)" : "hsl(0, 0%, 20%)",
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
