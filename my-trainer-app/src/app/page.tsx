'use client'
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import IMG from "@/components/ui/IMG";
import { useScrollFadeIn } from "@/hooks/useObserver";
import { useState } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<number>(1)

  const scrollTo = (currentSection:number) => {
    window.location.hash = `#${currentSection}`
  }
  useScrollFadeIn();
  return (
   
    <section className=" flex justify-evenly flex-col items-center my-24 gap-10 px-5">



      <section id="1" className="scroll-mt-40  flex flex-col lg:justify-center widescreen:section-min-height tallscreen:section-min-height">
        <h1 className="md:text-4xl text-2xl font-bold mb-4">Your Personal AI Gym Coach</h1>
        <p className="md:text-lg text-sm  max-w-xl mx-auto">
          Smarter training, faster progress. Train with 24/7 AI support, tailored plans, and real results.
        </p>
        <Button className="mt-6 text-lg px-6 py-3">Start 7-Day Free Trial</Button>
      </section>

      <section id="2" className="fade-section widescreen:section-min-height tallscreen:section-min-height w-full scroll-mt-40 flex flex-col gap-3 min-h-screen">
        <h1 className="dark:text-gray-50  text-gray-800 font-bold text-3xl text-center ">We offer</h1>
        <div className="flex flex-wrap  items-stretch h-full gap-4 justify-evenly">
          <FeatureCard
            title="Achieve Your Fitness Dreams"
            description="Custom plans, real-time coaching, and motivation on demand."
            content={<Button id="target"><a href="/AICoach" className="text-center w-full">Talk to our AI coach</a></Button>} />
          <FeatureCard
            title="Talk to Your AI Coach"
            description="Chat, get workout tips, nutrition advice, and mental support 24/7."
            content={<Button id="target"><a href="/AICoach" className="text-center w-full">Talk to our AI coach</a></Button>} />

          <FeatureCard
            title="24/7 Live Support"
            description="Need help? Our team is always available to assist you."
            content={<Button id="target"><a href="tel:+380 00 00 00" className="text-center w-full">Contact us</a></Button>} />

          <FeatureCard
            title="7-Day Free Trial"
            description="Test the experience before you commit. No strings attached."
            content={<Button>Start 7-Day Free Trial</Button>} />

        </div>
      </section>

      <section id="3" className="fade-section scroll-mt-40 widescreen:section-min-height tallscreen:section-min-height">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
        <ul className="space-y-4 flex flex-wrap justify-evenly gap-4 md:flex-row ">
          <li  className="w-full md:w-[50%] lg:w-[45%] text-center">
            <p className="my-5">
            <span className="font-semibold">Jan 2024:</span> Idea was born in a garage after skipping too many workouts.</p>
            <IMG alt="gymBackgroundImage" src="/gymBackground.jpg"/>
          </li>
          <li  className="w-full md:w-[50%] lg:w-[45%] text-center">
            <p className="my-5">
             <span className="font-semibold">Apr 2024:</span> First prototype with GPT-based fitness Q&A.
             </p>
            <IMG alt="AIprototypeImage" src="/AIprototype.jpg"/>
          </li>
          <li  className="w-full lg:w-[45%] text-center">
             <p className="my-5">
             <span className="font-semibold">Jul 2024:</span>
             First AI Coach went live with personalized workout features.</p>
             <IMG alt="coachImage" src="/coach.jpg"/>
          </li>
          <li  className="w-full  lg:w-[45%] text-center">
            <p className="my-5"><span className="font-semibold">Now:</span> 5,000+ users trust our AI to guide their fitness.</p> 
             <IMG alt="networkImage" src="/network.jpg"/>
          </li>
        </ul>
      </section>
      <div className="sticky h-[25vh] w-full items-end opacity-50 bottom-20 justify-end  z-50 flex flex-col gap-4">
        <Button className="w-20 text-2xl" onClick={() => {
          const current = currentSection - 1 < 1 ? 3 : currentSection - 1
          setCurrentSection(current)
          scrollTo(current)
        }
        }>
          ↑
        </Button>
        <Button className="w-20 text-2xl" onClick={() =>  {
          const current = currentSection + 1 > 3 ? 1 : currentSection + 1
          setCurrentSection(current) 
          scrollTo(current)
        }}>
          ↓
        </Button>
      </div>

    </section>


  );
}
