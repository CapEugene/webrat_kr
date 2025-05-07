"use client"

import { useState } from "react"
import Link from "next/link"
import { RoleAssignmentModal } from "@/components/modals/role-assignment-modal";

type UserRole = "user" | "moderator" | "admin";

interface UserData {
    id: string
    username: string
    role: "user" | "moderator" | "admin"
    isBlocked: boolean
    moderationComments: string
    blockHistory: {
        action: "block" | "unblock"
        date: string
        comment: string
    }[]
    lastActionDate: string | null
}

export default function UserManagement() {
    const [users, setUsers] = useState<UserData[]>([
        {
            id: "user1",
            username: "User1",
            role: "user",
            isBlocked: true,
            moderationComments: "",
            blockHistory: [
                {
                    action: "block",
                    date: "2025-03-15",
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque. Quisque vel faucibus tellus. Praesent sed tempus nibh, ut dapibus risus. Praesent velit turpis, dapibus vel tristique eget.",
                },
            ],
            lastActionDate: "2025-03-26",
        },
        {
            id: "user2",
            username: "User2",
            role: "moderator",
            isBlocked: false,
            moderationComments: "",
            blockHistory: [
                {
                    action: "block",
                    date: "2025-02-10",
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque. Quisque vel faucibus tellus. Praesent sed tempus nibh, ut dapibus risus. Praesent velit turpis, dapibus vel tristique eget.",
                },
                {
                    action: "unblock",
                    date: "2025-02-25",
                    comment: "Пользователь обещал соблюдать правила",
                },
            ],
            lastActionDate: "2025-03-28",
        },
        {
            id: "user3",
            username: "User3",
            role: "user",
            isBlocked: false,
            moderationComments: "",
            blockHistory: [],
            lastActionDate: null,
        },
    ])

    const [comments, setComments] = useState<Record<string, string>>({
        user1: "",
        user2: "",
        user3: "",
    })

    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

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
                        lastActionDate: new Date().toISOString().split("T")[0],
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
                        lastActionDate: new Date().toISOString().split("T")[0],
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

    const handleOpenRoleModal = (user: UserData) => {
        setSelectedUser(user);
        setIsRoleModalOpen(true);
    }

    const handleCloseRoleModal = () => {
        setSelectedUser(null);
        setIsRoleModalOpen(false);
    }

    const handleSaveRole = (userId: string, newRole: UserRole) => {
        setUsers(
            users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user, role: newRole,
                    }
                }
                return user;
            }),
        )
    }

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "-"
        const date = new Date(dateString)
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`
    }

    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Управление пользователями</h1>
                <Link
                    href="/admin"
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
                                {!user.isBlocked && <span className="text-green-500">(разблокирован)</span>}
                            </h2>
                            <span className="ml-4 px-2 py-1 bg-gray-200 rounded-md text-sm text-black">
                                {user.role === "admin" ? "Администратор" : user.role === "moderator" ? "Модератор" : "Пользователь"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="flex gap-2 mb-3">
                                    <button
                                        onClick={() => handleOpenRoleModal(user)}
                                        className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black"
                                    >
                                        Назначить роль
                                    </button>
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
                                    <p className="mb-2 font-medium text-black">Комментарии:</p>
                                    <textarea
                                        value={comments[user.id]}
                                        onChange={(e) => handleCommentChange(user.id, e.target.value)}
                                        className="w-full h-32 p-2 border border-gray-300 rounded-md text-black"
                                        placeholder="Введите причину блокировки/разблокировки..."
                                    />
                                </div>

                                {user.lastActionDate && (
                                    <p className="mt-3 text-sm text-gray-600">
                                        Дата разблокировки/блокировки: {formatDate(user.lastActionDate)}
                                    </p>
                                )}
                            </div>

                            <div className="border border-black rounded-md p-3 bg-white">
                                <p className="mb-2 font-medium text-black">Комментарии по блокировке/разблокировке</p>
                                {user.blockHistory.length > 0 ? (
                                    <div className="max-h-40 overflow-y-auto">
                                        {user.blockHistory.map((history, index) => (
                                            <div key={index} className="mb-2 last:mb-0">
                                                <p className="text-sm text-gray-500">
                                                    {formatDate(history.date)} -{history.action === "block" ? " Заблокирован" : " Разблокирован"}
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

            {selectedUser && (
                <RoleAssignmentModal
                    isOpen={isRoleModalOpen}
                    onClose={handleCloseRoleModal}
                    userId={selectedUser.id}
                    username={selectedUser.username}
                    currentRole={selectedUser.role}
                    onSave={handleSaveRole}
                />
            )}
        </div>
    )
}
