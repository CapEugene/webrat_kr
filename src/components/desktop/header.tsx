import Link from "next/link";
import Icons from "../ui/icons";

export function Header() {
  return (
    <header className="bg-[#FF751F] w-full py-2 px-24 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-1">
        <Icons.RatIcon className="w-16 h-16 text-white" />
        <Icons.LogoIcon className="w-48 h-16 text-white" />
      </Link>
      <div className="flex gap-2">
        <Link
          href="/"
          className="bg-white w-30 h-12 text-primary px-2 py-1 text-l flex items-center justify-center text-center text-black rounded  hover:bg-gray-100 shadow-md transition-colors"
        >
          Все игры
        </Link>
        <Link
          href="/profile"
          className="bg-white w-30 h-12 text-primary px-2 py-1 text-l flex items-center justify-center text-center text-black rounded hover:bg-gray-100 shadow-md transition-colors"
        >
          Страница профиля
        </Link>
      </div>
    </header>
  );
}
