"use client"
import { Button } from "./ui/button";
import { useChatStore } from "@/providers/ChatProvider";
import { useUserChatsStore } from "@/providers/UserChatsProvider";
import { useCallback } from "react";

interface ModalTypes {
    closeModal: (setter: boolean) => void
}

export default function ClearHistoryModal({ closeModal }: ModalTypes) {
    const getActiveChat = useUserChatsStore(chat => chat.getActiveChat)
    const clearchat = useChatStore((history) => history.clearChat)
    const getCurrentChatHistory = useChatStore((history) => history.getCurrentChatHistory)

        const activeChat = getActiveChat()
    const handleClearChat = useCallback(async () => {
        await clearchat(activeChat.id)
        await getCurrentChatHistory(activeChat.id)
        await closeModal(false)
    }, [activeChat])


    return (<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 flex flex-col p-6 gap-2 rounded-xl shadow-xl justify-between">
            <h1 className="font-semibold text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">
                Are you sure you clear chat history?
            </h1>
            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => closeModal(false)}>
                    Cancel
                </Button>
                <Button onClick={handleClearChat}>Clear history</Button>
            </div>
        </div>
    </div>)
}