import Link from "next/link"

export default function ModerationDashboard() {
  return (
    <div className="max-w-4xl mx-auto my-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Панель модерации</h1>

      <div className="grid grid-cols-1 gap-6">
        <Link
          href="/moderation/users"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Модерация пользователей</h2>
          <p className="text-gray-600">Управление пользователями, блокировка и разблокировка аккаунтов</p>
        </Link>

        <Link
          href="/moderation/reviews"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Модерация отзывов</h2>
          <p className="text-gray-600">Проверка и модерация отзывов пользователей на игры</p>
        </Link>

        <Link
          href="/moderation/reports"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Модерация жалоб</h2>
          <p className="text-gray-600">Рассмотрение жалоб пользователей на контент и других пользователей</p>
        </Link>

        <Link
          href="/moderation/statistics"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Статистика</h2>
          <p className="text-gray-600">Просмотр статистики платформы, активности пользователей и модерации</p>
        </Link>
      </div>
    </div>
  )
}
