"use client"

import { useState } from "react"
import Link from "next/link"
import { UserData } from "@/types/user"
import { USER_DATA } from "@/constants/user-data"

export default function UserModeration() {
    const [users, setUsers] = useState<UserData[]>(USER_DATA);

    const [comments, setComments] = useState<Record<string, string>>({
        user1: "",
        user2: "",
        user3: "",
    })

    const handleCommentChange = (userId: string, value: string) => {
        setComments((prev) => ({
            ...prev,
            [userId]: value,
        }))
    }

    const handleBlockUser = (userId: string) => {
        if (!comments[userId].trim()) {
            alert("Пожалуйста, добавьте комментарий перед блокировкой")
            return
        }

        setUsers(
            users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        isBlocked: true,
                        blockHistory: [
                            ...user.blockHistory,
                            {
                                action: "block",
                                date: new Date().toISOString().split("T")[0],
                                comment: comments[userId],
                            },
                        ],
                    }
                }
                return user
            }),
        )

        // Очищаем поле комментария после действия
        handleCommentChange(userId, "")
    }

    const handleUnblockUser = (userId: string) => {
        if (!comments[userId].trim()) {
            alert("Пожалуйста, добавьте комментарий перед разблокировкой")
            return
        }

        setUsers(
            users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        isBlocked: false,
                        blockHistory: [
                            ...user.blockHistory,
                            {
                                action: "unblock",
                                date: new Date().toISOString().split("T")[0],
                                comment: comments[userId],
                            },
                        ],
                    }
                }
                return user
            }),
        )

        // Очищаем поле комментария после действия
        handleCommentChange(userId, "")
    }

    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Модерация пользователей</h1>
                <Link
                    href="/moderation"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                {users.map((user) => (
                    <div key={user.id} className="mb-8 last:mb-0">
                        <div className="flex items-center mb-4">
                            <h2 className="text-xl font-medium text-black">
                                {user.username} {user.isBlocked && <span className="text-red-500">(заблокирован)</span>}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="flex gap-2 mb-3">
                                    <button
                                        onClick={() => handleUnblockUser(user.id)}
                                        disabled={!user.isBlocked}
                                        className={`px-4 py-2 rounded-md ${user.isBlocked
                                            ? "bg-green-400 hover:bg-green-500 text-white"
                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                    >
                                        Разблокировать
                                    </button>
                                    <button
                                        onClick={() => handleBlockUser(user.id)}
                                        disabled={user.isBlocked}
                                        className={`px-4 py-2 rounded-md ${!user.isBlocked
                                            ? "bg-red-400 hover:bg-red-500 text-white"
                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                    >
                                        Блокировать
                                    </button>
                                </div>

                                <div className="border border-black rounded-md p-3 bg-white">
                                    <p className="mb-2 font-medium text-black">Комментарий:</p>
                                    <textarea
                                        value={comments[user.id]}
                                        onChange={(e) => handleCommentChange(user.id, e.target.value)}
                                        className="w-full h-32 p-2 border border-gray-300 rounded-md text-black"
                                        placeholder="Введите причину блокировки/разблокировки..."
                                    />
                                </div>
                            </div>

                            <div className="border border-black rounded-md p-3 bg-white">
                                <p className="mb-2 font-medium text-black">Комментарии по блокировке/разблокировке</p>
                                {user.blockHistory.length > 0 ? (
                                    <div className="max-h-32 overflow-y-auto">
                                        {user.blockHistory.map((history, index) => (
                                            <div key={index} className="mb-2 last:mb-0">
                                                <p className="text-sm text-gray-500">
                                                    {new Date(history.date).toLocaleDateString()} -
                                                    {history.action === "block" ? " Заблокирован" : " Разблокирован"}
                                                </p>
                                                <p className="text-sm text-black">{history.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">История блокировок отсутствует</p>
                                )}
                            </div>
                        </div>

                        {user !== users[users.length - 1] && <hr className="my-6 border-black" />}
                    </div>
                ))}
            </div>
        </div>
    )
}
