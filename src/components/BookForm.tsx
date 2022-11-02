import React, { useEffect, useState } from "react";
import { Box, Button, FormGroup, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment, { Moment } from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getBookData } from "../data/getBookData";
import { useBooks } from "../data/useBooks";

interface BookFormProps {
  onAdd: () => void;
  onCancel: () => void;
}

export const BookForm = ({ onAdd, onCancel }: BookFormProps) => {
  const {
    addBook: { mutate: addBook },
  } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [endPage, setEndPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dueDate, setDueDate] = useState<string>(moment().format("YYYY-M-D"));
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const isValid =
      title !== "" &&
      author !== "" &&
      endPage > 0 &&
      moment().isSameOrBefore(moment(dueDate));
    setCanSubmit(isValid);
  }, [title, author, endPage, dueDate]);

  const onSubmit = async () => {
    const bookData = await getBookData(title, author);
    addBook({
      ...bookData,
      endPage,
      dueDate,
      currentPage,
      dateOfCurrentPage: moment().format("YYYY-M-D"),
      includeToday: false,
    });
    onAdd();
  };

  return (
    <Box component="form">
      <FormGroup sx={{ gap: 2 }}>
        <TextField
          id="outlined-title"
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <TextField
          id="outlined-author"
          label="Author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          required
        />
        <TextField
          id="outlined-number"
          label="End Page"
          type="number"
          value={endPage}
          onChange={(e) => {
            setEndPage(parseInt(e.target.value));
          }}
          required
          InputProps={{
            inputProps: { min: 1 },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Current Page"
          type="number"
          value={currentPage}
          onChange={(e) => {
            setCurrentPage(parseInt(e.target.value));
          }}
          InputProps={{
            inputProps: { min: 1, max: endPage },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="Due Date"
            inputFormat="MM/DD/YYYY"
            value={dueDate}
            onChange={(newDate: Moment | null) => {
              if (newDate) {
                setDueDate(newDate.format("YYYY-M-D"));
              } else {
                setCanSubmit(false);
              }
            }}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
      </FormGroup>

      <Button onClick={onSubmit} disabled={!canSubmit}>
        Add
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </Box>
  );
};
