"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { RoleAssignmentModalProps } from "@/types/modal"
import { UserRole } from "@/types/modal"

export function RoleAssignmentModal({
    isOpen,
    onClose,
    userId,
    username,
    currentRole,
    onSave,
}: RoleAssignmentModalProps) {
    const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole)

    const handleSave = () => {
        onSave(userId, selectedRole)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#f6a06b] rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
                    aria-label="Закрыть"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-2">Назначить роль</h2>
                <p className="text-center text-xl mb-6">{username}</p>

                <div className="space-y-4">
                    <button
                        onClick={() => setSelectedRole("user")}
                        className={`w-full py-3 rounded-md text-center transition-colors ${selectedRole === "user" ? "bg-gray-400 text-white" : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        Пользователь
                    </button>

                    <button
                        onClick={() => setSelectedRole("moderator")}
                        className={`w-full py-3 rounded-md text-center transition-colors ${selectedRole === "moderator" ? "bg-gray-400 text-white" : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        Модератор
                    </button>

                    <button
                        onClick={() => setSelectedRole("admin")}
                        className={`w-full py-3 rounded-md text-center transition-colors ${selectedRole === "admin" ? "bg-gray-400 text-white" : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        Администратор
                    </button>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
