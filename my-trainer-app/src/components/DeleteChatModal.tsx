import { Button } from "./ui/button";
import { useUserChatsStore } from "@/providers/UserChatsProvider";

interface DeleteModalTypes {
   closeModal : (setter: boolean) => void
   ChatId:string
}

export default function DeleteChatModal({ closeModal , ChatId}: DeleteModalTypes ) {
    const deleteChat = useUserChatsStore((chats) => chats.deleteChat)
        
    const handleDeleteChat = () => {
        deleteChat(ChatId)
        closeModal(false)
    }
    return (<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 flex flex-col p-6 gap-2 rounded-xl shadow-xl justify-between">
            <h1 className="font-semibold text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">
                Are you sure you want to delete this chat?
            </h1>
            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => closeModal(false)}>
                    Cancel
                </Button>
                <Button onClick={handleDeleteChat}>delete chat</Button>
            </div>
        </div>
    </div>)
}