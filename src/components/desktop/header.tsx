"use client"

import Link from "next/link";
import Icons from "../ui/icons";
import { useState } from "react";

export function Header() {
  const [isUserModerator, setIsUserModerator] = useState<Boolean>(true);
  const [isUserAdmin, setIsUserAdmin] = useState<Boolean>(true);

  return (
    <header className="bg-[#FF751F] w-full py-2 px-24 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-1">
        <Icons.RatIcon className="w-16 h-16 text-white" />
        <Icons.LogoIcon className="w-48 h-16 text-white" />
      </Link>
      <div className="flex gap-2">
        {isUserModerator && (
          <Link
            href="/moderation"
            className="bg-white w-30 h-12 text-primary px-2 py-1 text-[14px] flex items-center justify-center text-center text-black rounded  hover:bg-gray-100 shadow-md transition-colors"
          >
            Панель модерации
          </Link>
        )}
        {isUserAdmin && (
          <Link
            href="/admin"
            className="bg-white w-30 h-12 text-primary px-2 py-1 text-[14px] flex items-center justify-center text-center text-black rounded  hover:bg-gray-100 shadow-md transition-colors"
          >
            Панель администрации
          </Link>
        )}
        <Link
          href="/"
          className="bg-white w-30 h-12 text-primary px-2 py-1 text-[14px] flex items-center justify-center text-center text-black rounded  hover:bg-gray-100 shadow-md transition-colors"
        >
          Все игры
        </Link>
        <Link
          href="/profile"
          className="bg-white w-30 h-12 text-primary px-2 py-1 text-[14px] flex items-center justify-center text-center text-black rounded hover:bg-gray-100 shadow-md transition-colors"
        >
          Страница профиля
        </Link>
      </div>
    </header>
  );
}
