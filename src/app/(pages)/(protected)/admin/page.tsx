import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto my-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Панель администрации</h1>

      <div className="grid grid-cols-1 gap-6">
        <Link
          href="/admin/games"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Управление играми и дополнительными сведениями</h2>
          <p className="text-gray-600">Добавление, редактирование и удаление игр, жанров, платформ и других данных</p>
        </Link>

        <Link
          href="/admin/statistics"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Статистика</h2>
          <p className="text-gray-600">Просмотр статистики платформы, активности пользователей и популярности игр</p>
        </Link>

        <Link
          href="/admin/users"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Управление пользователями</h2>
          <p className="text-gray-600">Управление пользователями, назначение ролей и просмотр активности</p>
        </Link>

        <Link
          href="/admin/settings"
          className="border border-black bg-[#ffded0] rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-black">Настройка рейтингов и модерации</h2>
          <p className="text-gray-600">Настройка параметров рейтингов, правил модерации и системных настроек</p>
        </Link>
      </div>
    </div>
  )
}
