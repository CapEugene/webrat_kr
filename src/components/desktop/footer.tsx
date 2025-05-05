import Icons from "../ui/icons";

export function Footer() {
  return (
    <footer className="bg-[#FF751F] w-full py-2 px-24 flex items-center justify-center">
      <Icons.RatIcon className="w-16 h-16 text-white" />
      <Icons.LogoIcon className="w-48 h-16 text-white" />
    </footer>
  );
}
