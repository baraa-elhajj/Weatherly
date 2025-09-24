import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="fixed top-4 left-8 z-50">
      <Link href="/">
        <div className="flex flex-row justify-center items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="Weatherly Logo"
            width={32}
            height={32}
            className="rounded-md shadow-md hover:scale-105 transition-transform duration-200"
          />
          <p className="text-white text-lg font-bold ">Weatherly</p>
        </div>
      </Link>
    </div>
  );
}
