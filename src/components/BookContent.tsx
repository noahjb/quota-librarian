import {
  Box,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Book, BookFieldsPayload } from "../interfaces/Book";
import { calculateQuota } from "../utilities/calculateQuotas";
import moment, { Moment } from "moment";
import { useState } from "react";

interface BookContentProps {
  book: Book;
  onDelete: (id: string) => void;
  onEdit: (id: string, edits: BookFieldsPayload) => void;
  toggleIncludeToday: (id: string) => void;
}

export const BookContent = ({
  book,
  onDelete,
  onEdit,
  toggleIncludeToday,
}: BookContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dueDate, setDueDate] = useState(
    moment(book.dueDate).format("YYYY-MM-DD")
  );
  const [originalDueDate, setOriginalDueDate] = useState(
    moment(book.dueDate).format("YYYY-MM-DD")
  );

  const handleEditClick = () => {
    setOriginalDueDate(dueDate); // Save the original due date before editing
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setDueDate(originalDueDate); // Restore the original due date
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Here you can call the function to save the new due date
    onEdit(book.id, { dueDate });
    setIsEditing(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography component="div" variant="body1" sx={{ fontWeight: "bold" }}>
          {book.title.substring(
            0,
            ~book.title.indexOf(":")
              ? book.title.indexOf(":")
              : book.title.length
          )}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {book.author}
        </Typography>
        {isEditing ? (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              label="Due Date"
              inputFormat="MM/DD/YYYY"
              value={dueDate}
              onChange={(newDate: Moment | null) => {
                if (newDate) {
                  setDueDate(newDate.format("YYYY-MM-DD"));
                }
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        ) : (
          `Due ${moment(dueDate).format("MMM. Do, YYYY")}`
        )}
      </CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isEditing ? (
          <>
            <IconButton aria-label="save" onClick={handleSaveClick}>
              <Save />
            </IconButton>
            <IconButton aria-label="cancel" onClick={handleCancelClick}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="edit" onClick={handleEditClick}>
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
          </>
        )}
        <Container>
          <Typography component="div" variant="h5" sx={{ textAlign: "right" }}>
            {calculateQuota(book)}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
