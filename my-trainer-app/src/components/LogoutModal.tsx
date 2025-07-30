import { logout } from "@/app/(auth)/actions";
import { Button } from "./ui/button";
import { logoutClient } from "@/app/(auth)/clientActions";

interface LogoutModalTypes {
    setLogOutConfimation: (setter:boolean) => void
}


export default function LogoutModal({setLogOutConfimation}: LogoutModalTypes) {
    const handleLogout = () => {
        logout()
        logoutClient()
        setLogOutConfimation(false)
    }
    return (<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 h-1/3 flex flex-col  justify-center p-6 rounded-xl shadow-xl text-center">
                <h1 className="font-semibold text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">
                    Are you sure you want to log out?
                </h1>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={  () => setLogOutConfimation(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleLogout}>Log out</Button>
                </div>
            </div>
        </div>)
}