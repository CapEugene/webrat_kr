"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface FavoriteGame {
    id: string
    title: string
    description: string
    rating: string
}

interface UserReview {
    id: string
    gameId: string
    gameName: string
    status: string
    text: string
    rating: string
}

export default function Profile() {
    const [selectedGame, setSelectedGame] = useState("game1")

    const favoriteGames: FavoriteGame[] = [
        {
            id: "game1",
            title: "Название игры",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris,",
            rating: "7.5/10",
        },
        {
            id: "game2",
            title: "Другая игра",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris,",
            rating: "8.2/10",
        },
        {
            id: "game3",
            title: "Третья игра",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris,",
            rating: "6.8/10",
        },
    ]

    const userReviews: UserReview[] = [
        {
            id: "review1",
            gameId: "game1",
            gameName: "Game1",
            status: "(принято)",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque. Quisque vel faucibus tellus. Praesent sed tempus nibh, ut dapibus risus. Praesent velit turpis, dapibus vel tristique eget, ultrices eu sem. Quisque tincidunt mi quis quam consequat gravida. Morbi leo leo, rhoncus vitae tincidunt at, rhoncus non leo. Donec fringilla lorem semper lacus efficitur euismod. Maecenas condimentum lacinia quam, in pharetra nunc semper eget. Cras facilisis, enim sed rhoncus mollis, purus diam commodo nunc, quis eleifend velit eros id nisl. Donec mauris metus, dapibus fringilla felis id, fermentum mattis dui. Etiam condimentum mattis quam, id fringilla nulla aliquet vel.",
            rating: "3/10",
        },
        {
            id: "review2",
            gameId: "game2",
            gameName: "Game2",
            status: "(на рассмотрении)",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque.",
            rating: "8/10",
        },
    ]

    const selectedGameData = favoriteGames.find((game) => game.id === selectedGame) || favoriteGames[0]

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-black">Добро пожаловать, user!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Избранные игры */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-black">Список избранных игр</h2>

                    <div className="relative mb-4">
                        <div className="border border-[#000000] rounded-md p-2 flex justify-between items-center cursor-pointer bg-white">
                            <select
                                className="w-full appearance-none bg-transparent outline-none cursor-pointer text-black"
                                value={selectedGame}
                                onChange={(e) => setSelectedGame(e.target.value)}
                            >
                                {favoriteGames.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="h-5 w-5 text-black" />
                        </div>
                    </div>

                    <div className="bg-[#F6A06B] rounded-md overflow-hidden">
                        <div className="p-4 flex justify-center">
                            <div className="bg-white p-4 rounded-md w-48 h-48 flex items-center justify-center">
                                <Image src="/file.svg" alt={selectedGameData.title} width={120} height={120} />
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="text-xl font-medium text-center mb-2 text-black">{selectedGameData.title}</h3>

                            <div className="bg-[#f8d3b9] text-center p-2 rounded-md mb-4 mx-auto w-32">
                                <span className="font-bold text-black">{selectedGameData.rating}</span>
                            </div>

                            <p className="text-sm text-black">{selectedGameData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Отзывы пользователя */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-black">Мои рейтинги</h2>

                    <div className="space-y-4">
                        {userReviews.map((review) => (
                            <div key={review.id} className="border border-secondary rounded-md p-4 bg-[#ffded0]">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-medium text-black">
                                        {review.gameName} <span className="font-normal">{review.status}</span>
                                    </h3>
                                    <div className="bg-secondary px-2 py-1 rounded-md text-sm text-black">{review.rating}</div>
                                </div>

                                <p className="text-sm line-clamp-[12] text-black">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
