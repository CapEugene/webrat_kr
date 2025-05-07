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
    LineChart,
    Line,
} from "recharts"
import { ChevronDown, Search } from "lucide-react"

interface UserStatistics {
    id: string
    username: string
    reviewsCount: number
    complaintsCount: number
    blocksCount: number
    unblocksCount: number
    lastReviewDate: string | null
    lastBlockDate: string | null
    lastUnblockDate: string | null
    status: "blocked" | "unblocked"
}

interface GameStatistics {
    id: string
    title: string
    reviewsCount: number
    averageRating: number
    viewsCount: number
    favoritesCount: number
    lastReviewDate: string | null
    releaseDate: string
    genre: string
    platform: string
}

type StatisticsType = "users" | "games"

export default function AdminStatistics() {
    const [statisticsType, setStatisticsType] = useState<StatisticsType>("users")
    const [searchTerm, setSearchTerm] = useState("")

    // Демо-данные для пользователей
    const users: UserStatistics[] = [
        {
            id: "user1",
            username: "User 1",
            reviewsCount: 3,
            complaintsCount: 0,
            blocksCount: 1,
            unblocksCount: 1,
            lastReviewDate: "2025-03-29",
            lastBlockDate: "2025-03-30",
            lastUnblockDate: "2025-03-26",
            status: "unblocked",
        },
        {
            id: "user2",
            username: "User 2",
            reviewsCount: 2,
            complaintsCount: 2,
            blocksCount: 1,
            unblocksCount: 0,
            lastReviewDate: "2025-03-29",
            lastBlockDate: "2025-03-25",
            lastUnblockDate: null,
            status: "blocked",
        },
        {
            id: "user3",
            username: "User 3",
            reviewsCount: 15,
            complaintsCount: 0,
            blocksCount: 0,
            unblocksCount: 0,
            lastReviewDate: "2025-03-23",
            lastBlockDate: null,
            lastUnblockDate: null,
            status: "unblocked",
        },
    ]

    // Демо-данные для игр
    const games: GameStatistics[] = [
        {
            id: "game1",
            title: "Game 1",
            reviewsCount: 45,
            averageRating: 8.7,
            viewsCount: 1250,
            favoritesCount: 87,
            lastReviewDate: "2025-03-30",
            releaseDate: "2025-01-15",
            genre: "Action",
            platform: "PC",
        },
        {
            id: "game2",
            title: "Game 2",
            reviewsCount: 32,
            averageRating: 7.5,
            viewsCount: 980,
            favoritesCount: 54,
            lastReviewDate: "2025-03-28",
            releaseDate: "2025-02-10",
            genre: "RPG",
            platform: "PlayStation 5",
        },
        {
            id: "game3",
            title: "Game 3",
            reviewsCount: 18,
            averageRating: 9.2,
            viewsCount: 750,
            favoritesCount: 63,
            lastReviewDate: "2025-03-25",
            releaseDate: "2025-03-01",
            genre: "Strategy",
            platform: "PC",
        },
    ]

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "-"
        const date = new Date(dateString)
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`
    }

    // Фильтрация данных по поисковому запросу
    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))

    // Данные для графиков пользователей
    const userReviewsData = users.map((user) => ({
        name: user.username,
        reviews: user.reviewsCount,
    }))

    const userStatusData = [
        { name: "Заблокированы", value: users.filter((user) => user.status === "blocked").length },
        { name: "Разблокированы", value: users.filter((user) => user.status === "unblocked").length },
    ]

    // Данные для графиков игр
    const gameRatingsData = games.map((game) => ({
        name: game.title,
        rating: game.averageRating,
    }))

    const gamePopularityData = games.map((game) => ({
        name: game.title,
        reviews: game.reviewsCount,
        views: game.viewsCount / 100, // Масштабируем для лучшего отображения
        favorites: game.favoritesCount,
    }))

    const COLORS = ["#ff4d4f", "#52c41a", "#1890ff", "#faad14"]

    // Общая статистика
    const totalUserReviews = users.reduce((sum, user) => sum + user.reviewsCount, 0)
    const totalUserComplaints = users.reduce((sum, user) => sum + user.complaintsCount, 0)
    const totalGameReviews = games.reduce((sum, game) => sum + game.reviewsCount, 0)
    const averageGameRating = games.reduce((sum, game) => sum + game.averageRating, 0) / games.length

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Статистика</h1>
                <Link
                    href="/admin"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            {/* Общая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего пользователей</h3>
                    <p className="text-3xl font-bold text-black">{users.length}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего игр</h3>
                    <p className="text-3xl font-bold text-black">{games.length}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Всего отзывов</h3>
                    <p className="text-3xl font-bold text-black">{totalGameReviews}</p>
                </div>
                <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Средний рейтинг</h3>
                    <p className="text-3xl font-bold text-black">{averageGameRating.toFixed(1)}</p>
                </div>
            </div>

            {/* Переключатель типа статистики */}
            <div className="mb-6">
                <div className="relative">
                    <select
                        value={statisticsType}
                        onChange={(e) => setStatisticsType(e.target.value as StatisticsType)}
                        className="w-full text-black appearance-none bg-[#ffded0] border border-black rounded-md p-3 pr-10 cursor-pointer"
                    >
                        <option value="users">Пользователи</option>
                        <option value="games">Игры</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                </div>
            </div>

            {/* Графики */}
            {statisticsType === "users" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-black rounded-lg p-4 shadow-sm md:col-span-2">
                        <h3 className="text-lg font-medium mb-4 text-black">Количество отзывов по пользователям</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={userReviewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                                        data={userStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {userStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {statisticsType === "games" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-black rounded-lg p-4 shadow-sm md:col-span-2">
                        <h3 className="text-lg font-medium mb-4 text-black">Популярность игр</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gamePopularityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="reviews" fill="#ff751f" name="Отзывы" />
                                    <Bar dataKey="views" fill="#1890ff" name="Просмотры (x100)" />
                                    <Bar dataKey="favorites" fill="#52c41a" name="В избранном" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-medium mb-4 text-black">Рейтинг игр</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={gameRatingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 10]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="rating" stroke="#ff751f" name="Рейтинг" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Поиск */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={`Поиск ${statisticsType === "users" ? "пользователя" : "игры"}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md text-black"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
            </div>

            {/* Таблица данных */}
            <div className="border border-black rounded-lg bg-[#ffded0] overflow-hidden">
                {statisticsType === "users" && (
                    <>
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
                                                    className={
                                                        user.status === "blocked" ? "text-red-600 font-medium" : "text-green-600 font-medium"
                                                    }
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
                    </>
                )}

                {statisticsType === "games" && (
                    <>
                        {filteredGames.length > 0 ? (
                            filteredGames.map((game) => (
                                <div key={game.id} className="p-6 border-b border-black last:border-b-0">
                                    <h2 className="text-xl font-semibold text-center mb-4 text-black">{game.title}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Количество отзывов:</span> <span className="text-black">{game.reviewsCount}</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Средний рейтинг:</span>{" "}
                                                <span className="font-medium text-black">{game.averageRating.toFixed(1)}/10</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Количество просмотров:</span> <span className="text-black">{game.viewsCount}</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">В избранном у:</span>{" "}
                                                <span className="text-black">{game.favoritesCount} пользователей</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Дата последнего отзыва:</span>{" "}
                                                <span className="text-black">{formatDate(game.lastReviewDate)}</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Дата выхода:</span> <span className="text-black">{formatDate(game.releaseDate)}</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Жанр:</span> <span className="text-black">{game.genre}</span>
                                            </p>
                                            <p className="flex justify-between py-1 border-b border-gray-200">
                                                <span className="font-medium text-black">Платформа:</span> <span className="text-black">{game.platform}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-xl text-gray-500">Игры не найдены</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
