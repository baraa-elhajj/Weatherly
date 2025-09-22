import { BsSearch } from "react-icons/bs";

export default function SearchBar({
  city,
  setCity,
  onSubmit,
  loading,
  inputRef,
}) {
  return (
    <div className="absolute inset-0 flex justify-center items-start pt-16">
      <form
        onSubmit={onSubmit}
        className="flex items-center w-[90%] sm:w-full max-w-md bg-transparent rounded-full shadow-lg p-2 border border-white/30"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a city"
          className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-2 focus:outline-none"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button
          type="submit"
          className="p-3 rounded-full bg-blue-400 text-white shadow-md transition-all hover:bg-blue-400/80 hover:scale-105 active:scale-95"
          disabled={loading}
        >
          <BsSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
}
