"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { AdditionalInfoModal } from "@/components/modals/additional-info-modal"
import { AddGameModal } from "@/components/modals/add-game-modal"

type EntityType = "games" | "genres" | "platforms" | "publishers" | "developers"

export default function GameManagement() {
    const [selectedEntityType, setSelectedEntityType] = useState<EntityType>("games");
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

    const entities = {
        games: [
            { id: "game1", title: "Game 1" },
            { id: "game2", title: "Game 2" },
            { id: "game3", title: "Game 3" },
            { id: "game4", title: "Game 4" },
            { id: "game5", title: "Game 5" },
            { id: "game6", title: "Game 6" },
            { id: "game7", title: "Game 7" },
            { id: "game8", title: "Game 8" },
            { id: "game9", title: "Game 9" },
        ],
        genres: [
            { id: "genre1", name: "Action" },
            { id: "genre2", name: "Adventure" },
            { id: "genre3", name: "RPG" },
            { id: "genre4", name: "Strategy" },
            { id: "genre5", name: "Simulation" },
        ],
        platforms: [
            { id: "platform1", name: "PC" },
            { id: "platform2", name: "PlayStation 5" },
            { id: "platform3", name: "Xbox Series X" },
            { id: "platform4", name: "Nintendo Switch" },
        ],
        publishers: [
            { id: "publisher1", name: "Publisher 1" },
            { id: "publisher2", name: "Publisher 2" },
            { id: "publisher3", name: "Publisher 3" },
        ],
        developers: [
            { id: "developer1", name: "Developer 1" },
            { id: "developer2", name: "Developer 2" },
            { id: "developer3", name: "Developer 3" },
        ],
    }

    const getEntityTypeLabel = (type: EntityType): string => {
        const labels = {
            games: "Редактирование игр",
            genres: "Редактирование жанров",
            platforms: "Редактирование платформ",
            publishers: "Редактирование издателей",
            developers: "Редактирование разработчиков",
        }
        return labels[type]
    }

    const handleEdit = (id: string) => {
        alert(`Редактирование ${selectedEntityType} с ID: ${id}`);
    }

    const handleDelete = (id: string) => {
        if (confirm(`Вы уверены, что хотите удалить этот элемент?`)) {
            alert(`Удаление ${selectedEntityType} с ID: ${id}`);
        }
    }

    const handleAddGame = () => {
        alert("Открытие формы добавления игры");
    }

    const handleSaveGame = (gameData: {
        title: string;
        description: string;
        coverUrl: string;
        developers: string[];
        publishers: string[];
        genres: string[];
    }) => {
        console.log("Сохранение новой игры: ", gameData);
        alert(`Игра "${gameData.title}" успешно добавлена!`);
    }

    const handleOpenAddGameModal = () => {
        setIsAddGameModalOpen(true);
    }

    const handleCloseAddGameModal = () => {
        setIsAddGameModalOpen(false);
    }

    const handleOpenAdditionalInfoModal = () => {
        setIsAdditionalInfoModalOpen(true);
    }

    const handleCloseAdditionalInfoModal = () => {
        setIsAdditionalInfoModalOpen(false);
    }

    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Управление играми и дополнительными сведениями</h1>
                <Link
                    href="/admin"
                    className="bg-white border border-gray-300 text-gray-700 ml-5 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={handleOpenAddGameModal}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                    >
                        Добавить игру
                    </button>
                    <button
                        onClick={handleOpenAdditionalInfoModal}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                    >
                        Добавить дополнительные сведения
                    </button>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <select
                            value={selectedEntityType}
                            onChange={(e) => setSelectedEntityType(e.target.value as EntityType)}
                            className="text-black w-full appearance-none bg-[#fff0e6] border border-black rounded-md p-3 pr-10 cursor-pointer"
                        >
                            <option value="games">Редактирование игр</option>
                            <option value="genres">Редактирование жанров</option>
                            <option value="platforms">Редактирование платформ</option>
                            <option value="publishers">Редактирование издателей</option>
                            <option value="developers">Редактирование разработчиков</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                </div>

                <div className="space-y-4">
                    {selectedEntityType === "games" &&
                        entities.games.map((game) => (
                            <div key={game.id} className="flex justify-between items-center">
                                <span className="text-lg text-black">{game.title}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(game.id)}
                                        className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366]"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(game.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}

                    {selectedEntityType === "genres" &&
                        entities.genres.map((genre) => (
                            <div key={genre.id} className="flex justify-between items-center">
                                <span className="text-lg text-black">{genre.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(genre.id)}
                                        className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366]"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(genre.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}

                    {selectedEntityType === "platforms" &&
                        entities.platforms.map((platform) => (
                            <div key={platform.id} className="flex justify-between items-center">
                                <span className="text-lg text-black">{platform.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(platform.id)}
                                        className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366]"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(platform.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}

                    {selectedEntityType === "publishers" &&
                        entities.publishers.map((publisher) => (
                            <div key={publisher.id} className="flex justify-between items-center">
                                <span className="text-lg text-black">{publisher.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(publisher.id)}
                                        className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366]"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(publisher.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}

                    {selectedEntityType === "developers" &&
                        entities.developers.map((developer) => (
                            <div key={developer.id} className="flex justify-between items-center">
                                <span className="text-lg text-black">{developer.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(developer.id)}
                                        className="bg-[#ffb380] text-black px-4 py-2 rounded-md hover:bg-[#ffa366]"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(developer.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <AdditionalInfoModal
                isOpen={isAdditionalInfoModalOpen}
                onClose={handleCloseAdditionalInfoModal}
            />
            <AddGameModal
                isOpen={isAddGameModalOpen}
                onClose={handleCloseAddGameModal}
                onSave={handleSaveGame}
                availableDevelopers={entities.developers}
                availablePublishers={entities.publishers}
                availablePlatforms={entities.platforms}
                availableGenres={entities.genres}
            />
        </div>
    )
}
