export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number; // 1 to 5 stars
  status: 'reading' | 'wishlist' | 'completed';
  notes?: string;
  coverColor: string;
  coverImage?: string;
  currentPage?: number;
  totalPages?: number;
  createdAt: string;
  genre?: string;
}

export interface LibraryStats {
  totalBooks: number;
  averageRating: number;
  fiveStarCount: number;
}

