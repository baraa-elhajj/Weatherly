import { BsSearch } from "react-icons/bs";

export default function SearchBar({
  city,
  setCity,
  onSubmit,
  loading,
  inputRef,
}) {
  return (
    <div className="flex justify-center items-start pt-16 px-4 mt-3">
      <form
        onSubmit={onSubmit}
        className="flex items-center w-full max-w-md bg-transparent rounded-full shadow-lg border border-white/30 p-2 sm:p-3"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a city"
          className="flex-1 min-w-0 bg-transparent text-white placeholder-white/70 px-4 py-2 focus:outline-none text-sm sm:text-base"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button
          type="submit"
          className="cursor-pointer flex-shrink-0 p-3 sm:p-3 sm:text-base rounded-full bg-blue-400/80 text-white shadow-md transition-all hover:bg-blue-400 hover:scale-105 active:scale-95"
          disabled={loading}
        >
          <BsSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
}
