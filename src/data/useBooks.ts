import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Book, BookFieldsPayload } from "../interfaces/Book";
import { getBookData } from "./getBookData";
import { readBooksFromStore, writeBooksToStore } from "./quotaStore";

interface EditBookPayload {
  id: string;
  edits: BookFieldsPayload;
}

const BOOKS_KEY = ["books"];

const addBookFn = async (book: Book) => {
  const books = readBooksFromStore();
  const index = books.findIndex((storedBook) => storedBook.id === book.id);
  if (~index) {
    books[index] = book;
  } else {
    books.push(book);
  }
  writeBooksToStore(books);
};

const editBookFn = async ({ id, edits }: EditBookPayload) => {
  const books = readBooksFromStore();
  const bookIndex = books.findIndex((book) => book.id === id);
  if (~bookIndex) {
    const prevBook = books[bookIndex];
    let newBook: Book = {
      ...prevBook,
      ...edits,
    };

    // Changes to current page should always be reflected
    // as of the date it was edited
    if (edits.currentPage) {
      newBook.dateOfCurrentPage = moment().format("YYYY-MM-DD");
    }

    // Changes to title and author could modify the entire book,
    // so re-fetch book data and update everything accordingly
    if (edits.title || edits.author) {
      const bookData = await getBookData(
        edits.title || prevBook.title,
        edits.author || prevBook.author
      );
      newBook = {
        ...newBook,
        ...bookData,
      };
    }

    books[bookIndex] = newBook;
    writeBooksToStore(books);
  }
};

const bulkEditFn = async (edits: BookFieldsPayload) => {
  const books = readBooksFromStore();
  const newBooks = books.map((book) => ({
    ...book,
    ...edits,
  }));
  writeBooksToStore(newBooks);
};

const removeBookFn = async (id: string) => {
  const books = readBooksFromStore();
  const index = books.findIndex((storedBook) => storedBook.id === id);
  if (~index) {
    books.splice(index, 1);
    writeBooksToStore(books);
  }
};

export function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery(BOOKS_KEY, (): Book[] => {
    const books = localStorage.getItem("quota-library");
    return books ? JSON.parse(books) : [];
  });

  const addBook = useMutation(addBookFn, {
    onSettled: () => {
      queryClient.invalidateQueries(BOOKS_KEY);
    },
  });

  const editBook = useMutation(editBookFn, {
    onSettled: () => {
      queryClient.invalidateQueries(BOOKS_KEY);
    },
  });

  const removeBook = useMutation(removeBookFn, {
    onSettled: () => {
      queryClient.invalidateQueries(BOOKS_KEY);
    },
  });

  const bulkEdit = useMutation(bulkEditFn, {
    onSettled: () => {
      queryClient.invalidateQueries(BOOKS_KEY);
    },
  });

  return {
    booksQuery,
    addBook,
    editBook,
    removeBook,
    bulkEdit,
  };
}
