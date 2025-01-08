import Image from "next/image";
import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black ">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 shadow-sm items-center justify-items-center gap-8 text-center  pt-10 pb-14">
        <a className="" href="/">
          <Image src="/logo2.png" alt="logo" width={240} height={50} />
        </a>
        <div className="text-white ">
          <ul>
            <li className="pb-2 font-semibold text-xl">Navigation</li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="text-white ">
          <ul className="xl:pb-12 sm:pb-0 lg:mt-[-40px] xl:mt-0">
            <li className="pb-2 font-semibold text-xl ">Contact</li>
            <li>
              <h3 className="flex">
                <Mail className="w-4 h-4 mr-2 mt-[5px]" />
                info@escaledevs.com
              </h3>
            </li>
          </ul>
        </div>{" "}
      </div>
    </footer>
  );
}

export default Footer;
