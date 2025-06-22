'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useManga } from '../../providers/MangaContext';
import Image from 'next/image';
import {
  BookOpen,
  Bookmark,
  Heart,
  History,
  Search,
  Star,
  Clock,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  X,
  SortAsc,
  TrendingUp,
  ArrowUpDown,
  List,
  Grid3x3,
  Clock5,
  ChevronRight,
  Tag,
  Filter,
  Eye,
  BookOpenCheck,
  BookOpenText,
  UserPlus,
  Pin,
  XCircle,
  ClockAlert,
  CircleCheck,
  ListFilter,
  LibraryBig,
} from 'lucide-react';
import filterOptions from '../../constants/filterOptions';

// Reading History Card (compact, darker)
const ReadingHistoryCard = ({ item, onClick }) => {
  const [showChapters, setShowChapters] = useState(false);
  const manga = item.manga;
  const progress = Math.round(
    (item.chapters.length / (item.allChaptersList.length || 1)) * 100
  );

  return (
    <div className="group relative  border border-gray-900 rounded-xl overflow-hidden hover:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-850/30 to-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

      <div className="relative flex gap-3 p-3">
        {/* Cover Image */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-28 rounded-lg overflow-hidden shadow-md ring-1 ring-gray-900/80">
            <img
              src={manga.coverImageUrl || '/placeholder.jpg'}
              alt={manga.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
          {/* Progress badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md border border-gray-800/70 select-none">
            <span className="relative z-10">{progress}%</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title and Date */}
          <div className="flex items-start justify-between">
            <h3
              className="text-base font-semibold text-gray-100 cursor-pointer hover:text-gray-300 transition-colors line-clamp-2 leading-tight"
              onClick={() => onClick(manga)}
              title={manga.title}
            >
              {manga.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-400 text-xs bg-gray-900/70 px-2 py-0.5 rounded-full select-none">
              <Clock className="w-4 h-4" />
              <span>{new Date(item.lastReadAT).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-900/30 px-2 py-0.5 rounded-full border border-yellow-900/50 select-none">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold text-xs">
                {manga?.rating?.rating?.bayesian?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-900/50 select-none">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold text-xs">
                {(manga?.rating?.follows / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="flex items-center gap-1 bg-green-900/30 px-2 py-0.5 rounded-full border border-green-900/50 select-none">
              <Bookmark className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold text-xs">
                {manga?.rating?.comments?.repliesCount || 0}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {(manga.flatTags || ['Action', 'Adventure', 'Supernatural'])
              .slice(0, 4)
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-900/70 text-gray-400 text-[10px] font-medium rounded-full border border-gray-800 backdrop-blur-sm select-none"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

      </div>
      {/* Chapters Section */}
      <div className=" rounded-lg p-2  max-h-46 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xs font-semibold text-gray-200 flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-gray-400" />
            Recent Chapters ({item.chapters.length})
          </h4>
          {item.chapters.length > 2 && (
            <button
              onClick={() => setShowChapters(!showChapters)}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-300 text-xs font-medium transition-all hover:bg-gray-800/50 px-2 py-0.5 rounded-full"
              aria-label={showChapters ? 'Show Less' : 'Show All'}
            >
              {showChapters ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="space-y-1">
          {item.chapters
            .slice(0, showChapters ? item.chapters.length : 2)
            .map((chapter, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-1 bg-gray-950/90 hover:bg-gray-900/70 border border-gray-800 hover:border-gray-700 rounded-md transition-colors duration-200 cursor-default"
              >
                <div className="flex items-center gap-1">
                  <span className="bg-gray-900 text-gray-300 font-semibold text-[10px] px-1 py-0.5 rounded select-none">
                    Ch. {chapter.chapter}
                  </span>
                  <span className="text-gray-300 text-xs truncate max-w-[140px]">
                    {chapter.title}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Filter Panel (darker)
const FilterPanel = ({ filters, onFiltersChange }) => {

  const options = {
    genres: filterOptions.genres,
    formats: filterOptions.formats,
    themes: filterOptions.themes,
    content: filterOptions.content,
  };
  const statusIconMap = {
    ongoing: Clock,
    completed: CircleCheck,
    hiatus: ClockAlert,
    cancelled: XCircle,
  };
  const statusOptions = [
    ...filterOptions.statuses.map((status) => ({
      value: status.id,
      label: status.label,
      icon: statusIconMap[status.id] || BookOpen, // Fallback icon if no match
      color: status.color, // Preserve color for UI use
    })),
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recency', icon: Clock },
    { value: 'rating', label: 'Top Rated', icon: Star },
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'title', label: 'Title A-Z', icon: SortAsc },
    { value: 'progress', label: 'Progress', icon: ArrowUpDown },
  ];

  return (
    <div className=" rounded-xl p-4 max-h-[75vh] border-[1px] border-white/10  sticky top-6   text-sm">
      <div className="flex mb-5 gap-3 items-center justify-between">
        <div className="flex items-center gap-3 justify-between">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <Filter className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">Filter</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-wide">Filter Reading history</p>
          </div>
        </div>
        {/* Clear Filters */}
        <button
          onClick={() => onFiltersChange({ genre: [], status: 'all', sort: 'recent' })}
          className="w-fit p-4 bg-gray-950 hover:bg-red-900 text-gray-400 hover:text-red-400 rounded-lg transition-all flex items-center justify-center gap-1 border border-gray-900 hover:border-red-700 text-xs"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      </div>
      <div className=' max-h-[75vh] px-2  custom-scrollbar overflow-y-auto'>
        <div className=' max-h-[180px] flex flex-col gap-3 overflow-y-auto custom-scrollbar'>
          {/* Genres Filter */}
          <div className=" min-h-fit">
            <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Genres
            </h3>
            <div className="flex min-h-fit flex-wrap gap-1 max-h-28 overflow-visible ">

              {options.genres.map((genre) => (
                <li
                  key={genre.label}
                  onClick={() => {
                    const newGenres = filters.genre.includes(genre.label)
                      ? filters.genre.filter((g) => g !== genre.label)
                      : [...filters.genre, genre.label];
                    onFiltersChange({ ...filters, genre: newGenres });
                  }}
                  className={`transition-all  cursor-pointer border-solid border-[0.5px] rounded-md px-1 flex items-center gap-1 text-gray-300
              ${filters.genre.includes(genre.label)
                      ? ' border-purple-500/40 bg-gray-700/30'
                      : ' border-gray-500/20 hover:bg-gray-700'
                    }`}
                  role="button"
                  aria-pressed={filters.genre.includes(genre.label)}
                >
                  <div className="px-1 my-auto text-center">
                    <span className="my-auto select-none text-xs relative bottom-[1px]">
                      {genre.label}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </div>

          {/* Formats Filter */}
          <div className="min-h-fit">
            <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Formats
            </h3>
            <div className="flex min-h-fit flex-wrap gap-1 max-h-28 overflow-visible ">

              {options.formats.map((format) => (
                <li
                  key={format.label}
                  onClick={() => {
                    const newGenres = filters.genre.includes(format.label)
                      ? filters.genre.filter((g) => g !== format.label)
                      : [...filters.genre, format.label];
                    onFiltersChange({ ...filters, genre: newGenres });
                  }}
                  className={`transition-all  cursor-pointer border-solid border-[0.5px] rounded-md px-1 flex items-center gap-1 text-gray-300
              ${filters.genre.includes(format.label)
                      ? ' border-purple-500/40 bg-gray-700/30'
                      : ' border-gray-500/20 hover:bg-gray-700'
                    }`}
                  role="button"
                  aria-pressed={filters.genre.includes(format.label)}
                >
                  <div className="px-1 my-auto text-center">
                    <span className="my-auto select-none text-xs relative bottom-[1px]">
                      {format.label}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </div>

          {/* Themes Filter */}
          <div className="  min-h-fit">
            <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Themes
            </h3>
            <div className="flex min-h-fit flex-wrap gap-1 max-h-28 overflow-visible ">
              {options.themes.map((theme) => (
                <li
                  key={theme.label}
                  onClick={() => {
                    const newGenres = filters.genre.includes(theme.label)
                      ? filters.genre.filter((g) => g !== theme.label)
                      : [...filters.genre, theme.label];
                    onFiltersChange({ ...filters, genre: newGenres });
                  }}
                  className={`transition-all  cursor-pointer border-solid border-[0.5px] rounded-md px-1 flex items-center gap-1 text-gray-300
              ${filters.genre.includes(theme.label)
                      ? ' border-purple-500/40 bg-gray-700/30'
                      : ' border-gray-500/20 hover:bg-gray-700'
                    }`}
                  role="button"
                  aria-pressed={filters.genre.includes(theme.label)}
                >
                  <div className="px-1 my-auto text-center">
                    <span className="my-auto select-none text-xs relative bottom-[1px]">
                      {theme.label}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </div>

          {/* Content Filter */}
          <div className=" min-h-fit">
            <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Content
            </h3>
            <div className="flex min-h-fit flex-wrap gap-1 max-h-28 overflow-visible ">

              {options.content.map((content) => (
                <li
                  key={content.label}
                  onClick={() => {
                    const newGenres = filters.genre.includes(content.label)
                      ? filters.genre.filter((g) => g !== content.label)
                      : [...filters.genre, content.label];
                    onFiltersChange({ ...filters, genre: newGenres });
                  }}
                  className={`transition-all  cursor-pointer border-solid border-[0.5px] rounded-md px-1 flex items-center gap-1 text-gray-300
              ${filters.genre.includes(content.label)
                      ? ' border-purple-500/40 bg-gray-700/30'
                      : ' border-gray-500/20 hover:bg-gray-700'
                    }`}
                  role="button"
                  aria-pressed={filters.genre.includes(content.label)}
                >
                  <div className="px-1 my-auto text-center">
                    <span className="my-auto select-none text-xs relative bottom-[1px]">
                      {content.label}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
        {/* Status Filter */}
        <div className="mb-4 mt-5">
          <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2"><TrendingUp className=' w-5 h-5' />Status</h3>
          <div className="gap-1 grid grid-cols-2 flex-row">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFiltersChange({ ...filters, status: option.value })}
                className={`w-full flex col-span-1 items-center gap-2 p-2 px-3 rounded-lg text-xs transition-all duration-300 ${filters.status === option.value
                  ? 'bg-gray-900 text-gray-100 border border-gray-800 shadow-inner'
                  : 'text-gray-400 hover:bg-gray-900 border border-gray-800 hover:text-gray-300'
                  }`}
                aria-pressed={filters.status === option.value}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2"><ListFilter className=' w-5 h-5' />Sort By</h3>
          <div className="gap-1 grid grid-cols-2 flex-row">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFiltersChange({ ...filters, sort: option.value })}
                className={`w-full flex col-span-1 items-center gap-2 p-2 px-3 rounded-lg text-xs transition-all duration-300 ${filters.sort === option.value
                  ? 'bg-gray-900 text-gray-100 border border-gray-800 shadow-inner'
                  : 'text-gray-400 hover:bg-gray-900 border border-gray-800 hover:text-gray-300'
                  }`}
                aria-pressed={filters.sort === option.value}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact Card for Bookmarks/Favorites (darker)
const CompactMangaCard = ({ item, onClick, type }) => {
  const manga = item.manga || item.mangaInfo || item;
  const isChapter = type === 'favorite' && item.chapterInfo;

  return (
    <div
      onClick={() => onClick(manga)}
      className={`group  backdrop-blur-sm border border-gray-900 rounded-lg ${isChapter ? "p-3 bg-gray-950/90" : "p-0"}  cursor-pointer hover:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-sm`} title={manga.title}
    >
      <div className={`flex gap-3 ${isChapter ? "" : "flex-col"}`}>
        <div className={`relative ${isChapter ? "w-16 h-16" : "w-full h-18"} rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-900/80`}>
          <img
            src={manga.coverImageUrl || '/placeholder.jpg'}
            alt={manga.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          {/* Emphasize chapter info for favorites */}
          {isChapter ? (
            <>
              <div className="text-sm font-semibold text-gray-100 truncate">
                {item.chapterInfo[0]?.title || 'Chapter Title'}
              </div>
              <div className="text-xs text-gray-400 select-none">
                Ch. {item.chapterInfo[0]?.chapter}
              </div>
              <div className="text-xs text-gray-600 truncate max-w-full">
                Manga: <span className="text-gray-400">{manga.title}</span>
              </div>
            </>
          ) : (
            <h4 className="text-gray-100 mb-4 text-xs text-center font-semibold line-clamp-2 group-hover:text-gray-300 transition-colors">
              {manga.title}
            </h4>
          )}

          {/* {isChapter && <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className='flex flex-row w-full gap-4 mb-0'>
                        <div className="flex items-center gap-1 md:gap-1 mt-1 text-xs text-gray-400">
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded-full  text-indigo-400"
                          >
                            <Star className="w-4 h-4" />
                          </span>
                          <span className="font-medium text-gray-300">{manga?.rating?.rating?.bayesian.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1 mt-1 text-xs text-gray-400">
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded-full  text-indigo-400"
                          >
                            <UserPlus className="w-4 h-4" />
                          </span>
                          <span className="font-medium text-gray-300">{manga?.rating?.follows}</span>
                        </div>
                      </div>
          </div>} */}

        </div>
      </div>
    </div>
  );
};

// Right Sidebar with grid layouts for bookmarks and favorites (darker)
const RightSidebar = ({
  favorites,
  onMangaClick,
}) => {
  return (
    <div className="space-y-5 ">

      {/* Favorites Section */}
      <div className=" flex-1 mt-2 flex flex-col shadow-lg">
        <div className="flex mb-5 gap-3 items-center justify-between">
          <div className="flex items-center gap-3 justify-between">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <BookOpenCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-100">Favorites</h2>
              <p className="text-[9px] text-gray-400 uppercase tracking-wide">Your favorites chapters</p>
            </div>
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-900/80 p-1 px-3 rounded-full border border-gray-800">
            <div>{favorites.length}</div>
          </div>
        </div>

        <div className="flex-1 max-h-[25vh] overflow-scroll custom-scrollbar space-y-2">
          {favorites.length > 0 ? (
            favorites.map((item, idx) => (
              <CompactMangaCard
                key={idx}
                item={item}
                onClick={onMangaClick}
                type="favorite"
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-6">
              <div className="p-3 bg-gray-900 rounded-full mb-3">
                <Heart className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm font-medium">No favorites yet</p>
              <p className="text-gray-700 text-xs mt-1">Heart your favorite chapters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Library = () => {
  const router = useRouter();
  const { getSelectedManga, getAllFavorites, getAllBookMarks, getAllFromReadHistory } = useManga();

  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: [],
    status: 'all',
    sort: 'recent',
  });
  console.log(getSelectedManga());
  console.log(getAllFavorites());
  console.log(getAllBookMarks());
  console.log(getAllFromReadHistory());
  console.log(searchHistory);
  useEffect(() => {
    try {
      const searches = Object.keys(localStorage || {})
        .filter((key) => key.startsWith('manga_search_'))
        .map((key) => key.replace('manga_search_', ''))
        .reverse();
      setSearchHistory(searches);
    } catch {
      setSearchHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMangaClick = useCallback(
    (manga) => router.push(`/manga/${manga.id}/chapters`),
    [router]
  );
  const handleSearchClick = useCallback(
    (query) => router.push(`/search?query=${encodeURIComponent(query)}`),
    [router]
  );

  const selectedManga = getSelectedManga();
  const favorites = Object.values(getAllFavorites());
  const bookmarks = getAllBookMarks();
  const readHistory = getAllFromReadHistory();

  // Filter and sort reading history
  const filteredHistory = useMemo(() => {
    let filtered = [...readHistory];

    if (filters.genre.length > 0) {
      filtered = filtered.filter((item) =>
        item.manga.flatTags?.some((tag) => filters.genre.includes(tag))
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((item) => item.manga.status === filters.status);
    }

    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'recent':
          return new Date(b.lastReadAT) - new Date(a.lastReadAT);
        case 'rating':
          return (
            (b.manga.rating?.rating?.bayesian || 0) -
            (a.manga.rating?.rating?.bayesian || 0)
          );
        case 'popular':
          return (b.manga.rating?.follows || 0) - (a.manga.rating?.follows || 0);
        case 'title':
          return a.manga.title.localeCompare(b.manga.title);
        case 'progress':
          const progressA =
            (a.chapters.length / (a.allChaptersList.length || 1)) * 100;
          const progressB =
            (b.chapters.length / (b.allChaptersList.length || 1)) * 100;
          return progressB - progressA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [readHistory, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-900 border-t-gray-700 rounded-full animate-spin" />
            <BookOpen className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-100 block">
              Loading your library
            </span>
            <span className="text-gray-400 text-xs">
              Please wait while we fetch your data...
            </span>
          </div>
        </div>
      </div>
    );
  }
  console.log(bookmarks);


  return (
    <div className="min-h-[89vh]">
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(20, 20, 20, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #30303023, #80808023);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #303030, #808080);
        }
      `}</style>

      {/* Header */}
      <div className="w-full border-b  border-purple-500/20">
        <div className="flex items-center justify-between px-7 py-4 relative overflow-hidden">

          {/* Left section - Icon and title */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl  transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-gray-900 p-3 rounded-xl border border-purple-400/30 shadow-xl">
                <LibraryBig className="w-8 h-8 text-purple-400 drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent tracking-tight">
                Library
              </h2>
              <p className="text-xs text-gray-400 font-medium tracking-wide max-w-md">
                Reading History • Favourites • Bookmarks & More
              </p>
            </div>
          </div>

          {/* Right section - Action buttons */}
          <div className="flex items-center gap-3 relative z-10">
            <button className="group relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600/20 to-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm font-medium hover:from-indigo-500/30 hover:to-indigo-400/20 hover:text-indigo-200 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <BookOpenText className="w-4 h-4 relative z-10" />
              <span className="relative z-10">History ({readHistory.length})</span>
            </button>

            <button className="group relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600/20 to-rose-500/10 border border-rose-400/30 text-rose-300 text-sm font-medium hover:from-rose-500/30 hover:to-rose-400/20 hover:text-rose-200 hover:border-rose-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Heart className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Favourite ({favorites.length})</span>
            </button>

            <button className="group relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-medium hover:from-emerald-500/30 hover:to-emerald-400/20 hover:text-emerald-200 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Bookmark className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Bookmarks ({bookmarks.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full px-6 pt-1">
        <div className="flex flex-row w-full gap-1" style={{ height: '75vh' }}>
          {/* Left Sidebar - Filters */}
          <div className="col-span-12 overflow-y-hidden  bg-black/30 backdrop-blur-xl  rounded-lg pb-4 max-w-80">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content Area - Reading History (2 per row) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col border border-gray-900 bg-black/30 rounded-xl p-4 shadow-lg overflow-hidden">
            <div className='flex flex-col mb-4 rounded-xl overflow-y-auto custom-sidebar'>
              <div className="flex mb-5 gap-3 items-center justify-between">
                <div className="flex items-center gap-3 justify-between">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <BookOpenCheck className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-100">Reading History</h2>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide">Continue where you left off</p>
                  </div>
                </div>
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-900/80 p-1 px-3 rounded-full border border-gray-800">
                  <div>{readHistory.length}</div>
                </div>
              </div>


              {/* Reading History List (grid 2 columns) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredHistory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredHistory.map((item, idx) => (
                      <ReadingHistoryCard
                        key={`${item.manga.id}-${idx}`}
                        item={item}
                        onClick={handleMangaClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8 text-xs text-gray-400">
                    <div className="p-4 bg-gray-900 rounded-full mb-4">
                      <History className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      No Reading History
                    </h3>
                    <p className="mb-4 max-w-xs">
                      {readHistory.length === 0
                        ? 'Start reading some manga to see your progress here!'
                        : 'No manga match your current filters. Try adjusting your search criteria.'}
                    </p>
                    <button
                      onClick={() => router.push('/search')}
                      className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 font-semibold rounded-lg shadow-md transition-all"
                    >
                      <Search className="w-4 h-4 inline mr-1" />
                      Discover Manga
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className=' grid grid-cols-2 border gap-2 border-white/5 px-4 rounded-xl'>
              {/* Search History Section */}
              <div className=" h-fit  rounded-xl   flex-1 flex flex-col shadow-lg">
                <div className="flex mb-5 gap-3 mt-4 items-center justify-between">
                  <div className="flex items-center gap-3 justify-between">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <Search className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-gray-100">Search History</h2>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wide">Your Search History</p>
                    </div>
                  </div>
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 bg-gray-900/80 p-1 px-3 rounded-full border border-gray-800">
                    <div>{searchHistory.length}</div>
                  </div>
                </div>

                <div className="flex-1">
                  {searchHistory.length > 0 ? (
                    <div className="flex min-h-fit flex-wrap gap-1 max-h-44 overflow-y-scroll  custom-scrollbar ">
                      {searchHistory.slice(0, 10).map((query, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSearchClick(query)}
                          className="w-fit flex items-center gap-2 p-2 px-3 bg-gray-950 hover:bg-gray-900 border border-gray-900 rounded-lg text-left transition-colors duration-200 text-xs text-gray-400 hover:text-gray-300"
                        >
                          <Search className="w-3 h-3" />
                          <span className="truncate flex-1">{query}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-6 text-gray-400 text-xs">
                      <div className="p-3 bg-gray-900 rounded-full mb-3">
                        <Search className="w-6 h-6" />
                      </div>
                      <p>No search history</p>
                      <p className="mt-1 text-gray-600 text-xs">Your searches will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              {/* curently reading/selected */}
              {selectedManga &&
                <div
                  className="w-full mb-10 md:mb-0 border-l-[1px] border-white/5  p-4 py-0 shadow-xl"
                >
                  <div className="flex items-center mt-4 gap-3 mb-5">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <Pin className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-gray-100">Currently Selected</h2>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wide">Your Last visited Manga</p>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="group  flex items-center md:gap-1 cursor-pointer rounded-lg   transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 "
                  >

                    {/* Cover */}
                    <div className="flex-shrink-0 mb-6  w-10 h-12 md:w-12 md:h-12 rounded-full overflow-hidden shadow-md">
                      <Image
                        width={48}
                        height={64}
                        src={selectedManga.coverImageUrl || '/placeholder.jpg'}
                        alt={`Cover for ${selectedManga.title || 'unknown manga'}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[102%]"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => (e.target.src = '/placeholder.jpg')}
                      />
                    </div>

                    {/* Title & Stats */}
                    <div className="flex flex-col ml-1 md:ml-3 flex-1 min-w-0">
                      <h3
                        className="text-gray-100 text-xs md:text-base font-semibold truncate"
                        title={selectedManga.title}
                      >
                        {selectedManga.title || 'Untitled Manga'}
                      </h3>
                      <div className='flex flex-row w-full gap-4 mb-6'>
                        <div className="flex items-center gap-1 md:gap-1 mt-1 text-xs text-gray-400">
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded-full  text-indigo-400"
                          >
                            <Star className="w-4 h-4" />
                          </span>
                          <span className="font-medium text-gray-300">{selectedManga?.rating?.rating?.bayesian.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1 mt-1 text-xs text-gray-400">
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded-full  text-indigo-400"
                          >
                            <UserPlus className="w-4 h-4" />
                          </span>
                          <span className="font-medium text-gray-300">{selectedManga?.rating?.follows}</span>
                        </div>
                      </div>
                      {/* <div className=' flex gap-1 w-full line-clamp-1'>
                      {selectedManga.flatTags.slice(0, 4).map((tag) => (
                        <div key={tag} className="flex px-2 py-1 min-w-fit items-center w-fit gap-1 md:gap-1 text-[10px] rounded-lg bg-gray-600/20 text-gray-400">
                          <span className="font-medium text-gray-300">{tag}</span>
                        </div>
                      ))}
                    </div> */}
                    </div>
                  </div>
                </div>}
            </div>
          </div>

          {/* Right Sidebar - Bookmarks (3 per row), Favorites, Search History */}
          <div className="col-span-12 lg:col-span-3 bg-black/30 backdrop-blur-xl flex flex-col gap-4 overflow-hidden rounded-xl p-4 border-[1px] border-white/10">

            {/* BookMarks section  */}
            <section
              aria-label="Manga list"
              className="w-full mb-10 md:mb-0  rounded-xl  shadow-xl"
            >
              <div className="flex mb-7 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-100">BookMarked Mangas</h2>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide">Book marked manga collections</p>
                  </div>
                </div>
                <div className=' bg-white/10 rounded-full p-1 px-3'>{bookmarks.length}</div>
              </div>

              {/* Manga List */}
              <ul className="w-full gap-2 flex flex-col max-h-[170px] overflow-y-auto custom-scrollbar">
                {bookmarks.slice(0, 9).map((manga, idx) => (
                  <li
                    key={manga.manga.id}
                    tabIndex={0}
                    className="group border-l-8 border-purple-950 pl-3 mr-3 flex items-center md:gap-1 cursor-pointer rounded-lg  py-2 transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 hover:bg-gray-800/50"
                    aria-label={`${manga.manga.title} - Bookmarked`}
                  >

                    {/* Cover */}
                    <div className="flex-shrink-0  w-10 h-12 md:w-12 md:h-16 rounded-md overflow-hidden shadow-md">
                      <Image
                        width={48}
                        height={64}
                        src={manga.manga.coverImageUrl || '/placeholder.jpg'}
                        alt={`Cover for ${manga.manga.title || 'unknown manga'}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[102%]"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => (e.target.src = '/placeholder.jpg')}
                      />
                    </div>

                    {/* Title & Stats */}
                    <div className="flex flex-col ml-1 md:ml-3 flex-1 min-w-0">
                      <h3
                        className="text-gray-100 text-xs md:text-base font-semibold truncate"
                        title={manga.manga.title}
                      >
                        {manga.manga.title || 'Untitled Manga'}
                      </h3>

                      <div className="flex items-center gap-1 md:gap-1 mt-1 text-xs text-gray-400">
                        <span
                          className="flex items-center justify-center w-5 h-5 rounded-full  text-indigo-400"
                        >
                          <Bookmark className="w-4 h-4" />
                        </span>
                        <span className="font-medium text-gray-300">{new Date(manga.bookmarkedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <RightSidebar
              favorites={favorites}
              searchHistory={searchHistory}
              onMangaClick={handleMangaClick}
              onSearchClick={handleSearchClick}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Library;