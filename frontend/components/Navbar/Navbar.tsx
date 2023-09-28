import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import MediaIcon from "../MediaIcon/MediaIcon";
import Image from "next/dist/client/image";
import logo from "@/svgs/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="container p-4 mx-auto">
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger className="font-bold text-xl">Menu</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>MENU</SheetTitle>
              <SheetDescription>
                <div className="container flex-col">
                  <Link href="/">Home</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/portfolio">Portfolio</Link>
                  <Link href="/resume">About</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="absolute bottom-1">
              <MediaIcon media="linkedin" link={""} />
              <MediaIcon media="twitter" link={""} />
              <MediaIcon media="youtube" link={""} />
              <MediaIcon media="github" link={""} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="font-bold text-xl">Logo</div>
      </div>
    </nav>
  );
};

export default Navbar;
