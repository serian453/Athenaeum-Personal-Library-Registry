import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Book, LibraryStats } from './types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Star, 
  X, 
  Bookmark, 
  BookMarked, 
  Archive, 
  Filter, 
  Check, 
  Info,
  Calendar,
  Layers,
  ChevronDown,
  Quote,
  Image,
  Sparkles,
  Download
} from 'lucide-react';

const EARTHY_COVERS = [
  { name: 'Warm Clay', value: '#D7CCC8', text: '#5D4037' },
  { name: 'Terracotta', value: '#8D6E63', text: '#FFFFFF' },
  { name: 'Golden Sand', value: '#E6D5C3', text: '#3E2723' },
  { name: 'Deep Espresso', value: '#3E2723', text: '#FDFCFB' },
  { name: 'Sienna Brown', value: '#A1887F', text: '#FFFFFF' },
  { name: 'Latte Beige', value: '#BCAAA4', text: '#3E2723' }
];

const CURATED_COVER_IMAGES = [
  { name: 'Vintage Leather', url: 'https://images.unsplash.com/photo-1547983121-845b7f1acfdd?auto=format&fit=crop&q=80&w=400' },
  { name: 'Classic Library', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400' },
  { name: 'Earthy Linen', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400' },
  { name: 'Cosmic Starfield', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=400' }
];

const AVAILABLE_GENRES = [
  'Fiction',
  'Non-Fiction',
  'Sci-Fi',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Biography',
  'History',
  'Self-Help',
  'Poetry',
  'Drama',
  'Classic'
];

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverColor: string;
  coverImage?: string;
  rating: number;
}

const RECOMMENDATIONS_POOL: RecommendedBook[] = [
  {
    id: 'rec_1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    description: 'A lone astronaut must save Earth from an extinction-level event in this thrilling, science-heavy space mystery.',
    coverColor: '#3E2723',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones, drawing on cutting-edge psychology.',
    coverColor: '#E6D5C3',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_3',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Biography',
    description: 'An unforgettable memoir about a young woman who leaves her survivalist family to pursue academic degrees.',
    coverColor: '#BCAAA4',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    description: 'The story of the mysteriously wealthy Jay Gatsby and his tragic love for Daisy Buchanan in Jazz Age America.',
    coverColor: '#8D6E63',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description: 'A classic high-fantasy novel following Bilbo Baggins and a company of dwarves on an epic quest under the Mountain.',
    coverColor: '#D7CCC8',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Non-Fiction',
    description: 'A detailed analysis of the two cognitive systems that drive the way we think—one intuitive, one logical.',
    coverColor: '#A1887F',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400',
    rating: 4
  },
  {
    id: 'rec_7',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    description: 'A shocking psychological thriller about a woman\'s sudden, inexplicable act of violence and her subsequent silence.',
    coverColor: '#3E2723',
    coverImage: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_8',
    title: 'Circe',
    author: 'Madeline Miller',
    genre: 'Fantasy',
    description: 'An elegant, epic reimagining of the life of Circe, the powerful, underestimated sorceress of Greek mythology.',
    coverColor: '#D7CCC8',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 'rec_9',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    genre: 'History',
    description: 'An ambitious look at how geography and environmental factors shaped the fate of modern world civilizations.',
    coverColor: '#BCAAA4',
    coverImage: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=400',
    rating: 4
  },
  {
    id: 'rec_10',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    description: 'A beautiful story about a library between life and death holding books of lives you might have lived had you made other choices.',
    coverColor: '#8D6E63',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400',
    rating: 4
  }
];

const DEFAULT_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 5,
    status: 'completed',
    genre: 'Fiction',
    notes: 'An amazing story about destiny, listening to your heart, and reading the signs scattered along life\'s path. A quick yet profoundly touching read.',
    coverColor: '#D7CCC8',
    currentPage: 163,
    totalPages: 163,
    createdAt: '2026-05-12T10:30:00.000Z'
  },
  {
    id: '2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    rating: 4,
    status: 'completed',
    genre: 'Non-Fiction',
    notes: 'A thought-provoking narrative of human history, exploring how shared narratives and myths shaped our culture, religions, and societies today.',
    coverColor: '#BCAAA4',
    currentPage: 512,
    totalPages: 512,
    createdAt: '2026-05-08T14:15:00.000Z'
  },
  {
    id: '3',
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    rating: 5,
    status: 'reading',
    genre: 'Fiction',
    notes: 'Enchanting magical realism that keeps you wondering. Beautiful prose with deep, philosophical undertones and surreal plotlines.',
    coverColor: '#E6D5C3',
    currentPage: 240,
    totalPages: 505,
    createdAt: '2026-05-20T09:00:00.000Z'
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4,
    status: 'wishlist',
    genre: 'Sci-Fi',
    notes: 'A majestic sci-fi epic focusing on political intrigue, ecology, and prophecy on the desert planet Arrakis.',
    coverColor: '#A1887F',
    currentPage: 0,
    totalPages: 617,
    createdAt: '2026-05-28T16:45:00.000Z'
  }
];

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('personal_library_books');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Book[];
        return parsed.map(b => b.genre === 'Other' || b.genre === 'other' ? { ...b, genre: 'Fiction' } : b);
      } catch (e) {
        console.error('Failed to parse saved books, loading defaults', e);
      }
    }
    return DEFAULT_BOOKS;
  });

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 5,
    status: 'reading' as Book['status'],
    notes: '',
    coverColor: EARTHY_COVERS[0].value,
    coverImage: '',
    coverType: 'color' as 'color' | 'image',
    currentPage: 0 as number | '',
    totalPages: 300 as number | '',
    genre: 'Fiction'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTopChoicesOpen, setIsTopChoicesOpen] = useState(false);
  const [localPageInputs, setLocalPageInputs] = useState<Record<string, string>>({});
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | Book['status']>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'alphabetical' | 'genre'>('newest');
  
  // Clean feedback toasts or status messages for dynamic interactions
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('personal_library_books', JSON.stringify(books));
  }, [books]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'currentPage' || name === 'totalPages'
        ? (value === '' ? '' : parseInt(value, 10))
        : value
    }));
  };

  const selectColor = (colorHex: string) => {
    setFormData(prev => ({ ...prev, coverColor: colorHex }));
  };

  const handleQuickPageChange = (bookId: string, amount: number) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        const total = book.totalPages || 300;
        const current = book.currentPage || 0;
        let next = current + amount;
        if (next < 0) next = 0;
        if (next > total) next = total;
        
        let nextStatus = book.status;
        if (next === total) {
          nextStatus = 'completed';
        } else if (next > 0 && book.status === 'wishlist') {
          nextStatus = 'reading';
        } else if (next < total && book.status === 'completed') {
          nextStatus = 'reading';
        }

        if (selectedBook?.id === bookId) {
          setSelectedBook(prev => prev ? { ...prev, currentPage: next, status: nextStatus } : null);
        }

        return {
          ...book,
          currentPage: next,
          status: nextStatus
        };
      }
      return book;
    }));
  };

  const handleLocalPageInputChange = (bookId: string, value: string) => {
    setLocalPageInputs(prev => ({
      ...prev,
      [bookId]: value
    }));
  };

  const handleLocalPageBlur = (bookId: string, totalPages: number) => {
    const rawValue = localPageInputs[bookId];
    if (rawValue === undefined || rawValue === '') return;
    
    let parsed = parseInt(rawValue, 10);
    if (isNaN(parsed) || parsed < 0) {
      parsed = 0;
    }
    if (parsed > totalPages) {
      parsed = totalPages;
    }

    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        let nextStatus = book.status;
        if (parsed === totalPages) {
          nextStatus = 'completed';
        } else if (parsed > 0 && book.status === 'wishlist') {
          nextStatus = 'reading';
        } else if (parsed < totalPages && book.status === 'completed') {
          nextStatus = 'reading';
        }

        if (selectedBook?.id === bookId) {
          setSelectedBook(prev => prev ? { ...prev, currentPage: parsed, status: nextStatus } : null);
        }

        return {
          ...book,
          currentPage: parsed,
          status: nextStatus
        };
      }
      return book;
    }));

    setLocalPageInputs(prev => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Book Title is required.', 'error');
      return;
    }
    if (!formData.author.trim()) {
      showToast('Author is required.', 'error');
      return;
    }

    const cp = typeof formData.currentPage === 'number' ? formData.currentPage : 0;
    const tp = typeof formData.totalPages === 'number' && formData.totalPages > 0 ? formData.totalPages : 300;
    const finalCurrentPage = formData.status === 'completed' ? tp : (cp > tp ? tp : cp);

    const finalCoverImage = formData.coverType === 'image' ? formData.coverImage : undefined;

    if (editingBookId) {
      // Update book mode
      setBooks(prev => prev.map(book => {
        if (book.id === editingBookId) {
          return {
            ...book,
            title: formData.title.trim(),
            author: formData.author.trim(),
            rating: formData.rating,
            status: formData.status,
            notes: formData.notes.trim(),
            coverColor: formData.coverColor,
            coverImage: finalCoverImage,
            currentPage: finalCurrentPage,
            totalPages: tp,
            genre: formData.genre
          };
        }
        return book;
      }));
      showToast(`"${formData.title}" updated successfully!`, 'success');
      setEditingBookId(null);
    } else {
      // Add path
      const newBook: Book = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        title: formData.title.trim(),
        author: formData.author.trim(),
        rating: formData.rating,
        status: formData.status,
        notes: formData.notes.trim(),
        coverColor: formData.coverColor,
        coverImage: finalCoverImage,
        currentPage: finalCurrentPage,
        totalPages: tp,
        createdAt: new Date().toISOString(),
        genre: formData.genre
      };
      setBooks(prev => [newBook, ...prev]);
      showToast(`"${formData.title}" logged to bookshelf!`, 'success');
    }

    // Reset form states
    setFormData({
      title: '',
      author: '',
      rating: 5,
      status: 'reading',
      notes: '',
      coverColor: EARTHY_COVERS[0].value,
      coverImage: '',
      coverType: 'color',
      currentPage: 0,
      totalPages: 300,
      genre: 'Fiction'
    });
    setIsFormOpen(false);
  };

  const startEdit = (book: Book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      rating: book.rating,
      status: book.status,
      notes: book.notes || '',
      coverColor: book.coverColor,
      coverImage: book.coverImage || '',
      coverType: book.coverImage ? 'image' : 'color',
      currentPage: book.currentPage || 0,
      totalPages: book.totalPages || 300,
      genre: book.genre || 'Fiction'
    });
    setIsFormOpen(true);
    showToast(`Editing details for "${book.title}"`, 'info');
  };

  const cancelEdit = () => {
    setEditingBookId(null);
    setFormData({
      title: '',
      author: '',
      rating: 5,
      status: 'reading',
      notes: '',
      coverColor: EARTHY_COVERS[0].value,
      coverImage: '',
      coverType: 'color',
      currentPage: 0,
      totalPages: 300,
      genre: 'Fiction'
    });
    setIsFormOpen(false);
  };

  const deleteBook = (id: string, name: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
    showToast(`"${name}" has been permanently removed.`, 'info');
    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  };

  const downloadBook = (book: Book) => {
    const currentPage = book.currentPage !== undefined ? book.currentPage : 0;
    const totalPages = book.totalPages || 300;
    const pct = Math.min(100, Math.max(0, Math.round((currentPage / totalPages) * 100)));
    
    const content = `==================================================
        ATHENAEUM PERSONAL LIBRARY REGISTRY
==================================================
Title:       ${book.title}
Author:      ${book.author}
Genre:       ${book.genre || 'Fiction'}
Status:      Reading Now (Tracked with Athenaeum)
Progress:    ${currentPage} of ${totalPages} pages (${pct}% completed)
Rating:      ${'★'.repeat(book.rating)}${'☆'.repeat(5 - book.rating)}
Created At:  ${book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}

------------------ READER NOTES ------------------
${book.notes || 'No active notes cataloged yet.'}
--------------------------------------------------
Generated on: ${new Date().toLocaleString()}
==================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_reading_log.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`"${book.title}" reading log downloaded!`, 'success');
  };

  const getStats = (): LibraryStats & { readingCount: number; wishlistCount: number; completedCount: number; totalPagesRead: number } => {
    const total = books.length;
    let sum = 0;
    let fiveStar = 0;
    let reading = 0;
    let wishlist = 0;
    let completed = 0;
    let pagesRead = 0;

    books.forEach(b => {
      sum += b.rating;
      if (b.rating === 5) fiveStar++;
      if (b.status === 'reading') reading++;
      if (b.status === 'wishlist') wishlist++;
      if (b.status === 'completed') completed++;
      pagesRead += (b.currentPage || 0);
    });

    return {
      totalBooks: total,
      averageRating: total > 0 ? parseFloat((sum / total).toFixed(1)) : 0,
      fiveStarCount: fiveStar,
      readingCount: reading,
      wishlistCount: wishlist,
      completedCount: completed,
      totalPagesRead: pagesRead
    };
  };

  const statistics = getStats();

  // 1. Analyze user genre tastes to collect what the library user loves
  const affinities = (() => {
    const scores: Record<string, number> = {};
    AVAILABLE_GENRES.forEach(g => {
      scores[g] = 0;
    });

    books.forEach(b => {
      let g = b.genre || 'Fiction';
      if (g === 'Other' || g === 'other') {
        g = 'Fiction';
      }
      let weight = 1;
      
      // Status weights
      if (b.status === 'completed') weight += 3;
      if (b.status === 'reading') weight += 2;
      if (b.status === 'wishlist') weight += 1;
      
      // Rating weights
      weight += b.rating; // adds 1-5

      scores[g] = (scores[g] || 0) + weight;
    });

    return scores;
  })();

  const maxAffinity = Math.max(...Object.values(affinities), 1);
  const totalLoggedBooks = books.length;

  // 2. Rank standard pool recommendations and match percentages based on reader history
  const recommendationsWithMatching = RECOMMENDATIONS_POOL.map(rec => {
    const titleHashValue = rec.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baselineVariance = (titleHashValue % 11) - 5; // -5 to +5
    
    let matchPct = 0;
    
    if (totalLoggedBooks === 0) {
      // General high-quality defaults if shelf is fresh & empty
      matchPct = 78 + baselineVariance;
    } else {
      const genreScore = affinities[rec.genre] || 0;
      if (genreScore > 0) {
        // High affinity matched mapping to [82% - 98%]
        const ratio = genreScore / maxAffinity;
        matchPct = Math.round(82 + ratio * 15 + (titleHashValue % 5) - 2);
      } else {
        // Quality fallback mapping to [48% - 68%]
        matchPct = Math.round(52 + baselineVariance + (titleHashValue % 7));
      }
    }
    
    // strict clean clamp
    matchPct = Math.min(99, Math.max(40, matchPct));
    
    return {
      ...rec,
      matchPercentage: matchPct
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Filter & Sort core pipeline
  const filteredBooks = books.filter(book => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
    const matchesTab = activeTab === 'all' || book.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'genre') {
      const gA = a.genre || 'Fiction';
      const gB = b.genre || 'Fiction';
      return gA.localeCompare(gB) || a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Render a lovely star array
  const renderStars = (rating: number, colorClass = "text-[#8D6E63]") => {
    return (
      <div className={`flex items-center gap-0.5 ${colorClass}`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            className={`w-4 h-4 ${s <= rating ? 'fill-current' : 'opacity-30'}`} 
          />
        ))}
      </div>
    );
  };

  // Nice helper for clean relative timing style
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  };

  // Get current cover color metadata
  const currentCoverMeta = EARTHY_COVERS.find(c => c.value === formData.coverColor) || EARTHY_COVERS[0];

  return (
    <div id="athenaeum-root" className="min-h-screen bg-[#FDFCFB] text-[#4E342E] font-sans flex flex-col selection:bg-[#EFEBE9] selection:text-[#3E2723]">
      
      {/* Toast Notification */}
      {toast && (
        <div 
          id="system-toast"
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-in"
          style={{
            backgroundColor: 'rgba(253, 252, 251, 0.95)',
            borderColor: toast.type === 'error' ? '#E57373' : toast.type === 'info' ? '#BCAAA4' : '#8D6E63',
            color: toast.type === 'error' ? '#C62828' : '#3E2723'
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: toast.type === 'error' ? '#C62828' : toast.type === 'info' ? '#8D6E63' : '#5D4037' }}></div>
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      {/* Elegant Header */}
      <header id="main-header" className="px-6 py-6 md:px-12 md:py-8 border-b border-[#EFEBE9] bg-[#FDFCFB] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#5D4037]" />
            <h1 className="text-3xl md:text-4xl font-serif italic text-[#3E2723] tracking-wide">Athenaeum</h1>
          </div>
          <p className="text-xs tracking-widest uppercase text-[#8D6E63] font-semibold mt-1">Personal Library Registry</p>
        </div>
        
        {/* Simple Tab-like stats banner or filters and trigger button */}
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider font-semibold">
          <button 
            id="tab-all-books"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-full transition-all ${activeTab === 'all' ? 'bg-[#5D4037] text-white' : 'text-[#8D6E63] hover:bg-[#FAF7F2]'}`}
          >
            Bookshelf ({books.length})
          </button>
          <button 
            id="tab-reading"
            onClick={() => setActiveTab('reading')}
            className={`px-3 py-1.5 rounded-full transition-all ${activeTab === 'reading' ? 'bg-[#5D4037] text-white' : 'text-[#8D6E63] hover:bg-[#FAF7F2]'}`}
          >
            Reading Now ({statistics.readingCount})
          </button>
          <button 
            id="tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`px-3 py-1.5 rounded-full transition-all ${activeTab === 'wishlist' ? 'bg-[#5D4037] text-white' : 'text-[#8D6E63] hover:bg-[#FAF7F2]'}`}
          >
            Wishlist ({statistics.wishlistCount})
          </button>
          <button 
            id="tab-completed"
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-full transition-all ${activeTab === 'completed' ? 'bg-[#5D4037] text-white' : 'text-[#8D6E63] hover:bg-[#FAF7F2]'}`}
          >
            Archive ({statistics.completedCount})
          </button>

          <div className="h-6 w-[1px] bg-[#EFEBE9] hidden sm:block mx-1"></div>

          <button 
            id="top-choices-btn"
            onClick={() => setIsTopChoicesOpen(true)}
            className="px-4 py-2 rounded-full border border-[#D7CCC8] hover:bg-[#FAF7F2] hover:border-[#8D6E63] text-[#5D4037] font-semibold flex items-center gap-1.5 transition-all bg-white"
            title="Show dynamic personal book choices and reader matches"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
            <span>Top Choices</span>
          </button>

          <button 
            id="header-add-book-btn"
            onClick={() => {
              setEditingBookId(null);
              setFormData({
                title: '',
                author: '',
                rating: 5,
                status: 'reading',
                notes: '',
                coverColor: EARTHY_COVERS[0].value,
                coverImage: '',
                coverType: 'color',
                currentPage: 0,
                totalPages: 300,
                genre: 'Fiction'
              });
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-full bg-[#5D4037] hover:bg-[#4E342E] text-white font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0 border border-transparent"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bookshelf</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <main id="app-main-content" className="flex-1 flex flex-col">

        {/* Right Section: Library Collection Grid view */}
        <section id="library-acquisitions-container" className="flex-1 p-6 md:p-10 bg-white flex flex-col justify-between overflow-y-auto">
          
          {/* Controls Bar: Search & Sort */}
          <div id="controls-bar" className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-xl font-serif text-[#3E2723]">
                {activeTab === 'all' && 'Bookshelf'}
                {activeTab === 'reading' && 'Reading Log'}
                {activeTab === 'wishlist' && 'Wishlist Registry'}
                {activeTab === 'completed' && 'Completed Library'}
              </h3>
              <p className="text-xs text-[#8D6E63]">
                Displaying {sortedBooks.length} book{sortedBooks.length === 1 ? '' : 's'} matched in shelf
              </p>
            </div>

            {/* Interactive searching, sorting, and filter alignment */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search */}
              <div className="w-full sm:w-64 relative">
                <input 
                  type="text" 
                  id="search-input"
                  placeholder="Search title, author..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EFEBE9] focus:bg-white rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-[#3E2723]"
                />
                <Search className="w-3.5 h-3.5 text-[#8D6E63] absolute left-3 top-3" />
                {searchTerm && (
                  <button 
                    id="clear-search-btn"
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-3 top-2.5 text-[#8D6E63] hover:text-[#5D4037]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort selector dropdown */}
              <div className="w-full sm:w-auto relative flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8D6E63] whitespace-nowrap">Sort By</span>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#FAF7F2] border border-[#EFEBE9] rounded-xl pl-3 pr-8 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-1 focus:ring-[#8D6E63] appearance-none cursor-pointer font-medium"
                  >
                    <option value="newest">Acquired: Newest First</option>
                    <option value="oldest">Acquired: Oldest First</option>
                    <option value="rating">Stars Assessment</option>
                    <option value="alphabetical">Title Alphabetical</option>
                    <option value="genre">Genre Grouping</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-[#5D4037] absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Empty collection state */}
          {sortedBooks.length === 0 ? (
            <div id="empty-collection-state" className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-[#EFEBE9] bg-[#FAF7F2]/30 my-6">
              <BookOpen className="w-12 h-12 text-[#D7CCC8] mb-4" />
              <h4 className="text-lg font-serif text-[#3E2723] mb-1">No Books catalogued here</h4>
              <p className="text-sm text-[#8D6E63] max-w-sm mb-6">
                {searchTerm 
                  ? `No search results matches for "${searchTerm}". Try refining catalog keyword.`
                  : `Your ${activeTab !== 'all' ? activeTab : ''} shelf is currently empty. Populate items in your bookshelf to track progress.`}
              </p>
              {searchTerm ? (
                <button 
                  id="reset-search-btn"
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-[#FAF7F2] border border-[#D7CCC8] rounded-xl text-xs font-semibold text-[#5D4037] hover:bg-white transition-all shadow-sm"
                >
                  Clear Search
                </button>
              ) : (
                <button 
                  id="empty-add-btn"
                  onClick={() => setIsFormOpen(true)}
                  className="px-5 py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Book Details</span>
                </button>
              )}
            </div>
          ) : (
            /* Card Deck Layout */
            <div id="card-deck-layout" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-1 items-start">
              {sortedBooks.map((book) => {
                const bookInit = book.title && book.title.length > 0 ? book.title.charAt(0).toUpperCase() : 'B';
                
                // Set styling colors matching custom tag
                const statusTag = {
                  reading: { label: 'Reading Now', bg: '#E6D5C3', text: '#5D4037', icon: Bookmark },
                  wishlist: { label: 'Wishlist', bg: '#FAF7F2', text: '#8D6E63', icon: Layers },
                  completed: { label: 'Completed Archive', bg: '#EFEBE9', text: '#3E2723', icon: BookMarked }
                }[book.status];
 
                 return (
                   <div 
                     key={book.id}
                     id={`book-card-${book.id}`}
                     className="group bg-[#FAF7F2] border border-[#EFEBE9] rounded-2xl p-5 flex flex-col justify-between hover:border-[#D7CCC8] hover:shadow-sm transition-all duration-300"
                   >
                     <div>
                       {/* Top ribbon: Status Indicator & Action controls */}
                       <div className="flex justify-between items-center mb-4 text-[10px] uppercase font-bold tracking-widest gap-2">
                         <span 
                           className="px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold"
                           style={{ backgroundColor: statusTag.bg, color: statusTag.text }}
                         >
                           <statusTag.icon className="w-3 h-3 shrink-0" />
                           {statusTag.label}
                         </span>
                         
                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {book.status === 'reading' && (
                              <button 
                                id={`download-book-btn-${book.id}`}
                                onClick={() => downloadBook(book)}
                                title="Download current reading progress & notes"
                                className="p-1 px-1.5 hover:bg-white/80 rounded border border-transparent hover:border-[#EFEBE9] text-[#8D6E63] hover:text-[#5D4037] transition-all"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            )}
                           <button 
                             id={`edit-book-btn-${book.id}`}
                             onClick={() => startEdit(book)}
                             title="Edit book metadata"
                             className="p-1 px-1.5 hover:bg-white/80 rounded border border-transparent hover:border-[#EFEBE9] text-[#8D6E63] hover:text-[#5D4037] transition-all"
                           >
                             <Edit3 className="w-3.5 h-3.5" />
                           </button>
                           <button 
                             id={`delete-book-btn-${book.id}`}
                             onClick={() => deleteBook(book.id, book.title)}
                             title="Remove book entry"
                             className="p-1 px-1.5 hover:bg-white/80 rounded border border-transparent hover:border-[#EFEBE9] text-red-400 hover:text-red-700 transition-all"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                         </div>
                       </div>
 
                       {/* Main cover & core information info block */}
                       <div className="flex gap-4 items-start">
                         {/* Interactive miniature Book Cover Design */}
                         <div 
                           className="w-18 h-26 rounded-md flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm relative overflow-hidden group-hover:scale-102 transition-transform duration-300 cursor-pointer bg-[#EFEBE9]"
                           style={
                             book.coverImage 
                               ? { backgroundImage: `url(${book.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                               : { backgroundColor: book.coverColor }
                           }
                           onClick={() => setSelectedBook(book)}
                           title="Click to view notes and details"
                         >
                           {/* Inner gold thread-like binding */}
                           <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-black/10"></div>
                           {!book.coverImage && (
                             <span className="text-2xl font-serif select-none" style={{ color: book.coverColor === '#3E2723' || book.coverColor === '#8D6E63' || book.coverColor === '#A1887F' ? '#FDFCFB' : '#3E2723', opacity: 0.85 }}>
                               {bookInit}
                             </span>
                           )}
                         </div>

                        {/* Title, Author, Star Assessment */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            onClick={() => setSelectedBook(book)}
                            className="font-serif text-base text-[#3E2723] leading-tight cursor-pointer hover:underline line-clamp-2"
                            title="View Book Notes"
                          >
                            {book.title}
                          </h4>
                          <p className="text-xs text-[#8D6E63] italic mt-1 truncate">
                            by {book.author}
                          </p>
                          <div className="mt-1 flex gap-1 items-center">
                            <span className="text-[9px] uppercase font-semibold tracking-wider text-[#5D4037] bg-[#5D4037]/5 px-2 py-0.5 rounded-md border border-[#5D4037]/10">
                              {book.genre || 'Fiction'}
                            </span>
                          </div>
                          <div className="mt-3.5">
                            {renderStars(book.rating)}
                          </div>
                        </div>
                      </div>

                      {/* Snippet from notes annotation if present */}
                      {book.notes && (
                        <p className="text-xs text-[#5D4037]/80 line-clamp-2 mt-4 italic bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EFEBE9]/40 relative pl-4">
                          <span className="absolute left-1.5 top-2 text-[#D7CCC8] font-serif text-lg leading-none">“</span>
                          {book.notes}
                        </p>
                      )}

                      {/* Reading Progress Tracker Bar or Wishlist Action */}
                      {book.status === 'wishlist' ? (
                        <div className="mt-4 pt-3.5 border-t border-[#EFEBE9]/60">
                          <button
                            type="button"
                            id={`start-reading-btn-${book.id}`}
                            onClick={() => {
                              setBooks(prev => prev.map(b => b.id === book.id ? { ...b, status: 'reading', currentPage: 0 } : b));
                              showToast(`"${book.title}" is now in your Reading Now list!`, 'success');
                            }}
                            className="w-full py-2.5 px-4 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Start Reading</span>
                          </button>
                        </div>
                      ) : (
                        (() => {
                          const currentPage = book.currentPage !== undefined ? book.currentPage : 0;
                          const totalPages = book.totalPages || 300;
                          const percentageOfRead = Math.min(100, Math.max(0, Math.round((currentPage / totalPages) * 100)));

                          return (
                            <div className="mt-4 pt-3.5 border-t border-[#EFEBE9]/60 space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-bold tracking-widest text-[#8D6E63] uppercase">
                                <span>Pages Tracked</span>
                                <span className="text-[#5D4037]">{percentageOfRead}% Completed</span>
                              </div>

                              {/* Earthy Progress Bar Track */}
                              <div className="w-full h-2 bg-[#EFEBE9] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#8D6E63] rounded-full transition-all duration-500"
                                  style={{ width: `${percentageOfRead}%` }}
                                ></div>
                              </div>

                              {/* Interactive Quick Page-Change Widget */}
                              <div className="flex items-center justify-between gap-1.5 mt-2 bg-white p-1 rounded-xl border border-[#EFEBE9] shadow-inner-sm">
                                {/* Decrements */}
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleQuickPageChange(book.id, -10)}
                                    title="Go back 10 pages"
                                    className="w-7 h-5 flex items-center justify-center bg-[#FAF7F2] border border-[#D7CCC8]/50 hover:bg-[#EFEBE9] rounded text-[9px] font-bold text-[#8D6E63] transition-all"
                                  >
                                    -10
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleQuickPageChange(book.id, -1)}
                                    title="Go back 1 page"
                                    className="w-6 h-5 flex items-center justify-center bg-[#FAF7F2] border border-[#D7CCC8]/50 hover:bg-[#EFEBE9] rounded text-[9px] font-bold text-[#8D6E63] transition-all"
                                  >
                                    -1
                                  </button>
                                </div>

                                {/* Interactive Inline Input field */}
                                <div className="flex items-center gap-1 justify-center flex-1">
                                  <input
                                    type="number"
                                    value={localPageInputs[book.id] !== undefined ? localPageInputs[book.id] : currentPage}
                                    onChange={(e) => handleLocalPageInputChange(book.id, e.target.value)}
                                    onBlur={() => handleLocalPageBlur(book.id, totalPages)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleLocalPageBlur(book.id, totalPages);
                                      }
                                    }}
                                    min="0"
                                    max={totalPages}
                                    className="w-10 text-center bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded text-[10px] font-bold text-[#3E2723] focus:outline-none focus:ring-1 focus:ring-[#8D6E63] py-0.5"
                                    title="Type page number and press Enter or click away to save"
                                  />
                                  <span className="text-[9px] text-[#8D6E63] font-semibold whitespace-nowrap">/ {totalPages} pgs</span>
                                </div>

                                {/* Increments */}
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleQuickPageChange(book.id, 1)}
                                    title="Forward 1 page"
                                    className="w-6 h-5 flex items-center justify-center bg-[#FAF7F2] border border-[#D7CCC8]/50 hover:bg-[#EFEBE9] rounded text-[9px] font-bold text-[#8D6E63] transition-all"
                                  >
                                    +1
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleQuickPageChange(book.id, 10)}
                                    title="Forward 10 pages"
                                    className="w-7 h-5 flex items-center justify-center bg-[#FAF7F2] border border-[#D7CCC8]/50 hover:bg-[#EFEBE9] rounded text-[9px] font-bold text-[#8D6E63] transition-all"
                                  >
                                    +10
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      )}
                    </div>

                    {/* Bottom deck container of catalog card */}
                    <div className="mt-4 pt-3 border-t border-[#EFEBE9]/60 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#8D6E63]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(book.createdAt)}
                      </span>
                      <div className="flex items-center gap-3">
                        {book.status === 'reading' && (
                          <button
                            id={`download-link-${book.id}`}
                            onClick={() => downloadBook(book)}
                            title="Download reading progress report"
                            className="text-[#8D6E63] hover:text-[#5D4037] text-[10px] uppercase tracking-wider font-bold hover:underline transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download Log</span>
                          </button>
                        )}
                        <button 
                          id={`read-notes-btn-${book.id}`}
                          onClick={() => setSelectedBook(book)}
                          className="text-[#5D4037] text-[10px] uppercase tracking-wider font-bold border-b border-transparent hover:border-[#5D4037] transition-all"
                        >
                          Read Review
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary / Stats footer bar (Natural styling layout matched from instructions) */}
          <div id="stats-footer-bar" className="mt-8 pt-6 border-t border-[#EFEBE9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#8D6E63]">
            <div className="flex gap-8 md:gap-12 flex-wrap">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">Total catalogued</span>
                <span className="text-2xl font-serif text-[#3E2723]">{statistics.totalBooks} book{statistics.totalBooks === 1 ? '' : 's'}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">Total Pages Read</span>
                <span className="text-2xl font-serif text-[#3E2723]">{statistics.totalPagesRead.toLocaleString()} pgs</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">Average stars</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-serif text-[#3E2723]">{statistics.averageRating}</span>
                  <div className="text-xs text-[#8D6E63]">/ 5.0</div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">Masterpieces (5★)</span>
                <span className="text-2xl font-serif text-[#3E2723]">{statistics.fiveStarCount}</span>
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">Next Goal</span>
              <span className="text-xs font-semibold text-[#5D4037]">Catalog 50 books in shelf metadata registry</span>
            </div>
          </div>

        </section>
      </main>

      {/* Book Notes Detail Modal Overlay */}
      {selectedBook && (
        <div 
          id="notes-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2723]/30 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
          onClick={() => setSelectedBook(null)}
        >
          <div 
            id="modal-content"
            className="w-full max-w-lg bg-[#FDFCFB] rounded-2xl-extra border border-[#D7CCC8] shadow-2xl p-6 md:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto animate-zoom-in"
            style={{ borderRadius: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Modal header with close */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span 
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white shadow-sm font-serif text-lg font-bold"
                    style={{ backgroundColor: selectedBook.coverColor, color: selectedBook.coverColor === '#3E2723' || selectedBook.coverColor === '#8D6E63' || selectedBook.coverColor === '#A1887F' ? '#FDFCFB' : '#3E2723' }}
                  >
                    {selectedBook.title ? selectedBook.title.charAt(0).toUpperCase() : 'B'}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#8D6E63]">Book Review Entry</span>
                    <p className="text-xs text-[#8D6E63] italic">Logged standard: {formatDate(selectedBook.createdAt)}</p>
                  </div>
                </div>
                
                <button 
                  id="close-modal-btn"
                  onClick={() => setSelectedBook(null)}
                  className="p-1 rounded-full bg-[#FAF7F2] border border-[#EFEBE9] text-[#5D4037] hover:bg-[#EFEBE9] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cover layout details in modal */}
              <div className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl text-[#3E2723] leading-tight mb-2">
                    {selectedBook.title}
                  </h3>
                  <p className="text-sm font-medium italic text-[#5D4037]">
                    by {selectedBook.author}
                  </p>
                  <div className="flex gap-2 items-center mt-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8D6E63] opacity-80">Genre:</span>
                    <span className="text-xs font-semibold text-[#5D4037] bg-[#5D4037]/5 px-2.5 py-0.5 rounded-lg border border-[#5D4037]/15">
                      {selectedBook.genre || 'Fiction'}
                    </span>
                  </div>
                </div>

                {/* Rating score details */}
                <div className="grid grid-cols-3 gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EFEBE9]">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest font-bold text-[#8D6E63] mb-0.5">Assessed Rating</span>
                    {renderStars(selectedBook.rating)}
                  </div>
                  <div className="border-l border-[#D7CCC8]/60 pl-4">
                    <span className="block text-[8px] uppercase tracking-widest font-bold text-[#8D6E63] mb-0.5">State</span>
                    <span className="text-xs font-semibold text-[#5D4037] uppercase tracking-wider block truncate">
                      {selectedBook.status === 'reading' ? '📖 Reading' : selectedBook.status === 'wishlist' ? '⏳ Wishlist' : '✅ Completed'}
                    </span>
                  </div>
                  <div className="border-l border-[#D7CCC8]/60 pl-4">
                    <span className="block text-[8px] uppercase tracking-widest font-bold text-[#8D6E63] mb-0.5">Pages Read</span>
                    <span className="text-xs font-bold text-[#3E2723] block">
                      {selectedBook.currentPage || 0} / {selectedBook.totalPages || 300}
                    </span>
                  </div>
                </div>

                {/* Progress bar tracker inside modal */}
                <div className="space-y-1.5 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EFEBE9]">
                  <div className="flex justify-between items-center text-[8px] font-bold tracking-widest text-[#8D6E63]">
                    <span>READING TRACKER PROFILE</span>
                    <span>{Math.round(((selectedBook.currentPage || 0) / (selectedBook.totalPages || 300)) * 100)}% COMPLETE</span>
                  </div>
                  <div className="w-full h-2 bg-[#EFEBE9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#8D6E63] rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((selectedBook.currentPage || 0) / (selectedBook.totalPages || 300)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Extended Notes text */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase tracking-widest font-bold text-[#8D6E63]">Review & Written thoughts</span>
                  {selectedBook.notes ? (
                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D7CCC8]/40 italic text-sm text-[#4E342E] leading-relaxed relative pl-6">
                      <Quote className="w-6 h-6 text-[#D7CCC8] absolute left-1.5 top-2.5 fill-current opacity-30" />
                      <p className="relative pt-1">{selectedBook.notes}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#8D6E63] italic bg-[#FAF7F2] p-4 rounded-xl text-center">
                      No review or personal thoughts written for this book yet. Click 'Edit Metadata' below to add a review.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal actions footer */}
            <div className="mt-8 pt-4 border-t border-[#EFEBE9] flex gap-3 justify-end items-center">
              {selectedBook.status === 'reading' && (
                <button
                  id="download-from-modal-btn"
                  onClick={() => downloadBook(selectedBook)}
                  className="px-4 py-2 bg-[#8D6E63] hover:bg-[#5D4037] text-white hover:text-white border border-[#8D6E63] hover:border-[#5D4037] text-xs font-bold rounded-xl transition-all uppercase tracking-wider font-semibold mr-auto flex items-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Log</span>
                </button>
              )}
              <button
                id="edit-from-modal-btn"
                onClick={() => {
                  startEdit(selectedBook);
                  setSelectedBook(null);
                }}
                className="px-4 py-2 bg-[#FAF7F2] border border-[#D7CCC8] hover:bg-white text-xs font-bold text-[#5D4037] rounded-xl transition-all uppercase tracking-wider font-semibold"
              >
                Edit Metadata
              </button>
              <button
                id="delete-from-modal-btn"
                onClick={() => {
                  deleteBook(selectedBook.id, selectedBook.title);
                }}
                className="px-4 py-2 hover:bg-red-50 text-xs font-bold text-red-700 hover:border-red-200 border border-transparent rounded-xl transition-all uppercase tracking-wider font-semibold"
              >
                Delete Entry
              </button>
              <button
                id="close-modal-footer-btn"
                onClick={() => setSelectedBook(null)}
                className="px-5 py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
              >
                Close Review Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pristine Modal Panel: Log or Edit Book Entry */}
      {isFormOpen && (
        <div 
          id="book-entry-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={cancelEdit}
        >
          <div 
            className="bg-white border border-[#EFEBE9] rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 animate-slide-up text-[#4E342E] font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-[#EFEBE9]">
              <div>
                <h2 className="font-serif text-2xl text-[#3E2723]">
                  {editingBookId ? 'Edit Book Details' : 'Add Book to Bookshelf'}
                </h2>
                <p className="text-xs text-[#8D6E63] mt-1">
                  {editingBookId ? 'Modify metadata and notes of this item' : 'Fill out details to catalogue a new library item.'}
                </p>
              </div>
              <button 
                id="close-entry-modal-btn"
                onClick={cancelEdit}
                className="p-1 px-1.5 hover:bg-[#FAF7F2] rounded-xl text-[#8D6E63] hover:text-[#5D4037] transition-all border border-[#EFEBE9]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form id="book-entry-form" onSubmit={handleFormSubmit} className="space-y-5">
              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Book Title *</label>
                  <input 
                    type="text" 
                    id="title"
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Shadow of the Wind" 
                    className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Author *</label>
                  <input 
                    type="text" 
                    id="author"
                    name="author" 
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    placeholder="Carlos Ruiz Zafón" 
                    className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Grid: Rating & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rating" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Rating Assessment</label>
                  <div className="relative">
                    <select 
                      id="rating"
                      name="rating" 
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] appearance-none cursor-pointer focus:bg-white transition-all"
                    >
                      <option value="5">5 Stars — Masterpiece</option>
                      <option value="4">4 Stars — Excellent</option>
                      <option value="3">3 Stars — Good</option>
                      <option value="2">2 Stars — Mediocre</option>
                      <option value="1">1 Star — Poor</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8D6E63] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="status" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Reading Progress State</label>
                  <div className="relative">
                    <select 
                      id="status"
                      name="status" 
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] appearance-none cursor-pointer focus:bg-white transition-all"
                    >
                      <option value="reading">📖 Reading Now</option>
                      <option value="wishlist">⏳ Wishlist</option>
                      <option value="completed">✅ Completed Archive</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8D6E63] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Genre Selector */}
              <div>
                <label htmlFor="genre" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Book Genre *</label>
                <div className="relative">
                  <select 
                    id="genre"
                    name="genre" 
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] appearance-none cursor-pointer focus:bg-white transition-all"
                  >
                    {AVAILABLE_GENRES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8D6E63] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Interactive Book Cover Customization Option Tab Selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Book Cover Art Style</label>
                <div className="flex border border-[#EFEBE9] rounded-xl overflow-hidden p-1 bg-[#FAF7F2] mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverType: 'color' }))}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${formData.coverType === 'color' ? 'bg-white text-[#3E2723] shadow-sm' : 'text-[#8D6E63] hover:text-[#5D4037]'}`}
                  >
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#D7CCC8] to-[#5D4037]"></span>
                    Solid Tone Color
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverType: 'image' }))}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${formData.coverType === 'image' ? 'bg-white text-[#3E2723] shadow-sm' : 'text-[#8D6E63] hover:text-[#5D4037]'}`}
                  >
                    <Image className="w-3.5 h-3.5 text-indigo-500" />
                    Graphic Cover Image
                  </button>
                </div>

                {/* Cover Tone Palette Picker Option list */}
                {formData.coverType === 'color' ? (
                  <div className="space-y-3 p-3 bg-[#FAF7F2]/50 border border-[#EFEBE9] rounded-2xl">
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-[#8D6E63]">Earthy Book Jacket Themes</span>
                    <div className="flex gap-2.5 flex-wrap">
                      {EARTHY_COVERS.map((theme) => (
                        <button
                          key={theme.name}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, coverColor: theme.value }))}
                          title={theme.name}
                          className={`w-9 h-9 rounded-full border-2 transition-transform relative flex items-center justify-center ${formData.coverColor === theme.value ? 'scale-110 border-[#5D4037]' : 'border-white hover:scale-105'}`}
                          style={{ backgroundColor: theme.value }}
                        >
                          {formData.coverColor === theme.value && (
                            <Check 
                              className="w-4 h-4" 
                              style={{ color: theme.value === '#3E2723' || theme.value === '#8D6E63' ? '#FDFCFB' : '#3E2723' }} 
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4 bg-[#FAF7F2]/50 border border-[#EFEBE9] rounded-2xl">
                    {/* Preselected Cover Images options */}
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider font-bold text-[#8D6E63] mb-2">Curated Cover Materials</span>
                      <div className="grid grid-cols-4 gap-2">
                        {CURATED_COVER_IMAGES.map((img) => (
                          <button
                            key={img.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, coverImage: img.url }))}
                            className={`aspect-video rounded-lg relative overflow-hidden border-2 group transition-all text-left bg-cover bg-center ${formData.coverImage === img.url ? 'border-[#5D4037] scale-102 ring-1 ring-[#5D4037]' : 'border-transparent hover:scale-101'}`}
                            style={{ backgroundImage: `url(${img.url})` }}
                            title={img.name}
                          >
                            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors"></div>
                            <span className="absolute bottom-1 left-1.5 text-[8px] font-bold text-white truncate max-w-[90%] tracking-tight">
                              {img.name}
                            </span>
                            {formData.coverImage === img.url && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-[#5D4037] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clipboard URLs & uploads */}
                    <div className="space-y-2">
                      <span className="block text-[9px] uppercase tracking-wider font-bold text-[#8D6E63]">Or enter custom cover image URL / select photo</span>
                      <input 
                        type="url" 
                        id="coverImageURL"
                        name="coverImage"
                        placeholder="Paste internet book cover URL here..." 
                        value={formData.coverImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                        className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-xs text-[#3E2723] focus:bg-white transition-all"
                      />

                      {/* File upload drag zone */}
                      <div className="relative border border-dashed border-[#D7CCC8]/80 hover:border-[#8D6E63] rounded-xl p-3 text-center bg-white transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({ ...prev, coverImage: reader.result as string }));
                                showToast('Custom cover loaded successfully!', 'success');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <p className="text-[10px] text-[#8D6E63] font-medium">
                          📁 Drop cover photo here or <span className="text-[#5D4037] underline pointer-events-none">browse local files</span>
                        </p>
                      </div>

                      {/* Cover Photo Sandbox Preview */}
                      {formData.coverImage && (
                        <div className="flex items-center gap-2.5 pt-1">
                          <img 
                            src={formData.coverImage} 
                            alt="Cover Thumbnail" 
                            className="w-8 h-12 rounded object-cover border border-[#D7CCC8]"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=150';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-bold text-[#8D6E63] block uppercase tracking-wider leading-none">Jacket Preview Active</span>
                            <button 
                              type="button" 
                              onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                              className="text-[9px] text-[#C62828] hover:underline font-bold uppercase mt-1 leading-none tracking-wider block border border-transparent"
                            >
                              Reset Cover Space
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentPage" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Current Page</label>
                  <input 
                    type="number" 
                    id="currentPage"
                    name="currentPage" 
                    value={formData.currentPage}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 0" 
                    className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] focus:bg-white transition-all disabled:opacity-50"
                    disabled={formData.status === 'completed'}
                    title={formData.status === 'completed' ? "Completed books are set to 100% automatically" : ""}
                  />
                  {formData.status === 'completed' && <span className="text-[9px] text-[#8D6E63] italic block mt-1">Locked to total page size</span>}
                </div>

                <div>
                  <label htmlFor="totalPages" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Total Pages</label>
                  <input 
                    type="number" 
                    id="totalPages"
                    name="totalPages" 
                    value={formData.totalPages}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="e.g., 300" 
                    className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Review */}
              <div>
                <label htmlFor="notes" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-[#8D6E63] opacity-80">Review / Written thoughts</label>
                <textarea 
                  id="notes"
                  name="notes" 
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="E.g., write down your full review, key takeaways, and personal impressions..." 
                  className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8D6E63] text-sm text-[#3E2723] resize-none focus:bg-white transition-all"
                />
              </div>

              {/* Modal controls actions footer */}
              <div className="pt-4 border-t border-[#EFEBE9] flex gap-3 justify-end items-center">
                <button
                  type="button"
                  id="cancel-modal-btn"
                  onClick={cancelEdit}
                  className="px-5 py-3 bg-[#FAF7F2] hover:bg-[#FAF7F2]/40 text-[#5D4037] border border-[#D7CCC8]/80 hover:text-[#5D4037] text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  id="submit-book-btn"
                  className="px-6 py-3 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  {editingBookId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{editingBookId ? 'Save Book Changes' : 'Log Book'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Choices Personalized Recommendation Center Modal */}
      {isTopChoicesOpen && (
        <div 
          id="top-choices-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-[#4E342E]"
          onClick={() => setIsTopChoicesOpen(false)}
        >
          <div 
            className="bg-[#FDFCFB] border border-[#EFEBE9] rounded-3xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-slide-up text-[#4E342E] font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-[#EFEBE9]">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-inner">
                  <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500/10" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-[#3E2723]">
                    Top Choices Recommendation Center
                  </h2>
                  <p className="text-xs text-[#8D6E63] mt-0.5">
                    Dynamic affinity matches calculated directly from your logged books, ratings, and genre tags.
                  </p>
                </div>
              </div>
              <button 
                id="close-top-choices-btn"
                onClick={() => setIsTopChoicesOpen(false)}
                className="p-1 px-1.5 hover:bg-[#FAF7F2] rounded-xl text-[#8D6E63] hover:text-[#5D4037] transition-all border border-[#EFEBE9]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Collected Reading Insights Profile Panel */}
            <div className="bg-[#FAF7F2] border border-[#EFEBE9] rounded-2xl p-4 space-y-3 shadow-inner-sm">
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[#8D6E63]">Your Captured Genre Interests Profile</span>
              {totalLoggedBooks === 0 ? (
                <div className="flex flex-col items-start gap-2.5 pt-1">
                  <p className="text-xs text-[#8D6E63] italic">
                    No books catalogued yet. Add books to your bookshelf with genres & ratings to calibrate your dynamic affinity matches!
                  </p>
                  <button
                    id="recommendations-want-to-start-btn"
                    onClick={() => {
                      setIsTopChoicesOpen(false);
                      setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Want to start reading?</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                  {Object.entries(affinities)
                    .filter(([genre, score]) => score > 0 && genre.toLowerCase() !== 'other')
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 4)
                    .map(([genre, score]) => {
                      const pct = Math.round((score / maxAffinity) * 100);
                      return (
                        <div key={genre} className="bg-white rounded-xl p-2 px-3 border border-[#EFEBE9] space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-[#3E2723] truncate">{genre}</span>
                            <span className="text-[#8D6E63]">{pct}% Affinity</span>
                          </div>
                          <div className="w-full h-1 bg-[#EFEBE9] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Recommendations Stack */}
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[#8D6E63]">Recommended Masterpieces for You</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendationsWithMatching.map((rec) => {
                  const alreadyHave = books.some(b => b.title.toLowerCase() === rec.title.toLowerCase());
                  
                  // Score based color matching indicators
                  const matchColor = rec.matchPercentage >= 90 
                    ? { bg: 'bg-[#EBF7EE]', text: 'text-[#2E7D32]', border: 'border-[#A3E2A6]' }
                    : rec.matchPercentage >= 75
                      ? { bg: 'bg-[#FFF8E1]', text: 'text-[#F57F17]', border: 'border-[#FFE082]' }
                      : { bg: 'bg-[#FAF7F2]', text: 'text-[#8D6E63]', border: 'border-[#EFEBE9]' };

                  return (
                    <div 
                      key={rec.id} 
                      className="p-4 bg-white border border-[#EFEBE9] rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-[#D7CCC8]/80 transition-all duration-300 relative overflow-hidden text-left"
                    >
                      <div className="space-y-3">
                        {/* Match Indicator Badge */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-[#FAF7F2] text-[#8D6E63] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border border-[#EFEBE9]">
                            {rec.genre}
                          </span>
                          <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${matchColor.bg} ${matchColor.text} ${matchColor.border}`}>
                            {rec.matchPercentage}% Match
                          </span>
                        </div>

                        {/* Title, Author & Jacket */}
                        <div className="flex gap-3 items-start">
                          <div 
                            className="w-12 h-18 rounded-md flex-shrink-0 border bg-[#FAF7F2]"
                            style={
                              rec.coverImage 
                                ? { backgroundImage: `url(${rec.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                : { backgroundColor: rec.coverColor }
                            }
                          ></div>
                          <div className="min-w-0">
                            <h4 className="font-serif text-sm font-bold text-[#3E2723] line-clamp-1">
                              {rec.title}
                            </h4>
                            <p className="text-xs text-[#8D6E63] italic truncate">
                              by {rec.author}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#5D4037]/90 line-clamp-3 leading-relaxed">
                          {rec.description}
                        </p>
                      </div>

                      {/* Interactive Add button */}
                      <div className="pt-3 mt-3 border-t border-[#EFEBE9] flex justify-end">
                        {alreadyHave ? (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#8D6E63] bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#EFEBE9] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            Already in Library
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              // Callback to add directly to bookshelf as wishlist entry
                              const newBook: Book = {
                                id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
                                title: rec.title,
                                author: rec.author,
                                rating: rec.rating,
                                status: 'wishlist',
                                notes: rec.description,
                                coverColor: rec.coverColor,
                                coverImage: rec.coverImage,
                                currentPage: 0,
                                totalPages: 350,
                                createdAt: new Date().toISOString(),
                                genre: rec.genre
                              };
                              setBooks(prev => [newBook, ...prev]);
                              showToast(`"${rec.title}" catalogued to Wishlist!`, 'success');
                            }}
                            className="text-[10px] uppercase tracking-wider font-bold text-white bg-[#5D4037] hover:bg-[#4E342E] px-3.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1 animate-pulse-subtle"
                          >
                            <Plus className="w-3 h-3" />
                            Want to Read
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Controls Actions Footer */}
            <div className="pt-4 border-t border-[#EFEBE9] flex justify-end">
              <button
                type="button"
                id="close-recommendations-btn"
                onClick={() => setIsTopChoicesOpen(false)}
                className="px-6 py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
