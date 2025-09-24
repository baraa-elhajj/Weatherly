export default function SuggestionsList({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="relative z-20 w-[90%] sm:w-full max-w-md mx-auto">
      <ul className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 mt-2 overflow-hidden z-10">
        {suggestions.map((city, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(city)}
            className="px-4 py-3 cursor-pointer hover:bg-blue-100 hover:text-blue-800 flex justify-between items-center transition-all"
          >
            <span className="font-medium">{city.name}</span>
            <span className="text-sm opacity-60">{city.country}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
