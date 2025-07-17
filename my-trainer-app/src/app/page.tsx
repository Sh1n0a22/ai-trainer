export default function Home() {
  return (

  <section className="flex  justify-evenly flex-col items-center my-24 lg:flex-row gap-10 px-5">

    <div>
    <h4 className="dark:text-gray-50  text-gray-800 font-bold text-3xl">We offer: </h4>
    <ul className="flex flex-col  dark:text-gray-50 text-gray-800 list-disc pl-7 my-5 text-lg">
      <li >
       Help with achieving your dreams
      </li>
      <li> 
        have a talk with our AI coah 
      </li>
      <li>
       <span className="font-semibold">24/7</span> 
       live support
       </li>
    </ul>
    <h4 className="dark:text-gray-50 text-gray-800 font-bold text-3xl">Get 7 day free trial</h4>
    </div>

    <img src="/gymBackground.jpg" className=" lg:w-2xl w-auto opacity-85 " alt="" />
  </section>


  );
}
