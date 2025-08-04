
'use client'

import { ChatStoreType, createChatStore } from '@/stores/AIChatStore'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'


export type ChatStoreApi = ReturnType<typeof createChatStore >

export const ChatStoreContext = createContext<ChatStoreApi | undefined>(
  undefined,
)

export interface ChatStoreProviderProps {
  children: ReactNode
}

export const ChatStoreProvider = ({
  children,
}: ChatStoreProviderProps) => {
  const storeRef = useRef<ChatStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createChatStore()
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  )
}

export const useChatStore = <T,>(
  selector: (store: ChatStoreType) => T,
): T => {
  const chatStore= useContext(ChatStoreContext)

  if (!chatStore) {
    throw new Error(`useCounterStore must be used within ChatStore`)
  }

  return useStore(chatStore, selector)
}
