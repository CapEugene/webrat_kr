import { GameCard } from "@/components/ui/game-card";
import { GAMES_DATA } from "@/constants/game-data";

export default function MainPage() {
  return (
    <div className="py-10 px-11 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 justify-items-center gap-5">
      {GAMES_DATA.map((data) => (
        <GameCard
          key={data.id}
          id={data.id}
          rating={data.rating}
          title={data.title}
          info={data.info}
        />
      ))}
    </div>
  );
}
