"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { AddPublisherModalProps } from "@/types/modal"
import { PublisherData } from "@/types/modal"

export function AddPublisherModal({ isOpen, onClose, onSave }: AddPublisherModalProps) {
    const [publisherData, setPublisherData] = useState<PublisherData>({
        name: "",
        country: "",
        foundationDate: "",
    })

    const handleChange = (field: keyof PublisherData, value: string) => {
        setPublisherData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = () => {
        if (publisherData.name.trim() && publisherData.country.trim()) {
            onSave(publisherData)
            setPublisherData({
                name: "",
                country: "",
                foundationDate: "",
            })
            onClose()
        } else {
            alert("Пожалуйста, заполните обязательные поля: Название и Страна")
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

                <h2 className="text-2xl font-bold text-center mb-6">Добавление издателя</h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="publisher-name" className="block text-lg mb-2">
                            Название
                        </label>
                        <input
                            id="publisher-name"
                            type="text"
                            value={publisherData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="publisher-country" className="block text-lg mb-2">
                            Страна
                        </label>
                        <input
                            id="publisher-country"
                            type="text"
                            value={publisherData.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            className="w-full text-black p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="publisher-foundation-date" className="block text-lg mb-2">
                            Дата основания
                        </label>
                        <input
                            id="publisher-foundation-date"
                            type="date"
                            value={publisherData.foundationDate}
                            onChange={(e) => handleChange("foundationDate", e.target.value)}
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
