export interface UserData {
  id: string;
  username: string;
  isBlocked: boolean;
  moderationComments: string;
  blockHistory: {
    action: "block" | "unblock";
    date: string;
    comment: string;
  }[];
}
