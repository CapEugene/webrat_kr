"use client"

import { useState } from "react"
import Link from "next/link"
import { REVIEW_DATA } from "@/constants/review-data"
import { ReviewData } from "@/types/review"

export default function ReviewModeration() {
    const [reviews, setReviews] = useState<ReviewData[]>(REVIEW_DATA)

    const [comments, setComments] = useState<Record<string, string>>({
        review1: "",
        review2: "",
        review3: "",
    })

    const handleCommentChange = (reviewId: string, value: string) => {
        setComments((prev) => ({
            ...prev,
            [reviewId]: value,
        }))
    }

    const handleApproveReview = (reviewId: string) => {
        setReviews(
            reviews.map((review) => {
                if (review.id === reviewId) {
                    return {
                        ...review,
                        status: "approved",
                        moderationComment: comments[reviewId] || "Отзыв одобрен",
                    }
                }
                return review
            }),
        )
    }

    const handleRejectReview = (reviewId: string) => {
        if (!comments[reviewId].trim()) {
            alert("Пожалуйста, добавьте комментарий с причиной отклонения отзыва")
            return
        }

        setReviews(
            reviews.map((review) => {
                if (review.id === reviewId) {
                    return {
                        ...review,
                        status: "rejected",
                        moderationComment: comments[reviewId],
                    }
                }
                return review
            }),
        )
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`
    }

    // Фильтруем отзывы, чтобы показывать только ожидающие модерации
    const pendingReviews = reviews.filter((review) => review.status === "pending")

    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8 text-black">
                <h1 className="text-3xl font-bold">Модерация отзывов</h1>
                <Link
                    href="/moderation"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                {pendingReviews.length > 0 ? (
                    pendingReviews.map((review) => (
                        <div key={review.id} className="mb-8 last:mb-0">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-medium text-black">{review.username}</h2>
                                    <p className="text-sm text-black">Игра: {review.gameName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#ffebe3] px-3 py-1 rounded-md text-sm font-medium text-black">{review.rating}/10</div>
                                    <div className="text-sm text-black">{formatDate(review.date)}</div>
                                </div>
                            </div>

                            <div className="mb-4 bg-white p-4 rounded-md border border-gray-200 text-black">
                                <p>{review.text}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={() => handleApproveReview(review.id)}
                                        className="px-4 py-2 w-40 h-20 rounded-md bg-green-400 hover:bg-green-500 text-white"
                                    >
                                        Принять
                                    </button>
                                    <button
                                        onClick={() => handleRejectReview(review.id)}
                                        className="px-4 py-2 w-40 h-20 rounded-md bg-red-400 hover:bg-red-500 text-white"
                                    >
                                        Отказать
                                    </button>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="border border-black rounded-md p-3 bg-white">
                                        <p className="mb-2 font-medium text-black">Комментарии:</p>
                                        <textarea
                                            value={comments[review.id]}
                                            onChange={(e) => handleCommentChange(review.id, e.target.value)}
                                            className="w-full h-24 p-2 border text-black border-gray-300 rounded-md"
                                            placeholder="Введите комментарий модератора..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {review !== pendingReviews[pendingReviews.length - 1] && <hr className="my-6 border-secondary" />}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-xl text-black">Нет отзывов, ожидающих модерации</p>
                    </div>
                )}
            </div>

            {reviews.some((review) => review.status !== "pending") && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Обработанные отзывы</h2>
                    <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                        {reviews
                            .filter((review) => review.status !== "pending")
                            .map((review) => (
                                <div key={review.id} className="mb-8 last:mb-0">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-medium text-black">
                                                {review.username}{" "}
                                                <span className={review.status === "approved" ? "text-green-600" : "text-red-600"}>
                                                    ({review.status === "approved" ? "Принят" : "Отклонен"})
                                                </span>
                                            </h2>
                                            <p className="text-sm text-black">Игра: {review.gameName}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#ffebe3] text-black px-3 py-1 rounded-md text-sm font-medium">{review.rating}/10</div>
                                            <div className="text-sm text-black">{formatDate(review.date)}</div>
                                        </div>
                                    </div>

                                    <div className="mb-4 bg-white p-4 rounded-md border border-gray-200 text-black">
                                        <p>{review.text}</p>
                                    </div>

                                    <div className="bg-gray-200 p-4 rounded-md">
                                        <p className="font-medium text-black">Комментарий модератора:</p>
                                        <p className="text-black">{review.moderationComment}</p>
                                    </div>

                                    {review !== reviews[reviews.length - 1] && <hr className="my-6 border-secondary" />}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
