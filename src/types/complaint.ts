export interface ComplaintData {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  toUsername: string;
  text: string;
  date: string;
  status: "pending" | "warning" | "rejected";
  moderationComment: string;
}
