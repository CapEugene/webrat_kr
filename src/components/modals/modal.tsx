"use client"
import { FeedbackModalProps } from "@/types/modal"
import { X } from "lucide-react"

export function FeedbackModal({ isOpen, onClose, title = "Пожаловаться" }: FeedbackModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary p-4 rounded-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-black hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2">Текст жалобы:</p>
          <textarea className="w-full h-32 p-2 border border-gray-300 rounded" placeholder="Опишите вашу жалобу..." />
        </div>
        <div className="flex justify-center">
          <button className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100" onClick={onClose}>
            Отправить жалобу
          </button>
        </div>
      </div>
    </div>
  )
}