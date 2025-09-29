export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-15 h-15 sm:w-20 sm:h-20 border-4 border-blue-300 border-t-transparent rounded-full animate-spin mb-70" />
    </div>
  );
}
