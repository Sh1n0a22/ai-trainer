"use client"
import { ReactNode, useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavigationBar";
import { ThemeProvider } from "./theme-provider";

export default function ThemeWrapper ({children} : {children: ReactNode}) {
    const [mounted, setMounted] = useState<boolean>(false)
      useEffect(() => {
        setMounted(true)
      },[])
    return mounted && ( <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              </div>
            </ThemeProvider> )
}