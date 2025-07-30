"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { main } from "./AIService";
import LimitationModal from "@/components/LimitationsModal";
import Markdown from "@/components/messageMarkdown";
import { useChatStore } from "@/providers/ChatProvider";
import { chatMessage } from "@/stores/AIChatStore";
import { useUserChatsStore } from "@/providers/UserChatsProvider";
import { createClient } from "@/utils/supabase/client";
import CreateChatModal from "@/components/CreateChatModal";





export default function AICoach() {
    const [userQuestion, setUserQuestion] = useState<string>("")
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
    const [showCreateModal, setshowCreateModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const chatHistory = useChatStore((history) => history.chatHistory)
    const chatId = useChatStore(id => id.chatId)
    const addMessage = useChatStore((message) => message.addMessage)
    const clearchat = useChatStore((history) => history.clearChat)
    const getCurrentChatHistory = useChatStore((history) => history.getCurrentChatHistory)

    const userChats = useUserChatsStore((chats) => chats.chats)
    const deleteChat = useUserChatsStore((chats) => chats.deleteChat)
    const getUserChats = useUserChatsStore((chats) => chats.getUserChats)
    const getActiveChat = useUserChatsStore(chat => chat.getActiveChat)
    const setActiveChat = useUserChatsStore(chat => chat.setActiveChat)

    const activeChat = getActiveChat()
    useEffect(() => {
        getUserChats()
    }, [])

    const handleDelete = (chatTodelId: string) => {
        deleteChat(chatTodelId)
    }
    const selectChat =  (chatId: string) => {
        setActiveChat(chatId)
       getCurrentChatHistory(chatId)
    }
    const clearChatHistory =  () => {
        clearchat(activeChat.id)
       getCurrentChatHistory(activeChat.id)
    }



    const sendCoachRequest = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addMessage('user', userQuestion, activeChat.id)

        const updatedHistory: chatMessage[] = [
            ...chatHistory,
            { role: "user", message: userQuestion, chatId: activeChat.id }
        ]


        const { AIResponse, error } = await main(updatedHistory)


        addMessage('model', AIResponse, activeChat.id)
        if (error) {
            const parsedMes = error?.message
            setErrorMessage(parsedMes)
            setShowErrorModal(true)
            setUserQuestion("")
            return null
        } else {
            setUserQuestion("")
        }
    }

    return (
        <>
            <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full">
                {showCreateModal && <CreateChatModal closeModal={setshowCreateModal} />}
                {showErrorModal && <LimitationModal errorMessage={errorMessage} closeModal={setShowErrorModal} />}
                <div className="flex-1 overflow-auto p-4 col-span-4 row-span-4">
                    {chatHistory && chatHistory.map((msg, i) => {

                        const isUser = msg.role === "user"
                        return msg.role === "user" ? (<p key={"question" + i} className={cn("bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50 p-3 m-2 rounded-tr-xl rounded-l-2xl w-fit xs:max-w-1/2", { "ml-auto xs:max-w-1/2 w-fit": isUser })}>
                            {msg.message}
                        </p>) : (<div key={"answer-" + i} className={cn("bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50 p-3 m-2 rounded-tl-xl rounded-r-2xl w-fit xs:max-w-1/2")}>
                            <Markdown markdown={msg?.message} />
                        </div>);
                    })}
                </div>
                <aside className="row-span-4 col-start-5 overflow-y-scroll">
                    {userChats.map((chat) => {
                        const isSelectedChat = chat.isSelected === true
                        return (
                            <div className="flex items-center justify-between px-2" key={`chat-${chat.id}`}>
                                <p onClick={() => selectChat(chat.id)} className={cn(" p-3 m-2 rounded-2xl cursor-pointer", { "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50": isSelectedChat })}>{chat.title}</p>
                                <Button onClick={() => handleDelete(chat.id)}>del</Button>
                            </div>
                        )
                    })}
                </aside>
                <form onSubmit={(e) => sendCoachRequest(e)} className="flex gap-4 m-2 flex-wrap col-span-5 row-start-5">
                    <Input className="border border-black" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
                    <Button type="submit" className="font-semibold text-2xl rounded-3xl">&uarr;</Button>
                    <Button type="button" onClick={clearChatHistory} className="font-semibold md:text-lg rounded-3xl">clearChat</Button>
                    <Button type="button" onClick={() => setshowCreateModal(true)} className="font-semibold md:text-lg rounded-3xl">Create new Chat</Button>
                </form>
            </div>
        </>



    )
}