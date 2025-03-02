"use client";
import { Product } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);


  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
      )}
      <div
        className={cn(
          "flex rounded-2xl flex-1 mx-2 ml-4 justify-between relative h-11 max-w-lg z-30", // max-w-lg
          className
        )}
      >
        <Search className="absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400" />
        <input
          type="text"
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Найти товар..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          //onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 100)}
        />

        {products.length > 0 && focused && (
          <div className="absolute w-full bg-white rounded-xl py-2 shadow-md top-12">
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div>{product.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};