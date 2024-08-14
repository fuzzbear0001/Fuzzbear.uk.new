import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeSystem from "@/Utils/ThemeProvided";
import { NextUIProvider } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import SiteNavbar from "@/Components/global/Navbar";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  const Page_Router = useRouter();
  const [NavbarVisible, SetNavbarVisible] = React.useState(true);

  ThemeSystem({ default: "dark", type: "localstorage", selector: "html" });

  (globalThis as any).siteConfig = {
    name: "Fuzzbear",
    description:
      "Hello, I'm Fuzzbear. I'm a software developer and a content creator.",
    authors: ["Fuzzbear"],
    links: {
      github: "https://github.com/fuzzbear0001",
      tiktok: "https://tiktok.com/@fuzzbear_new",
      discord: "https://discord.gg/tZUrA5sC66",
      donate: "/",
    },
    navItems: [
      {
        key: "home",
        label: "Home",
        goto: "/",
      },
      {
        key: "hoa",
        label: "Hall of Autism ✨",
        goto: "/hall-of-autism",
      }
    ],
  };

  var siteConfig = (globalThis as any).siteConfig;

  (globalThis as any).goto = (url: string, title: string = "...") => {
    if (Page_Router.pathname === url) return;

    Page_Router.prefetch(url).then(() => Page_Router.push(url));

    document.title = siteConfig.name + " | " + title;
  };

  (globalThis as any).toggleNavbar = () => {
    SetNavbarVisible(!NavbarVisible);
  };

  return (
    <NextUIProvider>
      <div
        className={
          NavbarVisible
            ? "translate-y-[0%] transition-all delay-200"
            : "translate-y-[-100%] transition-all delay-200"
        }
      >
        <SiteNavbar />
      </div>
      <Component {...pageProps} />

      <footer className="footer w-full flex items-center justify-between py-3 px-3 select-none z-[9999]">
        <span className="text-default-600">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="text-default-600">
          Made by {siteConfig.authors.join(" & ")} with
          <kbd>💖</kbd>
        </span>
      </footer>
    </NextUIProvider>
  );
}
