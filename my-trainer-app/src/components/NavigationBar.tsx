"use client"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { use, useEffect, useLayoutEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import LogoutModal from "./LogoutModal"
import BurgerMenu from "./BurgerMenu"
import useUser from "@/hooks/useUser"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

export default function NavBar() {
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const userFromHook = useUser()
    const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false)
    const [logOutConfimation, setLogOutConfimation] = useState<boolean>(false)

    const changeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }

    const links = [
        { href: "/", pageName: "Home" },
        { href: "/aboutUs", pageName: "About us" },
        { href: "/AICoach", pageName: "Our AI coach" },
    ]

    // Determine if we should show user-related content
    const user = pathname.includes("/forgetPassword/") || pathname.includes("/passwordReset") ? null : userFromHook

    return (<>
        {logOutConfimation && <LogoutModal setLogOutConfimation={setLogOutConfimation} />}
        <nav className="bg-gray-300 dark:bg-gray-800  max-w-full flex overflow-clip justify-between px-4 md:justify-between items-center sticky top-0 z-20">

            <img
                src="/gym-logo60px.png"
                srcSet="
                        /gym-logo-w96px.png 96w,
                        /gym-logo60px.png 60w"
                sizes="
                        (min-width: 767px) 96px, 60px"
                className="my-3 w-10"
                alt="logo"
            />
       

            {user !== null &&
                <Menubar className="hidden md:flex ">
                    <MenubarMenu>
                        {links.map((link) => {
                            const isActive = pathname === link.href
                            return <MenubarTrigger key={link.pageName}><Link className={cn("dark:text-gray-50 text-gray-800", { 'text-amber-600 dark:text-amber-600': isActive })} href={link.href} >{link.pageName}</Link>
                            </MenubarTrigger>
                        })}
                    </MenubarMenu>
                </Menubar>
            }

            <BurgerMenu isBurgerMenu={isBurgerMenu} setIsBurgerMenu={setIsBurgerMenu} />

            <div className="flex gap-2 md:gap-4 items-center">
                <a href="tel:+380 00 00 00" className=" hidden md:inline dark:text-gray-50 text-gray-800">+380 00 00 00</a>
                <Button onClick={changeTheme} aria-label="theme togler" className="w-fit"><img alt="themeTogler" className="w-6" src={theme === "dark" ? "light.svg" : "dark.svg"} /></Button>
                <Button className="block md:hidden" aria-label="mobile navigation menu" onClick={() => setIsBurgerMenu(true)}>☰</Button>
                {user && (
                    <Button onClick={() => setLogOutConfimation(true)}>Log out</Button>
                )}
            </div>
        </nav>
    </>)
}