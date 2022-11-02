import { useCallback, useState } from "react";
import { BookForm } from "./components/BookForm";
import { Container } from "@mui/material";
import { NavBar } from "./components/NavBar";
import { BooksGallery } from "./components/BooksGallery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const finishAdding = useCallback(() => setIsAdding(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar
        onAdd={() => setIsAdding(true)}
        onCalculate={() => {
          setIsCalculating(true);
        }}
      />
      <Container maxWidth="sm">
        {isAdding ? (
          <BookForm onAdd={finishAdding} onCancel={finishAdding} />
        ) : (
          <BooksGallery
            isCalculating={isCalculating}
            onFinishCalculating={() => setIsCalculating(false)}
          />
        )}
      </Container>
    </QueryClientProvider>
  );
};
