export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-xl w-full">
        <div>
          <div className="flex flex-col">
            <span>In transit</span>
            <span className="text-4xl font-semibold">Coolblue</span>
          </div>
          <div />
          <div>
            <span>Today</span>
            <span>9:30-10:30</span>
          </div>
          <div>
            <div />
            <div />
          </div>
          <div>
            <span>Expected</span>
            <span>Sorting center</span>
            <span>In transit</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </main>
  );
}
