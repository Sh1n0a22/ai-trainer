
'use client'

import { createUserChatsStore, userChatsStoreType } from '@/stores/ChatsStroe'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type userChatsStoreApi = ReturnType<typeof createUserChatsStore>

export const UserChatsStoreContext = createContext<userChatsStoreApi | undefined>(
  undefined,
)

export interface UserChatsStoreProviderProps {
  children: ReactNode
}

export const UserChatsStoreProvider = ({
  children,
}: UserChatsStoreProviderProps) => {
  const storeRef = useRef<userChatsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createUserChatsStore()
  }

  return (
    <UserChatsStoreContext.Provider value={storeRef.current}>
      {children}
    </UserChatsStoreContext.Provider>
  )
}

export const useUserChatsStore = <T,>(
  selector: (store: userChatsStoreType) => T,
): T => {
  const userChatsStore = useContext(UserChatsStoreContext)

  if (!userChatsStore) {
    throw new Error(`useUserChatsStore must be used within UserChatsStoreProvider`)
  }

  return useStore(userChatsStore, selector)
}
