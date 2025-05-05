"use client";

import { GAMES_DATA } from "@/constants/game-data";
import { GameData } from "@/types/game";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GameDetails() {
  const [game, setGame] = useState<GameData | null>(null);
  const { gameId } = useParams();

  useEffect(() => {
    const foundGame = GAMES_DATA.find((item) => item.id === Number(gameId));

    if (foundGame) {
      setGame(foundGame)
    } else {
      throw new Error("Игра не найдена");
    }
  }, [gameId]);

  if (!game) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="bg-[#F6A06B] p-6 rounded-md mb-4 w-90 h-90">
              <Image
                src="../../public/file.svg"
                alt={"GameLogo"}
                width={48}
                height={48}
              />
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 w-full text-center">
              <span className="text-xl font-bold text-black">{game.rating}/10</span>
            </div>
            <div className="flex gap-2 w-full">
              <button className="bg-gray-200 text-black px-4 py-2 rounded flex-1 hover:bg-gray-300 cursor-pointer">
                Просмотр отзывов
              </button>
              <button className="bg-gray-200 text-black px-4 py-2 rounded flex-1 hover:bg-gray-300 cursor-pointer">
                Добавить в избранное
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="border border-gray-300 rounded-md p-4 text-black">
            <h1 className="text-xl font-bold mb-4">{game.title}</h1>
            <h2 className="text-xl font-bold mb-4">Информация об игре</h2>
            <p className="mb-4">
              {game.info}
            </p>
            <div className="space-y-2">
              <p>
                <strong>Жанр:</strong> {game.genre}
              </p>
              <p>
                <strong>Издатель:</strong> {game.publisher}
              </p>
              <p>
                <strong>Разработчик:</strong> {game.developer}
              </p>
              <p>
                <strong>Платформа:</strong> {game.platform}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
