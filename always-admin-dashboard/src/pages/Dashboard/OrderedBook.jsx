import React from "react";
import book1 from "../../images/book_cover/1d4966be2c9311414f74492277e0d587.jpg"
import book2 from "../../images/book_cover/54158aba8d25e86aa468218b331ccdd2.jpg"
const BookCollection = () => {
  const books = [
    { id: 1, title: "My Life", orderDate: "05/11/2024", cover: book1},
    { id: 2, title: "My Child Life", orderDate: "08/11/2024", cover: book2 },
  ];

  return (
    <div className="p-8 bg-gray-50 h-full w-full">
      <h1 className="text-2xl font-semibold text-gray-700 text-center mb-8">
        Dindiya&apos;s Book Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
          >
            {/* Book Cover */}
            <div className="w-40 h-56 bg-beige-200 rounded-lg overflow-hidden mb-4 border border-gray-300 flex items-center justify-center">
              {/* Replace the src with the path to your book cover image */}
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Order Date */}
            <p className="text-sm text-gray-500 mb-4">
              Order Date : <span className="font-medium">{book.orderDate}</span>
            </p>
            {/* Buttons */}
            <div className="flex flex-col space-y-2 w-full">
              <button className="w-full bg-green-200 text-green-700 py-2 rounded-lg hover:bg-green-300 transition">
                VIEW BOOK
              </button>
              <button className="w-full bg-white text-green-700 border border-green-300 py-2 rounded-lg hover:bg-green-100 transition">
                PDF DOWNLOAD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCollection;

