"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { main } from "./AIService";





export default function AICoach() {

    const [userQuestion, setUserQuestion] = useState<string>("")
    const [chatInfo, setChatInfo] = useState<{ role: "user" | "model", parts: [{ text: string }] }[]>([])

    const sendCoachRequest = async () => {
        setChatInfo((prev) => [...prev, { role: "user", parts: [{ text: userQuestion }] }])
        const updated: { role: "user" | "model", parts: [{ text: string }] }[] = [
            ...chatInfo,
            { role: "user", parts: [{ text: userQuestion }] }
        ];

        const AIResponse = await main(updated)

        setChatInfo((prev) => [...prev, { role: "model", parts: [{ text: AIResponse as string }] }])
        setUserQuestion("")
    }
    return (

        <>
            <div className="flex-1 overflow-auto p-4">
                {chatInfo.map((message, i) => {
                    const isUser = message.role === "user"
                    return <p key={i} className={cn("bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-50 p-3 m-2 rounded-xl w-fit max-w-1/2", { "ml-auto max-w-1/2 w-fit": isUser })}>{message.parts[0].text}</p>
                })}
            </div>
            <div className="flex gap-4 m-2">
                <Input className="border border-black" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
                <Button onClick={sendCoachRequest} className="font-semibold text-2xl rounded-3xl">&uarr;</Button>
            </div>
        </>
    )
}