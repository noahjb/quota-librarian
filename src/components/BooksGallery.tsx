import { BookCard } from "./BookCard";
import { useBooks } from "../data/useBooks";
import { FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface BooksGalleryProps {
  isCalculating?: boolean;
  onFinishCalculating: () => void;
}

interface PageUpdate {
  id: string;
  newPage: number;
}

export const BooksGallery = ({
  isCalculating,
  onFinishCalculating,
}: BooksGalleryProps) => {
  const [includeToday, setIncludeToday] = useState<boolean>(false);
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);
  const [pageUpdates, setPageUpdates] = useState<PageUpdate[]>([]);
  const {
    booksQuery: { data: books },
    editBook: { mutate: editBook },
    removeBook: { mutate: removeBook },
    bulkEdit: { mutate: bulkEdit },
  } = useBooks();

  //
  //
  // REFACTOR ME! Move to "useTriState(books)" custom hook
  //
  //
  useEffect(() => {
    if (!books) {
      return;
    }

    const booksWithIncludeToday = books.filter((book) => book.includeToday);
    if (booksWithIncludeToday.length === books.length) {
      setIncludeToday(true);
      setIsIndeterminate(false);
    } else if (booksWithIncludeToday.length === 0) {
      setIncludeToday(false);
      setIsIndeterminate(false);
    } else {
      setIsIndeterminate(true);
    }
  }, [books]);

  const updateGlobalIncludeToday = () => {
    const edits = { includeToday: isIndeterminate ? false : !includeToday };
    bulkEdit(edits);
  };

  const deleteBook = (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      removeBook(id);
    }
  };

  const onUpdate = () => {
    pageUpdates.forEach((update) => {
      editBook({ id: update.id, edits: { currentPage: update.newPage } });
    });
    onFinishCalculating();
    setPageUpdates([]);
  };

  const onCancelUpdate = () => {
    onFinishCalculating();
    setPageUpdates([]);
  };

  const changeCurrentPage = (id: string, newPage: number) => {
    const newUpdates = [...pageUpdates];
    newUpdates.push({ id, newPage });
    setPageUpdates(newUpdates);
  };

  if (!books) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isCalculating ? (
        <>
          <Button onClick={onUpdate}>Update</Button>
          <Button onClick={onCancelUpdate}>Cancel</Button>
        </>
      ) : (
        <FormControlLabel
          label="Include Today"
          control={
            <Checkbox
              checked={includeToday}
              value={includeToday}
              indeterminate={isIndeterminate}
              onChange={updateGlobalIncludeToday}
            />
          }
        />
      )}
      <Grid
        container
        sx={{
          display: "grid",
          gap: "0.75em",
          alignItems: "center",
          gridAutoRows: "1fr",
          gridTemplateColumns: "repeat(auto-fill, minmax(343px, 1fr))",
        }}
      >
        {books.map((book) => (
          <BookCard
            book={book}
            isCalculating={isCalculating}
            onChangePage={changeCurrentPage}
            onDelete={deleteBook}
            toggleIncludeToday={(id) => {
              editBook({ id, edits: { includeToday: !book.includeToday } });
            }}
            key={book.id}
          />
        ))}
      </Grid>
    </>
  );
};
