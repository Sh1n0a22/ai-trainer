"use client"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function NavBar() {
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const changeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }
    const links = [
        {href:"/", pageName:"Home"},
        {href:"/aboutUs", pageName:"About us"},
        {href:"/AICoach", pageName:"Our AI coach"},
    ]
    const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false)
    return (
        <nav className="bg-gray-300 dark:bg-gray-800  max-w-full flex justify-between px-4 md:justify-evenly items-center sticky top-0 z-20">
            <img src="/gym-logo.jpg" className="w-20 h-10 my-3" alt="logo" />

            <Menubar className="hidden md:flex ">

                <MenubarMenu>
                    {links.map((link) => {
                        const isActive = pathname === link.href
                       return <MenubarTrigger key={link.pageName}><Link className={cn("dark:text-gray-50 text-gray-800",{'text-amber-600 dark:text-amber-600':isActive})} href={link.href} >{link.pageName}</Link>
                     </MenubarTrigger>
                        })}
                </MenubarMenu>
                
                
               

            </Menubar>
            
            <section className={`
          fixed top-0 left-0 w-full h-screen bg-gray-300 dark:bg-gray-800 z-40
          transform ${isBurgerMenu ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300
          flex flex-col  py-5 space-y-4
        `}>
                <div className="self-end px-4">
                    <Button className="text-2xl w-fit" onClick={() => setIsBurgerMenu(false)}>&times;</Button>
                </div>
                <div className="flex flex-col gap-2.5 self-start px-4">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                       return <Link className={cn("dark:text-gray-50 text-gray-800",{'text-amber-600 dark:text-amber-600':isActive})} href={link.href} key={link.pageName}>{link.pageName}</Link>
                        })}
                </div>
            </section>
            <div className="flex gap-4 items-center">
            <a href="tel:+380 00 00 00" className=" hidden md:inline dark:text-gray-50 text-gray-800">+380 00 00 00</a>
            <Button onClick={changeTheme} className="w-fit"><img className="w-6" src={theme === "dark" ? "light.svg" : "dark.svg"}/></Button>
            <Button className="block md:hidden" onClick={() => setIsBurgerMenu(true)}>☰</Button>
            </div>
        </nav>


    )
}