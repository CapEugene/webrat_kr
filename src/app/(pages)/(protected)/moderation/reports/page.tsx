"use client"

import { useState } from "react"
import Link from "next/link"
import { COMPLAINTS_DATA } from "@/constants/complaint-data";
import { ComplaintData } from "@/types/complaint";

export default function ComplaintsModeration() {
    const [complaints, setComplaints] = useState<ComplaintData[]>(COMPLAINTS_DATA);

    const [comments, setComments] = useState<Record<string, string>>({
        complaint1: "",
        complaint2: "",
        complaint3: "",
    })

    const handleCommentChange = (complaintId: string, value: string) => {
        setComments((prev) => ({
            ...prev,
            [complaintId]: value,
        }))
    }

    const handleIssueWarning = (complaintId: string) => {
        if (!comments[complaintId].trim()) {
            alert("Пожалуйста, добавьте комментарий к предупреждению")
            return
        }

        setComplaints(
            complaints.map((complaint) => {
                if (complaint.id === complaintId) {
                    return {
                        ...complaint,
                        status: "warning",
                        moderationComment: comments[complaintId],
                    }
                }
                return complaint
            }),
        )
    }

    const handleRejectComplaint = (complaintId: string) => {
        if (!comments[complaintId].trim()) {
            alert("Пожалуйста, добавьте комментарий с причиной отклонения жалобы")
            return
        }

        setComplaints(
            complaints.map((complaint) => {
                if (complaint.id === complaintId) {
                    return {
                        ...complaint,
                        status: "rejected",
                        moderationComment: comments[complaintId],
                    }
                }
                return complaint
            }),
        )
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`
    }

    // Фильтруем жалобы, чтобы показывать только ожидающие модерации
    const pendingComplaints = complaints.filter((complaint) => complaint.status === "pending")

    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8 text-black">
                <h1 className="text-3xl font-bold">Модерация жалоб</h1>
                <Link
                    href="/moderation"
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                    Назад
                </Link>
            </div>

            <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                {pendingComplaints.length > 0 ? (
                    pendingComplaints.map((complaint) => (
                        <div key={complaint.id} className="mb-8 last:mb-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <p className="font-medium text-black">Жалоба от:</p>
                                            <p className="text-lg text-black">{complaint.fromUsername}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-black">Жалоба на:</p>
                                            <p className="text-lg text-black">{complaint.toUsername}</p>
                                        </div>
                                    </div>
                                    <div className="border border-black rounded-md p-3 bg-white h-40">
                                        <p className="mb-2 font-medium text-black">Комментарии предупреждения:</p>
                                        <textarea
                                            value={comments[complaint.id]}
                                            onChange={(e) => handleCommentChange(complaint.id, e.target.value)}
                                            className="text-black w-full h-24 p-2 border border-gray-300 rounded-md"
                                            placeholder="Введите комментарий модератора..."
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleRejectComplaint(complaint.id)}
                                            className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 text-white"
                                        >
                                            Отклонить
                                        </button>
                                        <button
                                            onClick={() => handleIssueWarning(complaint.id)}
                                            className="px-4 py-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white"
                                        >
                                            Предупреждение
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <p className="font-medium text-black">Дата жалобы: {formatDate(complaint.date)}</p>
                                    </div>
                                    <div className="border border-black rounded-md p-3 bg-white h-full">
                                        <p className="mb-2 font-medium text-black">Комментарии жалобы</p>
                                        <div className="max-h-60 overflow-y-auto">
                                            <p className="text-black">{complaint.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {complaint !== pendingComplaints[pendingComplaints.length - 1] && (
                                <hr className="my-6 border-secondary" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-xl text-black">Нет жалоб, ожидающих модерации</p>
                    </div>
                )}
            </div>

            {complaints.some((complaint) => complaint.status !== "pending") && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Обработанные жалобы</h2>
                    <div className="border border-black rounded-lg p-6 bg-[#ffded0]">
                        {complaints
                            .filter((complaint) => complaint.status !== "pending")
                            .map((complaint) => (
                                <div key={complaint.id} className="mb-8 last:mb-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <div>
                                                    <p className="font-medium text-black">Жалоба от:</p>
                                                    <p className="text-lg text-black">{complaint.fromUsername}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-black">Жалоба на:</p>
                                                    <p className="text-lg text-black">
                                                        {complaint.toUsername}{" "}
                                                        <span className={complaint.status === "warning" ? "text-orange-600" : "text-red-600"}>
                                                            ({complaint.status === "warning" ? "Предупреждение" : "Отклонено"})
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="border border-black rounded-md p-3 bg-white">
                                                <p className="mb-2 font-medium text-black">Комментарий модератора:</p>
                                                <p className="text-black">{complaint.moderationComment}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2">
                                                <p className="font-medium text-black">Дата жалобы: {formatDate(complaint.date)}</p>
                                            </div>
                                            <div className="border border-black rounded-md p-3 bg-white h-full">
                                                <p className="mb-2 font-medium text-black">Комментарии жалобы</p>
                                                <div className="max-h-40 overflow-y-auto">
                                                    <p className="text-black">{complaint.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {complaint !==
                                        complaints.filter((c) => c.status !== "pending")[
                                        complaints.filter((c) => c.status !== "pending").length - 1
                                        ] && <hr className="my-6 border-black" />}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
