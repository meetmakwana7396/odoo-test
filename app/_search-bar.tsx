"use client";
import React, { useState } from "react";

const fruits = [
  "apple",
  "banana",
  "watermaleon",
  "berry",
  "mango",
  "chiku",
  "kiwi",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="">
      <input type="text" className="text-black" onChange={(e) => setQuery(e.target.value)} />
      {query && (
        <div className="w-xl border h-auto mt-1 bg-white">
          {fruits
            .filter((fruit: string) => fruit.startsWith(query))
            .map((fruit) => (
              <div
                key={fruit}
                className="w-full text-black h-20 overflow-y-scroll"
              >
                {fruit}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
