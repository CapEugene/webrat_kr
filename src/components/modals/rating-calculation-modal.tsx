"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { RatingCalculationModalProps } from "@/types/modal"

export function RatingCalculationModal({
  isOpen,
  onClose,
  gameId,
  gameName,
  initialValues = {},
  onSave,
}: RatingCalculationModalProps) {
  const [ratingValues, setRatingValues] = useState<Record<number, number>>(() => {
    const defaultValues: Record<number, number> = {}
    for (let i = 1; i <= 10; i++) {
      defaultValues[i] = initialValues[i] || i
    }
    return defaultValues
  })

  const handleInputChange = (rating: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setRatingValues((prev) => ({
      ...prev,
      [rating]: numValue,
    }))
  }

  const handleSave = () => {
    onSave(ratingValues)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f6a06b] rounded-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8">Изменить подсчёт рейтинга</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating}>
                <label htmlFor={`rating-${rating}`} className="block text-lg mb-1">
                  Для оценки {rating}:
                </label>
                <input
                  id={`rating-${rating}`}
                  type="number"
                  step="0.1"
                  min="0"
                  value={ratingValues[rating]}
                  onChange={(e) => handleInputChange(rating, e.target.value)}
                  className="w-full p-2 border text-black border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[6, 7, 8, 9, 10].map((rating) => (
              <div key={rating}>
                <label htmlFor={`rating-${rating}`} className="block text-lg mb-1">
                  Для оценки {rating}:
                </label>
                <input
                  id={`rating-${rating}`}
                  type="number"
                  step="0.1"
                  min="0"
                  value={ratingValues[rating]}
                  onChange={(e) => handleInputChange(rating, e.target.value)}
                  className="w-full p-2 border text-black border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
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
