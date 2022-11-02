export interface EditableBookFields {
  author: string;
  title: string;
  endPage: number;
  currentPage: number;
  dueDate: string;
  includeToday: boolean;
}

export interface Book extends EditableBookFields {
  id: string;
  imageUrl: string;
  dateOfCurrentPage: string;
}
