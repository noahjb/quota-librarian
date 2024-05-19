import { Card, CardMedia, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Book, BookFieldsPayload } from "../interfaces/Book";
import { BookContent } from "./BookContent";

interface BookProps {
  book: Book;
  onChangePage: (id: string, newPage: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, edits: BookFieldsPayload) => void;
  toggleIncludeToday: (id: string) => void;
  isCalculating?: boolean;
}

export const BookCard = ({
  book,
  isCalculating,
  onChangePage,
  onDelete,
  onEdit,
  toggleIncludeToday,
}: BookProps) => {
  const [newCurrentPage, setNewCurrentPage] = useState(book.currentPage);

  return (
    <Grid
      item
      component={Card}
      sx={{ display: "flex", height: 1, overflow: "visible" }}
      variant="outlined"
    >
      <CardMedia
        component="img"
        sx={{ objectFit: "cover", maxWidth: 128 }}
        image={book.imageUrl}
        alt={book.title}
      />
      <Container style={{ padding: "auto 10px" }}>
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
              fullWidth
              margin="normal"
              size="small"
            />
          </>
        ) : (
          <BookContent
            book={book}
            onDelete={onDelete}
            onEdit={onEdit}
            toggleIncludeToday={toggleIncludeToday}
          />
        )}
      </Container>
    </Grid>
  );
};
