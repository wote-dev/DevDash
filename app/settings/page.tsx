"use client";

import { useState, useEffect } from "react";

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { user } = useUser();
  const [githubUsername, setGithubUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      // Get saved GitHub username from user metadata
      const savedUsername = user.unsafeMetadata?.githubUsername as string;
      
      // Try to get GitHub username from OAuth connection
      const githubAccount = user.externalAccounts?.find(
        (account) => account.provider === "github"
      );
      
      if (savedUsername) {
        setGithubUsername(savedUsername);
      } else if (githubAccount?.username) {
        // Auto-fill from GitHub OAuth connection
        setGithubUsername(githubAccount.username);
      }
    }
  }, [user]);

  const handleSave = async () => {
    if (!githubUsername.trim()) {
      setMessage("Please enter a GitHub username");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      // Update user metadata with GitHub username
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          githubUsername: githubUsername.trim(),
        },
      });

      setMessage("GitHub username saved successfully!");
    } catch (error) {
      console.error("Error saving GitHub username:", error);
      setMessage("Failed to save GitHub username. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-foreground mb-1">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure your DevDash preferences
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-foreground mb-1">GitHub Integration</h2>
          <p className="text-xs text-muted-foreground">
            {user?.externalAccounts?.find((a) => a.provider === "github")
              ? "Your GitHub username has been automatically detected from your login"
              : "Connect your GitHub account to see your real developer statistics"}
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-username" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">GitHub Username</Label>
            <Input
              id="github-username"
              placeholder="Enter your GitHub username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">
              {user?.externalAccounts?.find((a) => a.provider === "github")
                ? "Automatically detected from your GitHub login. You can change it if needed."
                : "This will be used to fetch your coding statistics from GitHub"}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
            {message && (
              <p className={`text-sm ${
                message.includes("success") 
                  ? "text-foreground/70" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
