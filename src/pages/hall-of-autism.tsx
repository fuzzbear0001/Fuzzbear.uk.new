import { SearchIcon } from "@/Components/Icons";
import { Avatar, Card, CardBody, CardHeader, Input, Pagination } from "@nextui-org/react";
import React from "react";
import cards from "@/Components/page/tism/people.json";

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setItemsPerPage(getItemsPerPage());
    }
  }, []);

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const currentItems = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  function getItemsPerPage() {
    if (typeof window === "undefined") return 2; // Default for SSR or undefined window
    const width = window.innerWidth;
    if (width >= 640) return 3;
    return 2;
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setItemsPerPage(getItemsPerPage());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center w-[90%]">
        <h1 className="rainbow-wave text-3xl lg:text-4xl text-center">
          Hall Of Autism ✨
        </h1>

        <div className="flex justify-center mt-4">
          <Input
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type the name of the person to search"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>

        <div className="mt-4">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
            {currentItems.map((card, index) => (
              <Card className="py-4" key={index}>
                <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Avatar
                      isBordered
                      radius="sm"
                      src={card.avatar}
                      className="w-20 h-20 text-large"
                      draggable={"false"}
                      onDrag={() => false}
                    />
                  </div>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className="flex items-center justify-center">
                    {card.gold ? (
                      <h6 className={"text-[#FFD700] font-bold text-large"}>
                        <span className="select-none">{card.name}</span>🏅
                      </h6>
                    ) : (
                      <h4 className="font-bold text-large select-none">
                        {card.name}
                      </h4>
                    )}
                  </div>
                  <p>{card.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Pagination
            total={totalPages}
            initialPage={1}
            color="success"
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}
