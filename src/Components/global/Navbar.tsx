import React from "react";
import {
  Avatar,
  Navbar,
  NavbarContent,
  NavbarBrand,
  Link,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
import { DiscordIcon, GithubIcon, HeartFilledIcon, TiktokIcon } from "../Icons";
import { Button } from "./Button";

const Logo: React.FC = () => {
  const ImagePath = "/static/people/me.png";

  return (
    <Avatar
      isBordered
      radius="sm"
      src={ImagePath}
      className="w-10 h-10 text-large mr-2"
    />
  );
};

const SiteNavbar: React.FC = () => {
  const siteConfig = (globalThis as any).siteConfig as siteConfig;

  return (
    <Navbar maxWidth="xl" position="sticky" className="bg-[var(--bg)]">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit cursor-pointer">
          <span
            className="flex justify-start items-center gap-1"
            onClick={() => {
              (globalThis as any).goto("/", "Home");
            }}
          >
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-3/5 sm:basis-full"
        justify="center"
      >
        <ul className="hidden lg:flex gap-4 justify-center items-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.key}>
              <Link
                className={
                  "text-[var(--text)] navbar_item_hover cursor-pointer"
                }
                onPress={() => {
                  (globalThis as any).goto(item.goto, item.label);
                }}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.tiktok}>
            <TiktokIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button isExternal={false} start={<HeartFilledIcon fill="#dc2626" />} url="/hall-of-autism" title="Hall of Autism">Donate</Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          {/* <GithubIcon className="text-default-500" /> */}
        </Link>
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={"foreground"} href={item.goto} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default SiteNavbar;
