import Image from "next/image";
import StacksLanding from "./page/landingpage";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <StacksLanding/>
    </div>
  );
}
