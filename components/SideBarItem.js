import { useRouter } from "next/router";
export default function SideBarItem({ text, Icon }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-x-3 hover:bg-gray-200 cursor-pointer px-4 py-3 rounded-full transition-all duration-200  "
    >
      <Icon className="h-7 text-gray-700" />
      <span className=" hidden text-base md:inline-flex lg:text-xl">
        {text}
      </span>
    </div>
  );
}
