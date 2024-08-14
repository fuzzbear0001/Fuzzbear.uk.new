import {
  DiscordIcon,
  GithubIcon,
  HeartFilledIcon,
  SparkleIcon,
  TiktokIcon,
} from "@/Components/Icons";
import TypingAnimation from "@/Components/page/home/TypingAnimation";
import { Button } from "@nextui-org/react";
import Expertise from "@/Components/page/home/expertise.json";

export default function Home() {
  const SiteConfig = (globalThis as any).siteConfig as siteConfig;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center w-[90%]">
        <h1
          className={"tracking-tight inline font-semibold text-3xl lg:text-4xl"}
        >
          Hello I'm{" "}
          <span
            className={
              "tracking-tight font-semibold text-3xl lg:text-4xl text-[#6FEE8D]"
            }
          >
            Fuzzbear
          </span>
          <span
            className={
              "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 max-w-full"
            }
          >
            <TypingAnimation
              text={[
                "I build web-applications",
                "I love to code.",
                "I'm a content creator.",
                "I'm a software developer.",
                "I'm a tech enthusiast.",
                "I'm a gamer.",
              ]}
              typingSpeed={100}
              backspaceSpeed={70}
              pauseDuration={1000}
            />
          </span>
        </h1>
      </div>

      <div className="flex gap-3">
        <Button
          className="button-glow"
          variant="ghost"
          onClick={() => {
            window.open(SiteConfig.links.tiktok, "_blank");
          }}
        >
          <TiktokIcon />
          <span>TikTok</span>
        </Button>

        <Button
          className="button-glow"
          variant="ghost"
          onClick={() => {
            window.open(SiteConfig.links.github, "_blank");
          }}
        >
          <GithubIcon />
          <span>GitHub</span>
        </Button>
      </div>

      <div className="mt-[3rem] lg:w-[33.25rem]">
        <h1
          className={
            "tracking-tight font-semibold text-3xl lg:text-4xl flex justify-center items-center"
          }
        >
          My Expertise{" "}
        </h1>
        <h3
          className={
            "tracking-tight font-semibold text-sm lg:text-1xl flex justify-center items-center p-3"
          }
        >
          With almost 4 years of experience in the field of development, I have
          worked with a variety of technologies and frameworks. Here are most of
          the technologies I have worked with.{" "}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1.2rem]">
          {Expertise.map((item, index) => (
            <span
              key={index}
              className="bg-[#2D2D2D] text-white rounded-md px-2 py-2 text-sm flex items-center select-none hover:bg-[#3D3D3D] cursor-pointer"
              onClick={() => {
                window.open(item.link, "_blank");
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                draggable={"false"}
                className="w-4 h-4 inline-block mr-1 rounded-full"
              />
              {item.name} - {item.time}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
