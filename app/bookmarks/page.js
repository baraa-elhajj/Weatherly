"use client";

import Header from "@/components/Header";
import SavedList from "@/components/SavedList";

export default function Bookmarks() {
  return (
    <>
      <Header />

      <div className="relative z-20 mx-auto w-fit bg-blue-400/40 backdrop-blur-md shadow-xl text-white text-2xl sm:text-4xl font-bold mt-20 rounded-2xl p-2">
        Bookmarks List
      </div>

      <SavedList />
    </>
  );
}
