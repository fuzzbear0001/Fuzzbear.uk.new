import { DiscordIcon } from "@/Components/Icons";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function _error() {
  const SiteConfig = (globalThis as any).siteConfig as siteConfig;

  useEffect(() => {
    if (typeof window !== "undefined") {
      (globalThis as any).toggleNavbar();
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center w-[90%]">
        <h1 className="text-3xl lg:text-4xl text-center">
          Oh no! Something went wrong.
        </h1>

        <p className="text-default-600 text-center">
          Please try refreshing the page or contact the developer.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          className="button-glow"
          variant="ghost"
          onClick={() => {
            (globalThis as any).goto("/", "Home");
            (globalThis as any).toggleNavbar();
          }}
        >
          <span>Home</span>
        </Button>

        <Button
          className="button-glow"
          variant="ghost"
          onClick={() => {
            window.open(SiteConfig.links.discord, "_blank");
          }}
        >
          <DiscordIcon />
          <span>Discord</span>
        </Button>
      </div>
    </section>
  );
}
