"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Minus } from "lucide-react"
import { ModerationRulesModalProps } from "@/types/modal"

export function ModerationRulesModal({
    isOpen,
    onClose,
    gameId,
    gameName,
    initialFilterWords = [],
    onSave,
}: ModerationRulesModalProps) {
    const [filterWords, setFilterWords] = useState<string[]>(initialFilterWords)
    const [newWord, setNewWord] = useState("")

    const handleAddWord = () => {
        if (newWord.trim() === "") return

        if (!filterWords.includes(newWord.trim())) {
            setFilterWords([...filterWords, newWord.trim()])
            setNewWord("")
        } else {
            alert("Это слово уже добавлено в список")
        }
    }

    const handleRemoveWord = (index: number) => {
        const updatedWords = [...filterWords]
        updatedWords.splice(index, 1)
        setFilterWords(updatedWords)
    }

    const handleSave = () => {
        onSave(filterWords)
        onClose()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddWord()
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

                <h2 className="text-2xl font-bold text-center mb-6">Назначить слова для автоматической фильтрации</h2>

                <div className="mb-4 flex">
                    <input
                        type="text"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Слово"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleAddWord}
                        className="bg-white text-black p-2 rounded-r-md border border-l-0 border-gray-300 hover:bg-gray-100"
                        aria-label="Добавить слово"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="bg-white border border-gray-300 rounded-md p-2 mb-6 h-48 overflow-y-auto">
                    {filterWords.length > 0 ? (
                        <ul className="space-y-1">
                            {filterWords.map((word, index) => (
                                <li key={index} className="flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded">
                                    <span className="text-black">{word}</span>
                                    <button
                                        onClick={() => handleRemoveWord(index)}
                                        className="text-gray-500 hover:text-red-500"
                                        aria-label="Удалить слово"
                                    >
                                        <Minus size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-4">Список пуст</p>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
