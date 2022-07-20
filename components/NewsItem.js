import React from "react";

export default function NewsItem({ article }) {
  return (
    <a href={article?.url} target="blank">
      <div className="flex items-center justify-between hover:bg-gray-200 p-3 cursor-pointer transition duration-300">
        <div>
          <h3 className=" font-medium text-sm">{article?.title}</h3>
          <p className="text-xs">{article?.source.name}</p>
        </div>
        <img src={article?.urlToImage} alt="" className="w-9 h-9 rounded" />
      </div>
    </a>
  );
}
