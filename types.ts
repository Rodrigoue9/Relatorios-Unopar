export interface MonthlyData {
  month: string;
  views: number;
  posts: number; // Soma de Stories + Feed
}

export interface InstagramAccount {
  id: string;
  name: string;
  handle: string; // e.g., @unoparrubiataba
  data: MonthlyData[];
}

export interface YearlyData {
  [year: number]: InstagramAccount[];
}
