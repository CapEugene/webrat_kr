"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { AddPlatformModalProps } from "@/types/modal"

export function AddPlatformModal({ isOpen, onClose, onSave }: AddPlatformModalProps) {
    const [platformName, setPlatformName] = useState("")

    const handleSave = () => {
        if (platformName.trim()) {
            onSave(platformName)
            setPlatformName("")
            onClose()
        } else {
            alert("Пожалуйста, введите название платформы")
        }
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

                <h2 className="text-2xl font-bold text-center mb-6">Добавить платформу</h2>

                <div className="mb-6">
                    <label htmlFor="platform-name" className="block text-lg mb-2">
                        Название
                    </label>
                    <input
                        id="platform-name"
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full text-black p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
