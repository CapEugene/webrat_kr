"use client"

import { useState } from "react"
import Link from "next/link"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { Search } from "lucide-react"
import { StatisticData } from "@/types/statistic"
import { STATISTIC_DATA } from "@/constants/statistic-data"



export default function ModerationStatistics() {
    const [searchTerm, setSearchTerm] = useState("")
    const [users, setUsers] = useState<StatisticData[]>(STATISTIC_DATA)

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "-"
        const date = new Date(dateString)
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`
    }

    // Фильтрация пользователей по поисковому запросу
    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))

    // Данные для графиков
    const reviewsData = users.map((user) => ({
        name: user.username,
        reviews: user.reviewsCount,
    }))

    const complaintsData = users.map((user) => ({
        name: user.username,
        complaints: user.complaintsCount,
    }))

    const statusData = [
        { name: "Заблокированы", value: users.filter((user) => user.status === "blocked").length },
        { name: "Разблокированы", value: users.filter((user) => user.status === "unblocked").length },
    ]

    const COLORS = ["#ff4d4f", "#52c41a"]

    // Общая статистика
    const totalReviews = users.reduce((sum, user) => sum + user.reviewsCount, 0)
    const totalComplaints = users.reduce((sum, user) => sum + user.complaintsCount, 0)
    const totalBlocks = users.reduce((sum, user) => sum + user.blocksCount, 0)
    const totalUnblocks = users.reduce((sum, user) => sum + user.unblocksCount, 0)

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Статистика</h1>
                <Link
                    href="/moderation"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            {/* Общая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего отзывов</h3>
                    <p className="text-3xl font-bold text-black">{totalReviews}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего жалоб</h3>
                    <p className="text-3xl font-bold text-black">{totalComplaints}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего блокировок</h3>
                    <p className="text-3xl font-bold text-black">{totalBlocks}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего разблокировок</h3>
                    <p className="text-3xl font-bold text-black">{totalUnblocks}</p>
                </div>
            </div>

            {/* Графики */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm md:col-span-2">
                    <h3 className="text-lg font-medium mb-4 text-black">Количество отзывов по пользователям</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={reviewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="reviews" fill="#ff751f" name="Отзывы" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium mb-4 text-black">Статус пользователей</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Поиск пользователей */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Поиск пользователя..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md text-black"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
            </div>

            {/* Таблица пользователей */}
            <div className="border border-black rounded-lg bg-[#ffded0] overflow-hidden">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="p-6 border-b border-black last:border-b-0">
                            <h2 className="text-xl font-semibold text-center mb-4 text-black">{user.username}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Количество отзывов:</span> <span className="text-black">{user.reviewsCount}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Количество жалоб:</span> <span className="text-black">{user.complaintsCount}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Количество блокировок:</span> <span className="text-black">{user.blocksCount}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Количество разблокировок:</span> <span className="text-black">{user.unblocksCount}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Дата последнего отзыва:</span>{" "}
                                        <span className="text-black">{formatDate(user.lastReviewDate)}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Дата последней блокировки:</span>{" "}
                                        <span className="text-black">{formatDate(user.lastBlockDate)}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Дата последней разблокировки:</span>{" "}
                                        <span className="text-black">{formatDate(user.lastUnblockDate)}</span>
                                    </p>
                                    <p className="flex justify-between py-1 border-b border-gray-200">
                                        <span className="font-medium text-black">Статус:</span>{" "}
                                        <span
                                            className={user.status === "blocked" ? "text-red-600 font-medium" : "text-green-600 font-medium"}
                                        >
                                            {user.status === "blocked" ? "заблокирован" : "разблокирован"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-xl text-gray-500">Пользователи не найдены</p>
                    </div>
                )}
            </div>
        </div>
    )
}
