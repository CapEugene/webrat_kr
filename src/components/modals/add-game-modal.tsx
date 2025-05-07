"use client"

import { useState } from "react"
import { X, Plus, ChevronDown } from "lucide-react"
import { AddGameModalProps } from "@/types/modal"
import { GameData } from "@/types/modal"

export function AddGameModal({
    isOpen,
    onClose,
    onSave,
    availableDevelopers,
    availablePublishers,
    availablePlatforms,
    availableGenres,
}: AddGameModalProps) {
    const [gameData, setGameData] = useState<GameData>({
        title: "",
        description: "",
        coverUrl: "",
        developers: [],
        publishers: [],
        platforms: [],
        genres: [],
    })

    const [selectedDeveloper, setSelectedDeveloper] = useState<string>("")
    const [selectedPublisher, setSelectedPublisher] = useState<string>("")
    const [selectedGenre, setSelectedGenre] = useState<string>("")
    const [selectedPlatform, setSelectedPlatform] = useState<string>("")

    const handleChange = (field: keyof GameData, value: string) => {
        setGameData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleAddDeveloper = () => {
        if (selectedDeveloper && !gameData.developers.includes(selectedDeveloper)) {
            setGameData((prev) => ({
                ...prev,
                developers: [...prev.developers, selectedDeveloper],
            }))
            setSelectedDeveloper("")
        }
    }

    const handleAddPublisher = () => {
        if (selectedPublisher && !gameData.publishers.includes(selectedPublisher)) {
            setGameData((prev) => ({
                ...prev,
                publishers: [...prev.publishers, selectedPublisher],
            }))
            setSelectedPublisher("")
        }
    }

    const handleAddPlatform = () => {
        if (selectedPlatform && !gameData.platforms.includes(selectedPlatform)) {
            setGameData((prev) => ({
                ...prev, platforms: [...prev.platforms, selectedPlatform],
            }))
            setSelectedPlatform("")
        }
    }

    const handleAddGenre = () => {
        if (selectedGenre && !gameData.genres.includes(selectedGenre)) {
            setGameData((prev) => ({
                ...prev,
                genres: [...prev.genres, selectedGenre],
            }))
            setSelectedGenre("")
        }
    }

    const handleSave = () => {
        if (gameData.title.trim() && gameData.description.trim()) {
            onSave(gameData)
            setGameData({
                title: "",
                description: "",
                coverUrl: "",
                developers: [],
                publishers: [],
                platforms: [],
                genres: [],
            })
            onClose()
        } else {
            alert("Пожалуйста, заполните обязательные поля: Название игры и Информация об игре")
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#f6a06b] rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
                    aria-label="Закрыть"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-center mb-6">Добавить игру</h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="game-title" className="block text-lg mb-2">
                            Название игры
                        </label>
                        <input
                            id="game-title"
                            type="text"
                            value={gameData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full p-3 text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="game-description" className="block text-lg mb-2">
                            Информация об игре
                        </label>
                        <textarea
                            id="game-description"
                            value={gameData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full p-3 text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white h-32"
                        />
                    </div>

                    <div>
                        <label htmlFor="game-cover" className="block text-lg mb-2">
                            Ссылка для обложки
                        </label>
                        <input
                            id="game-cover"
                            type="text"
                            value={gameData.coverUrl}
                            onChange={(e) => handleChange("coverUrl", e.target.value)}
                            className="w-full p-3 text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Разработчики</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <select
                                    value={selectedDeveloper}
                                    onChange={(e) => setSelectedDeveloper(e.target.value)}
                                    className="text-black w-full appearance-none bg-white border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="">Выберите разработчика</option>
                                    {availableDevelopers.map((developer) => (
                                        <option key={developer.id} value={developer.id}>
                                            {developer.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button
                                onClick={handleAddDeveloper}
                                className="bg-white p-2 text-black rounded-md hover:bg-gray-100"
                                aria-label="Добавить разработчика"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        {gameData.developers.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {gameData.developers.map((devId) => {
                                    const developer = availableDevelopers.find((d) => d.id === devId)
                                    return (
                                        developer && (
                                            <span key={devId} className="bg-white px-2 py-1 rounded-md text-sm flex items-center text-black">
                                                {developer.name}
                                                <button
                                                    onClick={() =>
                                                        setGameData((prev) => ({
                                                            ...prev,
                                                            developers: prev.developers.filter((id) => id !== devId),
                                                        }))
                                                    }
                                                    className="ml-1 text-red-500 hover:text-red-700"
                                                    aria-label="Удалить разработчика"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        )
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Издатели</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <select
                                    value={selectedPublisher}
                                    onChange={(e) => setSelectedPublisher(e.target.value)}
                                    className="w-full text-black appearance-none bg-white border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="">Выберите издателя</option>
                                    {availablePublishers.map((publisher) => (
                                        <option key={publisher.id} value={publisher.id}>
                                            {publisher.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button
                                onClick={handleAddPublisher}
                                className="bg-white text-black p-2 rounded-md hover:bg-gray-100"
                                aria-label="Добавить издателя"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        {gameData.publishers.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {gameData.publishers.map((pubId) => {
                                    const publisher = availablePublishers.find((p) => p.id === pubId)
                                    return (
                                        publisher && (
                                            <span key={pubId} className="bg-white px-2 py-1 rounded-md text-sm flex items-center text-black">
                                                {publisher.name}
                                                <button
                                                    onClick={() =>
                                                        setGameData((prev) => ({
                                                            ...prev,
                                                            publishers: prev.publishers.filter((id) => id !== pubId),
                                                        }))
                                                    }
                                                    className="ml-1 text-red-500 hover:text-red-700"
                                                    aria-label="Удалить издателя"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        )
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Платформы</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <select
                                    value={selectedPlatform}
                                    onChange={(e) => setSelectedPlatform(e.target.value)}
                                    className="w-full text-black appearance-none bg-white border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="">Выберите платформу</option>
                                    {availablePlatforms.map((platform) => (
                                        <option key={platform.id} value={platform.id}>
                                            {platform.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button
                                onClick={handleAddPlatform}
                                className="bg-white text-black p-2 rounded-md hover:bg-gray-100"
                                aria-label="Добавить платформу"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        {gameData.platforms.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {gameData.platforms.map((platId) => {
                                    const platform = availablePlatforms.find((p) => p.id === platId)
                                    return (
                                        platform && (
                                            <span key={platId} className="bg-white text-black px-2 py-1 rounded-md text-sm flex items-center">
                                                {platform.name}
                                                <button
                                                    onClick={() =>
                                                        setGameData((prev) => ({
                                                            ...prev,
                                                            platforms: prev.platforms.filter((id) => id !== platId),
                                                        }))
                                                    }
                                                    className="ml-1 text-red-500 hover:text-red-700"
                                                    aria-label="Удалить платформу"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        )
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Жанры</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="w-full appearance-none text-black bg-white border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="">Выберите жанр</option>
                                    {availableGenres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button
                                onClick={handleAddGenre}
                                className="bg-white text-black p-2 rounded-md hover:bg-gray-100"
                                aria-label="Добавить жанр"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        {gameData.genres.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {gameData.genres.map((genreId) => {
                                    const genre = availableGenres.find((g) => g.id === genreId)
                                    return (
                                        genre && (
                                            <span key={genreId} className="bg-white text-black px-2 py-1 rounded-md text-sm flex items-center">
                                                {genre.name}
                                                <button
                                                    onClick={() =>
                                                        setGameData((prev) => ({
                                                            ...prev,
                                                            genres: prev.genres.filter((id) => id !== genreId),
                                                        }))
                                                    }
                                                    className="ml-1 text-red-500 hover:text-red-700"
                                                    aria-label="Удалить жанр"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        )
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
