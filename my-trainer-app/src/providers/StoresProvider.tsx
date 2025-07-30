import { ReactNode } from "react";
import { UserChatsStoreProvider } from "./UserChatsProvider";
import { ChatStoreProvider } from "./ChatProvider";

export default function StoresProvider ({children} :{children : ReactNode}) {
    return (
    
        <UserChatsStoreProvider>
            <ChatStoreProvider>
                {children}
            </ChatStoreProvider>
        </UserChatsStoreProvider>

    )
}