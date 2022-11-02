import { Book } from "../interfaces/Book";

const QUOTA_KEY = "quota-library";
export const readBooksFromStore = (): Book[] => {
  const booksStr = localStorage.getItem(QUOTA_KEY);
  return booksStr ? JSON.parse(booksStr) : [];
};

export const writeBooksToStore = (books: Book[]) => {
  localStorage.setItem(QUOTA_KEY, JSON.stringify(books));
};
