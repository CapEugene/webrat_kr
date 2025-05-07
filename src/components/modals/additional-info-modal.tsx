"use client"

import { X } from "lucide-react"
import { AddGenreModal } from "./add-genre-modal"
import { useState } from "react"
import { AddPlatformModal } from "./add-platform-modal"
import { AddPublisherModal } from "./add-publisher-modal"
import { AddDeveloperModal } from "./add-developer-modal"
import { AdditionalInfoModalProps } from "@/types/modal"

export function AdditionalInfoModal({ isOpen, onClose }: AdditionalInfoModalProps) {
    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
    const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
    const [isPublisherModalOpen, setIsPublisherModalOpen] = useState(false);
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

    const handleAddGenre = (genreName: string) => {
        console.log("Добавлен жанр: ", genreName);
    }

    const handleAddPlatform = (platformName: string) => {
        console.log("Добавлена платформа: ", platformName);
    }

    const handleAddPublisher = (publisherData: { name: string; country: string; foundationDate: string }) => {
        console.log("Добавлен издатель: ", publisherData);
    }

    const handleAddDeveloper = (developerData: { firstName: string; lastName: string }) => {
        console.log("Добавлен разработчик: ", developerData);
    }

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[#f6a06b] rounded-lg w-full max-w-md p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
                        aria-label="Закрыть"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-2xl font-bold text-center mb-8">
                        Добавить
                        <br />
                        дополнительные
                        <br />
                        сведения
                    </h2>

                    <div className="space-y-4">
                        <button
                            onClick={() => setIsGenreModalOpen(true)}
                            className="w-full py-3 bg-white rounded-md text-center hover:bg-gray-100 transition-colors text-black"
                        >
                            Добавить жанр
                        </button>

                        <button
                            onClick={() => setIsPlatformModalOpen(true)}
                            className="w-full py-3 bg-white rounded-md text-center hover:bg-gray-100 transition-colors text-black"
                        >
                            Добавить платформу
                        </button>

                        <button
                            onClick={() => setIsPublisherModalOpen(true)}
                            className="w-full py-3 bg-white rounded-md text-center hover:bg-gray-100 transition-colors text-black"
                        >
                            Добавить издателя
                        </button>

                        <button
                            onClick={() => setIsDeveloperModalOpen(true)}
                            className="w-full py-3 bg-white rounded-md text-center hover:bg-gray-100 transition-colors text-black"
                        >
                            Добавить разработчика
                        </button>
                    </div>
                </div>
            </div>

            <AddGenreModal
                isOpen={isGenreModalOpen}
                onClose={() => setIsGenreModalOpen(false)}
                onSave={handleAddGenre}
            />
            <AddPlatformModal
                isOpen={isPlatformModalOpen}
                onClose={() => setIsPlatformModalOpen(false)}
                onSave={handleAddPlatform}
            />
            <AddPublisherModal
                isOpen={isPublisherModalOpen}
                onClose={() => setIsPublisherModalOpen(false)}
                onSave={handleAddPublisher}
            />
            <AddDeveloperModal
                isOpen={isDeveloperModalOpen}
                onClose={() => setIsDeveloperModalOpen(false)}
                onSave={handleAddDeveloper}
            />
        </>
    )
}
