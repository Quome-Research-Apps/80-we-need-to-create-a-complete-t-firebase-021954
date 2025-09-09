export type IssueCategory = "Roads & Potholes" | "Waste Management" | "Streetlights" | "Parks & Rec" | "Traffic Signals";

export type IssueStatus = "Reported" | "In Progress" | "Resolved";

export interface IssueHistory {
  timestamp: string;
  status: IssueStatus;
  notes: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: {
    lat: number;
    lng: number;
  };
  submittedAt: string;
  resolvedAt?: string;
  imageUrl?: string;
  history: IssueHistory[];
}
