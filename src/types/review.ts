export interface ReviewData {
  id: string;
  userId: string;
  username: string;
  gameId: string;
  gameName: string;
  rating: number;
  text: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  moderationComment: string;
}
