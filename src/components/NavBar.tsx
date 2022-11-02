import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useEffect, useState } from "react";
import { calculateFullQuota } from "../utilities/calculateQuotas";
import { useBooks } from "../data/useBooks";

interface NavBarProps {
  onCalculate: () => void;
  onAdd: () => void;
}

export const NavBar = ({ onAdd, onCalculate }: NavBarProps) => {
  const {
    booksQuery: { data: books },
  } = useBooks();
  const [quota, setQuota] = useState(0);

  useEffect(() => {
    if (books) {
      setQuota(calculateFullQuota(books));
    }
  }, [books]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QuotaLibrarian
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div">
            Today's Quota: {quota.toFixed(2)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="input pages"
              color="inherit"
              onClick={onCalculate}
            >
              <CalculateIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="add book"
              color="inherit"
              onClick={onAdd}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
