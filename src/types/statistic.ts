export interface StatisticData {
  id: string;
  username: string;
  reviewsCount: number;
  complaintsCount: number;
  blocksCount: number;
  unblocksCount: number;
  lastReviewDate: string | null;
  lastBlockDate: string | null;
  lastUnblockDate: string | null;
  status: "blocked" | "unblocked";
}
