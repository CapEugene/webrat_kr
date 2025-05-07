"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { AddDeveloperModalProps } from "@/types/modal"
import { DeveloperData } from "@/types/modal"

export function AddDeveloperModal({ isOpen, onClose, onSave }: AddDeveloperModalProps) {
    const [developerData, setDeveloperData] = useState<DeveloperData>({
        firstName: "",
        lastName: "",
    })

    const handleChange = (field: keyof DeveloperData, value: string) => {
        setDeveloperData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = () => {
        if (developerData.firstName.trim() && developerData.lastName.trim()) {
            onSave(developerData)
            setDeveloperData({
                firstName: "",
                lastName: "",
            })
            onClose()
        } else {
            alert("Пожалуйста, заполните оба поля: Имя и Фамилия")
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

                <h2 className="text-2xl font-bold text-center mb-6">
                    Добавить
                    <br />
                    разработчика
                </h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="developer-first-name" className="block text-lg mb-2">
                            Имя
                        </label>
                        <input
                            id="developer-first-name"
                            type="text"
                            value={developerData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="developer-last-name" className="block text-lg mb-2">
                            Фамилия
                        </label>
                        <input
                            id="developer-last-name"
                            type="text"
                            value={developerData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
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
