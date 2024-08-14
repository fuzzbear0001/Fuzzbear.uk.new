import { Button as NUIButton } from "@nextui-org/react";

export const Button: React.FC<{ isExternal: boolean; children: string, url: string; start: any; title: string; }> = ({
  isExternal = false,
  children,
  url = "/",
  start = null,
  title = "...",
}) => {
  return (
    <NUIButton
      onClick={() => {
        if (isExternal) {
            window.open(url, "_blank");
        } else {
            (globalThis as any).goto(url, title);
        }
      }}
      className="text-sm font-normal text-default-600 bg-default-100"
      variant="flat"
      startContent={start}

    >
      {children}
    </NUIButton>
  );
};
