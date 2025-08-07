"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { main } from "./AIService";
import LimitationModal from "@/components/LimitationsModal";
import Markdown from "@/components/messageMarkdown";
import { useChatStore } from "@/providers/ChatProvider";
import { chatMessage } from "@/stores/AIChatStore";
import { useUserChatsStore } from "@/providers/UserChatsProvider";
import CreateChatModal from "@/components/CreateChatModal";
import ClearHistoryModal from "@/components/ClearHistoryModal";
import DeleteChatModal from "@/components/DeleteChatModal";
import { useTheme } from "next-themes";





export default function AICoach() {
    const {  theme } = useTheme()


    const [showClearHistoryModal, setShowClearHistoryModal] = useState<boolean>(false)
    const [showDeleteChatModal, setShowDeleteChatModal] = useState<boolean>(false)
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
    const [showCreateModal, setshowCreateModal] = useState<boolean>(false)
    const [chatIdToDelete, setChatIdToDelete] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [userQuestion, setUserQuestion] = useState<string>("")
    const [isChatsMenu, setIsChatsMenu] = useState<boolean>(false)

    const chatHistory = useChatStore((history) => history.chatHistory)
    const addMessage = useChatStore((message) => message.addMessage)
    const getCurrentChatHistory = useChatStore((history) => history.getCurrentChatHistory)

    const userChats = useUserChatsStore((chats) => chats.chats)
    const getUserChats = useUserChatsStore((chats) => chats.getUserChats)
    const getActiveChat = useUserChatsStore(chat => chat.getActiveChat)
    const setActiveChat = useUserChatsStore(chat => chat.setActiveChat)


    const activeChat =  getActiveChat()

    useEffect(() => {
        getUserChats()
    }, [])

    useEffect(() => {
        if (userChats.length > 0 && !userChats.some(chat => chat.isSelected)) {
            selectChat(userChats[0].id)
        }
    }, [userChats])


    const selectChat = useCallback((chatId: string) => {
        setActiveChat(chatId)
        getCurrentChatHistory(chatId)
    }, [setActiveChat,getCurrentChatHistory])


    const openClearChatModal = useCallback(() => {
        setShowClearHistoryModal(true)
    },[])

    const openDeleteChatModal = useCallback((ChatId: string) => {
        setShowDeleteChatModal(true)
        setChatIdToDelete(ChatId)
    },[])



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

    const renderedMessages = useMemo(()=>{
     return chatHistory.map((msg, i) => {
                const isUser = msg.role === "user";
                return isUser ? (
                  <p
                    key={"question" + i}
                    className={cn(
                      "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50 p-3 m-2 rounded-tr-xl rounded-l-2xl w-fit xs:max-w-1/2",
                      { "ml-auto xs:max-w-1/2 w-fit": isUser }
                    )}
                  >
                    {msg.message}
                  </p>
                ) : (
                  <div
                    key={"answer-" + i}
                    className={cn(
                      "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50 p-3 m-2 rounded-tl-xl rounded-r-2xl w-fit xs:max-w-1/2"
                    )}
                  >
                    <Markdown markdown={msg?.message} />
                  </div>
                );
              })
    },[chatHistory])

     return (
    <>
      {showCreateModal && <CreateChatModal closeModal={setshowCreateModal} />}
      {showErrorModal && <LimitationModal errorMessage={errorMessage} closeModal={setShowErrorModal} />}
      {showClearHistoryModal && <ClearHistoryModal closeModal={setShowClearHistoryModal} />}
      {showDeleteChatModal && <DeleteChatModal ChatId={chatIdToDelete} closeModal={setShowDeleteChatModal} />}

      <div className="grid grid-cols-[1fr] p-2">
         <Button
          variant={"ghost"}
          className="hover:dark:bg-gray-700 w-10 sticky top-16 col-start-2  right-0 text-2xl"
          onClick={() => setIsChatsMenu(true)}
        >
          ☰
        </Button>

        {/* Main Column: Chat + Input */}
    
          <div className="flex flex-col w-full max-w-3xl mx-auto min-h-[calc(100dvh-4rem)] justify-between">
          {/* Chat History */}
          <div >
            {renderedMessages}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => sendCoachRequest(e)}
            className="w-full sticky bottom-0 z-30 dark:bg-gray-800 border-input flex flex-col h-fit min-w-0 rounded-3xl border bg-background p-5 text-base shadow-xs gap-2.5"
          >
            <Input
              className="border-0 dark:bg-input/0 focus-visible:ring-0 p-4 my-2 max-h-fit align-text-bottom"
              value={userQuestion}
              placeholder="Ask anything"
              onChange={(e) => setUserQuestion(e.target.value)}
            />

            <div className="flex gap-2 justify-between flex-row w-full">
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={openClearChatModal}
                  className="w-fit font-semibold md:text-lg rounded-3xl"
                >
                 <img src={theme === "dark" ? "/broomBlack.png" : "/BroomWhite.png"} className="w-6" alt="" />
                </Button>
                <Button
                  type="button"
                  onClick={() => setshowCreateModal(true)}
                  className="w-fit font-semibold md:text-lg rounded-3xl"
                >
                  <img src={theme === "dark" ? "/newChatBlack.png" : "/newChatWhite.png"} className="w-6" alt="" />
                </Button>
              </div>
              <Button
                type="submit"
                className="font-semibold text-2xl w-fit rounded-3xl"
              >
                &uarr;
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar (Aside) */}
        <aside
          className={cn(
            "fixed top-0 right-0 w-[300px] p-4 rounded-xl h-full bg-gray-300 dark:bg-gray-800 z-40 transition-transform duration-300 flex flex-col py-5 space-y-4",
            isChatsMenu ? "translate-x-0" : "translate-x-full"
          )}
        >
          <Button
            variant={"ghost"}
            className="hover:dark:bg-gray-700 text-2xl self-end"
            onClick={() => setIsChatsMenu(false)}
          >
            x
          </Button>
          {userChats.map((chat) => {
            const isSelectedChat = chat.isSelected === true;
            return (
              <div
                className="flex items-center justify-between px-2"
                key={`chat-${chat.id}`}
              >
                <p
                  onClick={() => selectChat(chat.id)}
                  className={cn(
                    "p-3 m-2 rounded-2xl cursor-pointer",
                    {
                      "bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-50":
                        isSelectedChat,
                    }
                  )}
                >
                  {chat.title}
                </p>
                <Button onClick={() => openDeleteChatModal(chat.id)}>
                    <img src={theme === "dark" ? "/binBlack.png" : "/binWhite.png"} className="w-6" alt="" />
                </Button>
              </div>
            );
          })}
        </aside>

      </div>
    </>
  );


    
}