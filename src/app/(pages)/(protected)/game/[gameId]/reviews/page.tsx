"use client";

import Image from "next/image";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { FeedbackModal } from "@/components/modals/modal";
import { formatDate } from "@/lib/utils";

interface Review {
  id: string;
  userId: string;
  username: string;
  date: string;
  text: string;
  rating: number;
  likes: number;
  liked?: boolean;
}

export default function ReviewsPage() {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [reportingUserId, setReportingUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: review.liked ? review.likes - 1 : review.likes + 1,
            liked: !review.liked,
          };
        }
        return review;
      })
    );
  };

  const handleReport = (userId: string) => {
    setReportingUserId(userId);
    setIsModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim() === "" || newRating === 0) return;

    const newReviewObj: Review = {
      id: `${reviews.length + 1}`,
      userId: "currentUser",
      username: "Вы",
      date: new Date().toISOString().split("T")[0],
      text: newReview,
      rating: newRating,
      likes: 0,
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview("");
    setNewRating(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReportingUserId(null);
  };

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userId: "user1",
      username: "User 1",
      date: "2025-03-26",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare tempor, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque.",
      rating: 3,
      likes: 1,
    },
    {
      id: "2",
      userId: "user2",
      username: "User 2",
      date: "2025-03-26",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare tempor, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque.",
      rating: 5,
      likes: 10,
    },
    {
      id: "3",
      userId: "user3",
      username: "User 3",
      date: "2025-03-26",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare tempor, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque.",
      rating: 1,
      likes: 2,
    },
    {
      id: "4",
      userId: "user2",
      username: "User 2",
      date: "2025-03-26",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare tempor, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque.",
      rating: 4,
      likes: 0,
    },
  ]);
  return (
    <div className="mx-24 p-4">
      <div className="flex flex-col items-center">
        <div className="bg-[#F6A06B] p-6 rounded-md mb-4 w-90 h-90 flex justify-center items-center">
          <Image
            src={"/window.svg"}
            alt={"GameLogo"}
            width={150}
            height={150}
          />
        </div>
        <div className="border bg-[#ffded0] rounded-md w-90 p-2 mb-4 text-center text-black">
          <span className="text-3xl font-bold">7.5/10</span>
        </div>
      </div>

      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="border border-black rounded-md p-4 bg-[#ffded0]">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="review" className="text-lg text-black font-medium">
              Введите отзыв
            </label>
            <div className="flex items-center">
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="border border-black rounded-md p-1 text-black bg-white"
              >
                <option value="0">0/10</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}/10
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            id="review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full h-32 p-2 border border-black rounded-md mb-4 text-black bg-white"
            placeholder="Напишите ваш отзыв здесь..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FF751F] text-white px-4 py-2 rounded-md hover:bg-[#FF751F]/90"
              disabled={newReview.trim() === "" || newRating === 1}
            >
              Отправить отзыв
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-300 rounded-md p-4 bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2 text-black">
                  {review.username}
                  <span className="text-sm font-normal text-black">
                    {formatDate(review.date)}
                  </span>
                </h3>
              </div>
              <div className="bg-[#F6A06B] px-3 py-1 rounded-md text-sm font-medium">
                {review.rating}/10
              </div>
            </div>
            <p className="mb-4 text-black">{review.text}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleLike(review.id)}
                className={`flex items-center gap-1 ${review.liked ? "text-green-600" : "text-black"
                  } hover:text-green-700`}
              >
                <ThumbsUp size={18} />
                <span
                  className={`review.liked ? "text-green-600" : "text-black"`}
                >
                  {review.likes > 0 ? `+${review.likes}` : "0"}
                </span>
              </button>
              <button
                onClick={() => handleReport(review.userId)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Пожаловаться
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`Жалоба на пользователя ${reviews.find((r) => r.userId === reportingUserId)?.username || ""
            }`}
        />
      )}
    </div>
  );
}
