"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from 'lucide-react'
import { RatingCalculationModal } from "@/components/modals/rating-calculation-modal"
import { ModerationRulesModal } from "@/components/modals/moderation-rules-modal"

interface Game {
    id: string
    title: string
    reviewsEnabled: boolean
    ratingValues?: Record<number, number>
    filterWords?: string[]
}

export default function AdminSettings() {
    const [searchTerm, setSearchTerm] = useState("")

    const [games, setGames] = useState<Game[]>([
        { id: "game1", title: "Game 1", reviewsEnabled: false },
        { id: "game2", title: "Game 2", reviewsEnabled: false },
        { id: "game3", title: "Game 3", reviewsEnabled: false },
        { id: "game4", title: "Game 4", reviewsEnabled: true },
        { id: "game5", title: "Game 5", reviewsEnabled: false },
        { id: "game6", title: "Game 6", reviewsEnabled: false },
        { id: "game7", title: "Game 7", reviewsEnabled: false },
        { id: "game8", title: "Game 8", reviewsEnabled: false },
        { id: "game9", title: "Game 9", reviewsEnabled: false },
    ])

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isModerationModalOpen, setIsModerationModalOpen] = useState(false);

    const handleOpenRatingModal = (game: Game) => {
        setSelectedGame(game);
        setIsRatingModalOpen(true);
    }

    const handleCloseRatingModal = () => {
        setSelectedGame(null);
        setIsRatingModalOpen(false);
    }

    const handleSaveRatingValues = (values: Record<number, number>) => {
        if (selectedGame) {
            setGames(games.map((game) => (game.id === selectedGame.id ? { ...game, ratingValues: values } : game)));
        }
    }

    const handleOpenModerationRules = (game: Game) => {
        setSelectedGame(game);
        setIsModerationModalOpen(true);
    }

    const handleCloseModerationRules = () => {
        setSelectedGame(null);
        setIsModerationModalOpen(false);
    }

    const handleSaveFilterWords = (filterWords: string[]) => {
        if (selectedGame) {
            setGames(games.map((game) => (game.id === selectedGame.id ? { ...game, filterWords } : game)))
        }
    }

    // Фильтрация игр по поисковому запросу
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Настройка рейтингов и модерации</h1>
                <Link
                    href="/admin"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            {/* Поиск игр */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Поиск игры..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md text-black"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
            </div>

            <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-black">
                                <th className="text-left py-3 px-4 font-semibold text-black">Название игры</th>
                                <th className="py-3 pr-51 font-semibold text-black" colSpan={2}>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.length > 0 ? (
                                filteredGames.map((game) => (
                                    <tr key={game.id} className="border-b border-gray-200 last:border-b-0">
                                        <td className="py-4 px-4 text-lg text-black">{game.title}</td>
                                        <td className="py-4 px-2">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => handleOpenRatingModal(game)}
                                                    className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366] whitespace-nowrap"
                                                >
                                                    Изменить подсчёт рейтинга
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModerationRules(game)}
                                                    className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366] whitespace-nowrap"
                                                >
                                                    Установка правил модерации
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-8 text-center text-gray-500 text-lg">
                                        Игры не найдены
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedGame && (
                <>
                    <RatingCalculationModal
                        isOpen={isRatingModalOpen}
                        onClose={handleCloseRatingModal}
                        gameId={selectedGame.id}
                        gameName={selectedGame.title}
                        initialValues={selectedGame.ratingValues}
                        onSave={handleSaveRatingValues}
                    />

                    <ModerationRulesModal
                        isOpen={isModerationModalOpen}
                        onClose={handleCloseModerationRules}
                        gameId={selectedGame.id}
                        gameName={selectedGame.title}
                        initialFilterWords={selectedGame.filterWords}
                        onSave={handleSaveFilterWords}
                    />
                </>
            )}
        </div>
    )
}
