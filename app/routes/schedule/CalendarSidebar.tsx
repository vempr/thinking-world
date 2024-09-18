export default function CalendarSidebar() {
  return (
    <div className="bg-black bg-opacity-60 dark:bg-opacity-30 rounded-lg p-4 lg:max-w-72 text-center lg:text-left">
      <div className="flex flex-row gap-x-2 justify-center items-center mb-4">
        <h2 className="font-medium text-xl md:text-3xl text-white">
          Work Shifts
        </h2>
        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-black text-center font-bold hover:bg-gray-200">
          +
        </button>
      </div>
      <div>
        <p className="text-white text-opacity-55">
          You don't have any work shifts! Add a work shift to start tracking
          your income.
        </p>
      </div>
    </div>
  );
}
