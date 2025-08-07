import RunningText from "@/components/RunningText"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"


export default function AboutUs() {
  const team: { role: string, img: string }[] = [
    { role: "Trainer", img: "nutritionist.jpg" },
    { role: "Designer", img: "designer.jpg" },
    { role: "Software engineer", img: "software-Engineer.jpg" }
  ]
  return (<>
    <section className="flex justify-end flex-col items-center relative my-24 h gap-8 px-5 max-w-7xl mx-auto ">
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">About Us</h4>
      <p className="dark:text-gray-50  text-gray-800 md:text-xl">
        We’re a passionate team of fitness experts, data scientists, and software engineers united by a single mission: to make world-class personal training accessible to everyone — anytime, anywhere.
        <br />
        After years of experience in artificial intelligence, machine learning, and health technology, we saw a gap in the fitness world: high-quality coaching was often expensive, time-restricted, or limited by geography. So, we set out to solve that.
        <br />
        Our platform leverages the power of AI to deliver personalized, adaptive training that evolves with you. Whether you're a beginner or an athlete, our AI fitness trainer learns your body, goals, and progress to craft smarter workouts — not just harder ones.
      </p>
      <Button className="w-48 h-12 rounded-4xl text-lg" id="target">
        <a href="tel:+380 00 00 00" className="text-center w-full">Contact us</a>
      </Button>
    </section>

    <RunningText text="be healthy" />


    <section>


      <section className="flex lg:flex-row flex-col max-w-7xl mx-auto  items-center gap-10 lg:gap-20 justify-between relative my-10 px-5">
        <img className="rounded-2xl h-[24rem] sm:h-[28rem] lg:h-[32rem] mx-auto w-full max-w-lg lg:w-1/2" src="ourHistory.jpg" alt="ourHistoryImg" />
        <div className="flex-1">
          <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">Our History</h4>

          <p className="dark:text-gray-50  text-gray-800 text-base md:text-xl mt-4">
            Our journey began with a question:
            What if cutting-edge AI could do more than just track your workouts — what if it could coach you?

            Our founders — a mix of fitness professionals, AI engineers, and health data scientists — were frustrated by how inaccessible and inconsistent traditional personal training could be. Great coaching was often expensive, time-consuming, or limited by geography.

            In 2022, we set out to change that. We combined years of experience in machine learning, biomechanics, and health behavior science to build a platform that turns any device into a personal AI fitness coach.

            What started as a simple movement analysis tool has evolved into a full coaching engine — one that adapts to your goals, corrects your form in real time, and intelligently adjusts your training as you improve. No schedules. No guesswork. Just smarter, personalized training.

            Today, we continue to push boundaries — combining human-level coaching insight with scalable technology to help people move better, live stronger, and train smarter.
          </p>
        </div>
      </section>


    </section>
    <section className="flex lg:flex-row flex-col max-w-7xl mx-auto items-center gap-10 lg:gap-20 justify-between relative my-10 px-5" >

      <Carousel className="">
        <CarouselContent className="">
          {team.map((member: { role: string, img: string }, key) => {
            return (
              <CarouselItem key={key}>
                <img className="w-60 lg:w-60 rounded-full text-center" src={member.img} alt="carouselImg" />
                <p className="text-xl font-semibold">{member.role}</p>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>



      <div className="">
      <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">Our team</h4>
        <span className=" text-base md:text-xl"> 
          Behind every smart rep, real-time correction, and personalized workout is a team driven by one mission: to redefine fitness through technology.

          We’re a multidisciplinary group of experts combining science, code, and design to make intelligent training accessible to everyone.
        </span>
        <br />
        <br />
        <ul className=" text-base md:text-xl">
          <li>
            🏋️ Fitness Trainers
            Our certified coaches shape the training logic behind the AI — bringing deep knowledge of exercise science, biomechanics, and performance coaching to every digital session.
          </li>

          <li>
            🎨 Designers
            We believe that effective training should also feel effortless. Our design team ensures the experience is intuitive, engaging, and motivating — whether you're on your phone or in the gym.
          </li>

          <li>
            💻 Software Engineers
            From real-time form analysis to adaptive workout plans, our engineers build the brain of the platform. With a focus on AI, machine learning, and system performance, they turn complex data into simple, effective fitness guidance.
          </li>
        </ul>
        <br />
        <br />
       <span className=" text-base md:text-xl">Together, we’re building more than just an app — we’re building your smartest training partner yet.</span> 
      </div>
    </section>
  </>
  )
}