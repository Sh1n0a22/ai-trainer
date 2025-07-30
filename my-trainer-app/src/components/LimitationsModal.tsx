import { Button } from "./ui/button";
interface LimitationModalTypes {
    closeModal:(setter:boolean) => void
    errorMessage:string
}
export default function LimitationModal ({closeModal,errorMessage}:LimitationModalTypes) {
    return(<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        
            <div className="bg-white dark:bg-gray-900  w-full lg:max-w-1/3  flex flex-col  justify-between p-6 rounded-xl shadow-xl text-center">
                <h1 className="font-semibold text-start text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">
                   Something went wrong
                </h1>
                <hr />
                <p className="py-4 text-start ">{errorMessage ? errorMessage : "" }</p>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={() => closeModal(false)}>
                        Close
                    </Button>
                  
                </div>
                
            </div>
        </div>)
}