import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Cloudflare Pages requires Edge Runtime
export const runtime = 'edge';

interface GitHubRepo {
  name: string;
  language: string | null;
  updated_at: string;
  pushed_at: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

interface LanguageStats {
  [key: string]: number;
}

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DevDash-App',
    };

    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Fetch user's recent events (for commit counting)
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { headers, next: { revalidate: 300 } }
    );

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: GitHubEvent[] = await eventsResponse.json();

    // Calculate stats
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Count commits this week
    const commitsThisWeek = events.filter(
      (event) =>
        event.type === 'PushEvent' &&
        new Date(event.created_at) > oneWeekAgo
    ).length;

    // Count commits last week
    const commitsLastWeek = events.filter(
      (event) =>
        event.type === 'PushEvent' &&
        new Date(event.created_at) > twoWeeksAgo &&
        new Date(event.created_at) <= oneWeekAgo
    ).length;

    // Calculate percentage change
    const percentChange =
      commitsLastWeek > 0
        ? Math.round(((commitsThisWeek - commitsLastWeek) / commitsLastWeek) * 100)
        : commitsThisWeek > 0
        ? 100
        : 0;

    // Count active repos (updated in last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const activeRepos = repos.filter(
      (repo) => new Date(repo.updated_at) > thirtyDaysAgo
    );

    // Count repos updated today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reposUpdatedToday = repos.filter(
      (repo) => new Date(repo.updated_at) >= today
    ).length;

    // Calculate language statistics
    const languageStats: LanguageStats = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    // Get top 5 languages
    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / repos.length) * 100),
      }));

    // Calculate daily commits for the week
    const dailyCommits = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      const commits = events.filter(
        (event) =>
          event.type === 'PushEvent' &&
          new Date(event.created_at) >= date &&
          new Date(event.created_at) < nextDate
      ).length;
      
      return {
        day: dayNames[date.getDay()],
        commits,
      };
    });

    // Fetch user profile for contribution count
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      { headers, next: { revalidate: 3600 } } // Cache for 1 hour
    );

    let totalContributions = 0;
    if (userResponse.ok) {
      const userData = await userResponse.json();
      // Use public repos as a proxy for contributions (GitHub API v3 doesn't provide contribution count)
      totalContributions = userData.public_repos || 0;
    }

    return NextResponse.json({
      stats: {
        commitsThisWeek,
        percentChange,
        activeRepos: activeRepos.length,
        reposUpdatedToday,
        topLanguages,
        totalContributions,
      },
      weeklyActivity: dailyCommits,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub statistics' },
      { status: 500 }
    );
  }
}
