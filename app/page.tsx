export default function Home() {
  return (
    <main
      className="bg-gray-100 sm:bg-red-100 
      md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100
      h-screen flex items-center justify-center p-5"
    >
      <div
        className="bg-white shadow-lg p-5
        rounded-3xl w-full max-w-screen-sm flex
        flex-col gap-4"
      >
        {["Nico", "Me", "You", "Yourself"].map((person, index) => (
          <div key={index} className="flex items-center gap-5 *:animate-pulse">
            <div
              className="size-10
              bg-blue-400 rounded-full"
            />
            <div
              className="w-40 h-4
              rounded-full bg-gray-400"
            />
            <div
              className="w-20 h-4
              rounded-full bg-gray-400"
            />
            {/* <span className="text-lg font-medium">{person}</span> */}

            {/* <div
              className="size-6 animate-pulse
            bg-red-500 text-white flex items-center justify-center rounded-full"
            >
              <span>{index}</span>
            </div> */}
          </div>
        ))}
      </div>
    </main>
  );
}
