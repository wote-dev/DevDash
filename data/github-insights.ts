export interface LanguageData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface CommitData {
  week: string;
  commits: number;
  [key: string]: string | number;
}

export interface SummaryData {
  topLanguage: string;
  topLanguagePercentage: number;
  mostActiveRepo: string;
  totalCommits: number;
  totalRepos: number;
}

export interface InsightsData {
  languageDistribution: LanguageData[];
  commitActivity: CommitData[];
  summary: SummaryData;
}

export const insightsData: InsightsData = {
  languageDistribution: [
    {
      name: "TypeScript",
      value: 45,
      color: "#3178c6",
    },
    {
      name: "JavaScript",
      value: 25,
      color: "#f7df1e",
    },
    {
      name: "Python",
      value: 18,
      color: "#3776ab",
    },
    {
      name: "Go",
      value: 8,
      color: "#00add8",
    },
    {
      name: "Other",
      value: 4,
      color: "#94a3b8",
    },
  ],
  commitActivity: [
    {
      week: "Week 1",
      commits: 12,
    },
    {
      week: "Week 2",
      commits: 15,
    },
    {
      week: "Week 3",
      commits: 8,
    },
    {
      week: "Week 4",
      commits: 22,
    },
    {
      week: "Week 5",
      commits: 18,
    },
    {
      week: "Week 6",
      commits: 25,
    },
    {
      week: "Week 7",
      commits: 20,
    },
    {
      week: "Week 8",
      commits: 28,
    },
    {
      week: "Week 9",
      commits: 16,
    },
    {
      week: "Week 10",
      commits: 19,
    },
    {
      week: "Week 11",
      commits: 24,
    },
    {
      week: "Week 12",
      commits: 31,
    },
  ],
  summary: {
    topLanguage: "TypeScript",
    topLanguagePercentage: 45,
    mostActiveRepo: "devdash-ui",
    totalCommits: 238,
    totalRepos: 12,
  },
};
