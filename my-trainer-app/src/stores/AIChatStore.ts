import { createClient } from '@/utils/supabase/client'
import { createStore } from 'zustand/vanilla'

export type chatMessage = {
  chatId: string
  role: 'user' | 'model',
  message: string
}
export type chatInitialStateType = {
  chatHistory: chatMessage[]
  chatId: string
}

export type chatActionsType = {
  addMessage: (role: 'user' | 'model', text: string, chatId: string) => void
  clearChat: (chatId:string) => void
  getCurrentChatHistory: (cahtId: string) => void
}

export type ChatStoreType = chatActionsType & chatInitialStateType

export const chatInitialState: chatInitialStateType = {
  chatHistory: [],
  chatId: ""
}




export const createChatStore = (initState: chatInitialStateType = chatInitialState) => {
  const supabase = createClient()
  return createStore<ChatStoreType>()((set) => ({
    ...initState,
    getCurrentChatHistory: async (chatId) => {
      const { data, error } = await supabase
        .from('Messages')
        .select('chat_id, sender_role, content')
        .eq('chat_id', chatId)
      if (error) {
        console.error("Error occured while sending message:", error)
        return
      }
        const mapped:chatMessage[] = data.map(msg => ({
          chatId:msg.chat_id,
          role:msg.sender_role,
          message:msg.content,
        })) || []
        set((state) => ({
          ...state,
          chatHistory: mapped
        })) 
      
    },
    addMessage: async (role, text, chatId) => {
      const { data, error } = await supabase
        .from('Messages')
        .insert([{ chat_id: chatId, content: text , sender_role: role }])
        .select('id , chat_id, content, sender_role')
        .single()
      if (error) {
        console.error("Error occured while sending message:", error)
        return
      }
      if (data) {
        set((state) => ({
          ...state,
          chatHistory: [...state.chatHistory, { role, message:  text ,chatId: chatId}]
        }))
      }
    },
    clearChat: async (chatId) => {
      const {data,error} = await supabase
      .from('Messages')
      .delete()
      .eq('chat_id',chatId)

      if (error) {
         console.error("Error occured while clearing chat:", error)
        return
      }
      if (data) {
        set((state) => ({
          ...state,
          chatHistory: []
        }))
      }
    }
      // set((state) => ({ ...state, chatHistory: [] })),
  }))
}