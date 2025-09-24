import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { GoBookmarkFill, GoHomeFill } from "react-icons/go";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-2 rounded-full text-white bg-blue-400/40 shadow-lg hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <RxCross2 size={20} /> : <RxHamburgerMenu size={20} />}
      </button>

      <div
        className={`absolute top-12 right-0 w-35 rounded-2xl text-white bg-blue-400/40 backdrop-blur-md shadow-xl p-2 flex flex-col gap-2 transform transition-all duration-300 ease-out origin-top-right
                ${
                  isOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
      >
        <a
          href="#home"
          className="p-2 rounded-xl hover:bg-blue-300/60 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-row gap-2">
            <GoHomeFill size="20" /> Home
          </div>
        </a>
        <a
          href="#saved"
          className="p-2 rounded-xl hover:bg-blue-300/60 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-row items-center gap-2">
            <GoBookmarkFill size="20" /> Saved
          </div>
        </a>
      </div>
    </div>
  );
}
