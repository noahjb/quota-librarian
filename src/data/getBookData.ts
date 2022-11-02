import { GBooksSearchResult } from "../interfaces/GBooksSearchResult";

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
  const book = data.items[0];
  return {
    id: book.id,
    imageUrl: book.volumeInfo.imageLinks.thumbnail,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors[0],
  };
};
