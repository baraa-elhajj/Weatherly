import Image from "next/image";
import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <>
      <Logo />
      <Menu />
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
    </>
  );
}
