import { cn } from "@/lib/utils";

export default function IMG ({src,alt,className}:{src:string,alt:string,className?:string}) {
    return <img alt={alt} src={src} className={cn(" h-96 rounded-2xl mx-auto w-full max-w-md",className)}/>
} 