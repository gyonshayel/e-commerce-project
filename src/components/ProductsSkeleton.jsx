export function ProductsSkeleton() {
  return (
    <div
      className="grid 
          grid-cols-8
          max-[2000px]:grid-cols-8
          max-[1600px]:grid-cols-7
          max-[1300px]:grid-cols-6
          max-[1000px]:grid-cols-5
          max-[800px]:grid-cols-4
          max-[575px]:grid-cols-3
          max-[450px]:grid-cols-2
          mt-[60px]"
    >
      {Array.from({ length: 30 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex flex-col pt-10 pb-6 px-6 border-r border-b border-gray-200 animate-pulse"
          >
            <div className="flex justify-center items-center h-[180px] mb-5">
              <div className="w-full h-full bg-gray-200 rounded-md"></div>
            </div>

            <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>

            <div className="flex items-center mb-3 gap-2">
              <div className="w-[100px] h-4 bg-gray-200 rounded"></div>
              <div className="w-6 h-4 bg-gray-200 rounded"></div>
            </div>

            <div className="w-1/3 h-4 bg-gray-200 rounded mb-3"></div>

            <div className="w-16 h-8 bg-gray-200 rounded mb-5"></div>

            <div className="flex-1"></div>

            <div className="flex items-center mb-2">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>

            <div className="w-full h-8 bg-gray-200 rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
}
