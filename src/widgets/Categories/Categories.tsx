import { cn } from "@/shared/lib/utils";
import React from "react";
//import { Categories } from "./categories";
//import { Category } from "@prisma/client";
interface Category {
    name: string;
}
interface Props {
  categories: Category[];
  className?: string;
}

const categories = [
    {name: "Одежда"},
    {name: "Обувь"},
    {name: "Аксессуары"},
    {name: "Электроника"},
    {name: "Товары для дома"},
    {name: "Книги"},
    {name: "Спорт и отдых"},
    {name: "Красота и личная гигиена"},
    {name: "Игрушки и игры"},
    {name: "Продукты питания и напитки"},
    {name: "Другое"}
]
export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <div className="flex items-center justify-between">
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({name}, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
      </div>
    </div>
  );
};
