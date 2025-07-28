"use client";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const Page = () => {
  const [todo, settodo] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(todo.length / itemsPerPage);

  const FetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const res = await response.json();
      settodo(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-blue-600">Pagination Component</h1>

      <div className="grid gap-1 mt-6 w-full max-w-md">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center"
          >
            <h1 className="text-gray-800 font-medium">{item.title}</h1>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Page;
