import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AboutUs() {
  const team: {role: string, img: string}[] = [
    {role: "Trainer", img:"nutritionist.jpg"},
    {role:"Designer",img:"designer.jpg"},
    {role:"Software engineer", img:"software-Engineer.jpg"}
  ]
  return (<>
    <section className="flex justify-evenly flex-col items-center relative my-24 h gap-10 px-5 md:items-baseline">
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">About Us</h4>
      <p>
        We’re a team of fitness enthusiasts, data scientists, and software engineers who believe everyone should have access to a great coach — without the high cost or schedule limits. <br />
        After years of working in AI and health tech, we built this platform to help anyone train smarter, not harder.
      </p>
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl flex items-baseline gap-2"> <img src="/target.png" className="w-6  h-full" alt="" />Our aim </h4>
      <p>Make personalized fitness guidance affordable, accessible, and backed by real data — for everyone.</p>
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">🧩 Why We Built This?</h4>
      <p>
        Traditional fitness coaching often feels out of reach: expensive, time-limited, or too generic.
        We wanted to change that.<br />
        By combining the power of AI with real sports science, we built a platform where anyone — anywhere — can get personalized training that adapts to their goals, lifestyle, and progress.
      </p>
    </section>
    <div className="flex flex-col items-center">
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">Our team</h4>
      
        <Carousel className="">
          <CarouselContent className="">
           {team.map((member:{role:string,img:string},key)=> {return(
            <CarouselItem key={key}>
              <img className="w-40 lg:w-60 rounded-full text-center" src={member.img} alt="carouselImg"/>
              <p className="text-xl font-semibold">{member.role}</p>
            </CarouselItem>
            )})}
          </CarouselContent>
         
        </Carousel>

      </div>
    </>
  )
}