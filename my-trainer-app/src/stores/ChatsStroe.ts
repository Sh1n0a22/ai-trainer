import { createClient } from "@/utils/supabase/client"
import { createStore } from "zustand/vanilla"

export type chatInfo = {
    id: string
    user_id: string
    title: string
    isSelected: boolean
}

export type userChats = {
    chats: chatInfo[]
}

export type userChatsActions = {
    createNewChat: (titleText: string) => void
    deleteChat: (chatId: string) => void
    getUserChats: () => void
    getActiveChat: () => chatInfo 
    setActiveChat: (chatId:string) => void
}

export const userChatsInitialState: userChats = {
    chats: []
}

export type userChatsStoreType = userChats & userChatsActions


export const createUserChatsStore = (Initchats: userChats = userChatsInitialState) => {
    const supabase = createClient()

    return createStore<userChatsStoreType>()((set,get) => ({
        ...Initchats,
        deleteChat: async (chatId) => {
            const { error } = await supabase.from('Chats').delete().eq("id", chatId)
            if (error) {
                console.error("Error occured while deleting chat:", error)
                return
            }
            set((state) => ({
                ...state,
                chats: state.chats.filter(chatToDel => chatToDel.id !== chatId)
            }))
        },
        createNewChat: async (titleText) => {
            const userId = (await supabase.auth.getUser()).data.user?.id

            const { data, error } = await supabase
                .from('Chats')
                .insert([{ title: titleText, user_id: userId }])
                .select('id, title, user_id')
                .single()

            if (error) {
                console.error("Error occured while creating new chat:", error)
                return
            }
           
            if (data) {
                set((state) => ({
                    ...state,

                    chats: state.chats.map(newChat => ({ ...newChat, isSelected: false }))
                        .concat({ ...data, isSelected: true })
                }))
            }
        },
        getUserChats: async () => {
            const { data, error } = await supabase.from('Chats').select('id, title, user_id')
            if (error) {
                console.error("Error occured while getting chats", error)
            }

            if (data) {
                set((state) => ({
                    ...state,
                    chats: data.map(chat => ({ ...chat, isSelected: false }))
                }))
            }
        },
        setActiveChat: async (chatId: string) => {
            set((state) => ({
                ...state,
                chats: state.chats.map((chat) => chat.id === chatId ? { ...chat, isSelected: true } : { ...chat, isSelected: false })
            }))
        },
        getActiveChat: () => {
          return get().chats.find(chat => chat.isSelected === true) ||  get().chats[0]
        }

    }))
}