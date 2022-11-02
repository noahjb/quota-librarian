import { Card, CardMedia, TextField } from "@mui/material";
import { useState } from "react";
import { Book } from "../interfaces/Book";
import { BookContent } from "./BookContent";

interface BookProps {
  book: Book;
  onChangePage: (id: string, newPage: number) => void;
  onDelete: (id: string) => void;
  toggleIncludeToday: (id: string) => void;
  isCalculating?: boolean;
}

export const BookCard = ({
  book,
  isCalculating,
  onChangePage,
  onDelete,
  toggleIncludeToday,
}: BookProps) => {
  const [newCurrentPage, setNewCurrentPage] = useState(book.currentPage);

  return (
    <Card sx={{ display: "flex" }} variant="outlined">
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={book.imageUrl}
        alt={book.title}
      />
      {isCalculating ? (
        <>
          <TextField
            id="outlined-number"
            label="Current Page"
            type="number"
            value={newCurrentPage}
            onChange={(e) => {
              onChangePage(book.id, parseInt(e.target.value));
              setNewCurrentPage(parseInt(e.target.value));
            }}
            InputProps={{
              inputProps: { min: 1, max: book.endPage },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      ) : (
        <BookContent
          book={book}
          onDelete={onDelete}
          toggleIncludeToday={toggleIncludeToday}
        />
      )}
    </Card>
  );
};
