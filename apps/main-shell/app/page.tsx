import Button from "@/components/common/Button";
import Image from "next/image";
import logo from "@/public/logo-with-text-dark-mode.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/Select";
import { Rocket } from "lucide-react";
import { BackgroundAnimation } from "@/components/shared/BackgroundAnimation";

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <div className="min-h-screen text-white flex items-center justify-center relative">
        <header className="absolute top-0 left-0 right-0 px-8 py-4 flex justify-between">
          <Image height={40} src={logo} alt="ArbOS" />
        </header>
        <main>
          <div className="text-center">
            <h1 className="scroll-m-20 text-9xl font-extrabold tracking-tight lg:text-5xl">
              Explore <span className="text-teal-400">Your Favorite OS.</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-8">
              Clone the iconic looks and vibes of Windows, macOS, or Linux.
              Launch your experience now!
            </p>
            <div className="flex gap-4 mt-20 justify-center items-center">
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Choose your OS to get started" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="win">Windows 11</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="secondary">
                <Rocket /> Launch OS
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
