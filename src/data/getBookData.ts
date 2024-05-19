import {
  GBooksItem,
  GBooksSearchResult,
} from "../interfaces/GBooksSearchResult";

export const getBookData = async (title: string, author: string) => {
  const url = "https://www.googleapis.com/books/v1/volumes";
  const key = "AIzaSyC0sqomn3N51RxT7reQ2VQT67-FbO8U2ts";
  const titleQuery = `intitle:${encodeURIComponent(title)}`;
  const authorQuery = `inauthor:${encodeURIComponent(author)}`;
  const uri = `${url}?q=${titleQuery}+${authorQuery}&key=${key}`;
  const response = await fetch(uri);
  if (response.status !== 200) {
    throw new Error("Book data request failed");
  }

  const data: GBooksSearchResult = await response.json();
  const mergedBooks = mergeBookEntriesWithSameTitleAndAuthor(data.items);

  const book = mergedBooks[0];
  return {
    id: book.id,
    imageUrl:
      book.volumeInfo.imageLinks?.thumbnail ??
      `https://placehold.co/128x197?text=${book.volumeInfo.title.replace(
        /\s/g,
        "+"
      )}`,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors[0],
  };
};

function mergeBookEntriesWithSameTitleAndAuthor(books: GBooksItem[]) {
  const mergedBooks: GBooksItem[] = [];
  books.forEach((book) => {
    const existingBook = mergedBooks.find(
      (mergedBook) => mergedBook.volumeInfo.title === book.volumeInfo.title
    );
    if (existingBook) {
      console.log("Merging book");
      console.log(existingBook);
      // Merge data into existing book
      existingBook.volumeInfo = {
        ...existingBook.volumeInfo,
        ...book.volumeInfo,
      };
      console.log(existingBook);
    } else {
      // Add new book
      console.log("Adding book");
      console.log(book);
      mergedBooks.push(book);
    }
  });
  return mergedBooks;
}
