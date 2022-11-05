import {
  Box,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
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
  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <CardContent>
      <Typography component="div" variant="body1" sx={{ fontWeight: "bold" }}>
        {book.title.substring(book.title.indexOf(":"))}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {book.author}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        Due {moment(book.dueDate).format("MMM. Do, YYYY")}
      </Typography>
    </CardContent>
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
      <Container>
        <Typography component="div" variant="h5" sx={{ textAlign: "right" }}>
          {calculateQuota(book)}
        </Typography>
      </Container>
    </Box>
  </Box>
);
