import Link from "next/link"

export default function Register() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-normal text-center mb-12 text-black">Зарегистрироваться</h1>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="login" className="block text-lg text-black">
                            Логин
                        </label>
                        <input
                            id="login"
                            type="text"
                            className="w-full p-3 border border-black bg-[#ffded0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-lg text-black">
                            Пароль
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full p-3 border border-black bg-[#ffded0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block text-lg text-black">
                            Повторите пароль
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            className="w-full p-3 border border-black bg-[#ffded0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex justify-center gap-4 pt-6">
                            <button
                                type="submit"
                                className="px-6 py-3 border w-55 text-center border-black text-black rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Зарегистрироваться
                            </button>

                            <Link
                                href="/login"
                                className="px-6 py-3 border w-55 text-center border-black text-black rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Уже есть аккаунт?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
