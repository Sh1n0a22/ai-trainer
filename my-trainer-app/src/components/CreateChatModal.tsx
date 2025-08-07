import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserChatsStore } from "@/providers/UserChatsProvider";
interface CreateChatModalProps {
    closeModal: (setter: boolean) => void
}
export default function CreateChatModal({ closeModal }: CreateChatModalProps) {
    const createNewChat = useUserChatsStore((chats) => chats.createNewChat)
    const chatTitleRef = useRef<HTMLInputElement>(null)

    const handleChatCreation = async() => {
        const newChatTitle = chatTitleRef.current?.value
        if (newChatTitle) {
            createNewChat(newChatTitle)
            closeModal(false)
        }
        else return console.error("Title cant be empty")
    }
    return (<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">

        <div className="bg-white dark:bg-gray-900  w-full lg:max-w-1/3  flex flex-col  justify-between p-6 rounded-xl shadow-xl text-center min-h-60">
            <h1 className="font-semibold text-start text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">
                Please Provide Chat infro
            </h1>
            <form onSubmit={handleChatCreation}>
                <Label htmlFor="Label" className="text-xl">Title</Label>
                <Input type="text" placeholder="please enter title for chat" required ref={chatTitleRef} />

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" onClick={() => closeModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" type="submit">
                        Create Chat
                    </Button>
                </div>
            </form>
        </div>
    </div>)
}