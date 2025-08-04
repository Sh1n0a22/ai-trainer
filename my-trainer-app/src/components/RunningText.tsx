export default function RunningText({text}:{text:string}) {
  const items = Array(10).fill(
    <div className="flex items-center gap-3">
      <span className="text-xl uppercase font-bold text-gray-900 dark:text-gray-50">
       {text}
      </span>
    </div>
  );

  return (
    
   <div className="overflow-hidden whitespace-nowrap w-full dark:bg-gray-800 bg-gray-300 text-gray-900 dark:text-gray-50 relative">


     <div className="overflow-hidden w-full dark:bg-gray-800 h-14 lg:h-16 flex ">
      <div className="running-line flex w-max items-center gap-6">
        {/* First copy */}
        {items.map((el, i) => (
          <div key={`first-${i}`}>{el}</div>
        ))}
        {/* Second copy for seamless loop */}
        {items.map((el, i) => (
          <div key={`second-${i}`}>{el}</div>
        ))}
      </div>
    </div>

   </div>
   
  );
}
