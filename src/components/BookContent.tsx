import { Box, CardContent, IconButton, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Book } from "../interfaces/Book";
import { calculateQuota } from "../utilities/calculateQuotas";
import moment from "moment";

interface BookContentProps {
  book: Book;
  onDelete: (id: string) => void;
  toggleIncludeToday: (id: string) => void;
}

export const BookContent = ({
  book,
  onDelete,
  toggleIncludeToday,
}: BookContentProps) => (
  <>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {book.author}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Due {moment(book.dueDate).format("MMM. Do, YYYY")}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <IconButton aria-label="edit" onClick={() => alert(`edit ${book.id}`)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDelete(book.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="includeToday"
          onClick={() => toggleIncludeToday(book.id)}
        >
          <CheckBoxIcon color={book.includeToday ? "primary" : undefined} />
        </IconButton>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 125,
      }}
    >
      <Typography component="div" variant="h3">
        {calculateQuota(book)}
      </Typography>
    </Box>
  </>
);
