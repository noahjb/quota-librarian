import { Book } from "../interfaces/Book";
import moment from "moment";

export const calculateQuota = (book: Book) => {
  let remainingDays = moment(book.dueDate).diff(
    moment(book.dateOfCurrentPage),
    "days"
  );
  remainingDays += book.includeToday ? 1 : 0;
  const remainingPages = book.endPage - book.currentPage + 1;
  const dailyQuota = remainingPages / remainingDays;
  return Math.round((dailyQuota + Number.EPSILON) * 100) / 100;
};

export const calculateFullQuota = (books: Book[]) => {
  return books.reduce(
    (previousQuota, book) => previousQuota + calculateQuota(book),
    0
  );
};
