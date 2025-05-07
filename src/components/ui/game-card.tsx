import { GameData } from "@/types/game";
import Link from "next/link";
import Image from "next/image";

export function GameCard({ id, rating, title, info }: GameData) {
  return (
    <Link href={`/game/${id}`}>
      <div className="bg-[#F6A06B] rounded-md p-3 w-100 min-h-100 h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="flex justify-center my-4">
          <div className="bg-white p-2 rounded-md w-60 h-60 flex items-center justify-center">
            <Image
              src="/window.svg"
              alt={title}
              width={48}
              height={48}
            />
          </div>
        </div>
        <h2 className="text-center text-black font-medium text-3xl mb-1">{title}</h2>
        <span className="inline-block text-black text-center font-medium text-2xl mb-1 mx-auto px-4">{rating}/10</span>
        <p className="text-s text-black">{info}</p>
      </div>
    </Link>
  );
}
