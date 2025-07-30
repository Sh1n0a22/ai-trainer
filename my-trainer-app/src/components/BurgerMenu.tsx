"use client"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface BurgerMenuTypes {
    isBurgerMenu: boolean
    setIsBurgerMenu: (setter:boolean) => void
}
export default function BurgerMenu ({isBurgerMenu,setIsBurgerMenu}:BurgerMenuTypes) {
        const links = [
        { href: "/", pageName: "Home" },
        { href: "/aboutUs", pageName: "About us" },
        { href: "/AICoach", pageName: "Our AI coach" },
    ]
        const pathname = usePathname()
    
    return(
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
                        return <Link className={cn("dark:text-gray-50 text-gray-800", { 'text-amber-600 dark:text-amber-600': isActive })} href={link.href} key={link.pageName}>{link.pageName}</Link>
                    })}
                </div>
            </section>
    )
}