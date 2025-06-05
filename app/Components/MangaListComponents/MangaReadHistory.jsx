import React, { useState, useEffect, useCallback } from 'react';
import { useManga } from '../../providers/MangaContext';
import { BookOpen, ChevronDown, ChevronUp, Clock, TrendingUp, Eye, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function MangaReadHistory() {
    const { getAllFromReadHistory, addToReadHistory, setChapterListForManga } = useManga();
    const [readHistory, setReadHistory] = useState([]);
    const router = useRouter();
    const [shownMangasInHistory, setShownMangasInHistory] = useState(2);
    const [isExpanded, setIsExpanded] = useState(false);
    const { setSelectedManga } = useManga();

    useEffect(() => {
        const history = getAllFromReadHistory();
        setReadHistory(history || []);
    }, [getAllFromReadHistory]);

    const handleMangaCoverImageClicked = useCallback(
        (manga) => {
            setSelectedManga(manga);
            router.push(`/manga/${manga.id}/chapters`);
        },
        [router, setSelectedManga]
    );

    const handleChapterClicked = useCallback(
        (manga, chapter, allChaptersList) => {
            setChapterListForManga(manga.id, allChaptersList);
            addToReadHistory(manga, chapter, allChaptersList);
            router.push(`/manga/${manga.id}/chapter/${chapter.id}/read`);
        },
        [router, setChapterListForManga, addToReadHistory]
    );

    const handleToggleExpand = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        setShownMangasInHistory(newExpanded ? readHistory.length : 2);
    };

    const calculateProgress = (item) => {
        if (!item.allChaptersList || !item.chapters || item.allChaptersList.length === 0) {
            return { percentage: 0, current: 0, total: 0 };
        }

        const totalChapters = item.allChaptersList.length;
        const currentChapter = item.chapters[0]?.chapter || 0;
        const percentage = Math.min((currentChapter / totalChapters) * 100, 100);

        return {
            percentage: Math.round(percentage),
            current: currentChapter,
            total: totalChapters,
        };
    };

    return (
        <div className="w-[100% -12px] mx-2 md:ml-2 md:px-6 mb-6">
            {/* Header */}
            <div className="flex mb-7 items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-3 rounded-lg">< BookOpenCheck className={`w-6 h-6 text-cyan-300 drop-shadow-md`} /></div>
                    <div className='leading-5 sm:leading-normal mt-1 sm:mt-0'>
                        <h2 className="text-[18px] md:text-lg font-semibold text-white">READ HISTORY</h2>
                        {readHistory.length > 0 && (<p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wide">{readHistory.length} Mangas in your history</p>)}
                    </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-3.5 rounded-md text-gray-300 text-sm hover:text-white hover:bg-gray-800/50 transition-all duration-200 border border-gray-700/50">
                    <Eye className="w-4 h-4" />
                    View All
                </button>
            </div>


            {/* Content */}
            <div className="space-y-4">
                {readHistory.length === 0 ? (
                    <div className="flex flex-col items-center sm:ml-2 mt-4 md:mt-11 justify-center py-6 md:py-16 px-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl backdrop-blur-sm relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg md:rounded-full flex items-center justify-center mb-3 md:mb-6 shadow-lg">
                                <BookOpen className="w-10 h-10 text-purple-400" />
                            </div>
                            <h3 className=" text-lg md:text-xl font-semibold text-gray-200 mb-1 md:mb-3">No Reading History Yet</h3>
                            <p className="text-gray-400  text-center text-[10px] md:text-sm max-w-sm leading-relaxed mb-4">
                                Start your manga journey and build your personalized reading history
                            </p>
                            <div className="items-center gap-2 hidden sm:flex text-xs text-gray-500">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Track your progress automatically</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desktop & Tablet View */}
                        <div className="hidden sm:block space-y-3">
                            {readHistory
                                .sort((item1, item2) => new Date(item2.lastReadAT) - new Date(item1.lastReadAT))
                                .slice(0, shownMangasInHistory)
                                .map((item, index) => {
                                    const progress = calculateProgress(item);
                                    return (
                                        <div
                                            key={item.manga.id}
                                            className="group relative rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            {/* Background gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="relative flex items-center p-2 gap-3">
                                                {/* Manga Cover */}
                                                <div
                                                    onClick={() => handleMangaCoverImageClicked(item.manga)}
                                                    className="relative cursor-pointer group/cover flex-shrink-0"
                                                >
                                                    <div className="relative w-20 h-24 rounded-md overflow-hidden group-hover/cover:border-purple-500/50 transition-colors duration-200 shadow-lg">
                                                        <Image
                                                            width={64}
                                                            height={80}
                                                            src={item.manga.coverImageUrl}
                                                            alt={item.manga.title}
                                                            className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2NCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0zMiA0MEwyOCAzNkwyOCA0NEwzMiA0MFoiIGZpbGw9IiM2QjczODAiLz4KPC9zdmc+';
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                            <Eye className="w-6 h-6 text-white/80" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Manga Info */}
                                                <div className="flex-1 min-w-0 space-y-2">
                                                    <div className="flex flex-row gap-3 w-full items-center justify-between">
                                                        <div className="flex flex-col w-full items-start justify-between space-y-2">
                                                            <h3
                                                                onClick={() => handleMangaCoverImageClicked(item.manga)}
                                                                className="font-semibold text-white text-sm mb-1 line-clamp-1 cursor-pointer hover:text-purple-300 transition-colors duration-200"
                                                            >
                                                                {item.manga.title}
                                                            </h3>

                                                            {/* Chapter Action Button */}
                                                            <div className="flex-shrink-0">
                                                                {/* Last Read Chapter */}
                                                                {item.chapters?.slice(0, 1).map((chapter) => (
                                                                    <div
                                                                        key={chapter.id}
                                                                        onClick={() =>
                                                                            handleChapterClicked(item.manga, chapter, item.allChaptersList)
                                                                        }
                                                                        className="flex items-center gap-2 cursor-pointer group/chapter mb-2"
                                                                    >
                                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 group-hover/chapter:text-purple-300 transition-colors duration-200">
                                                                            <Clock className="w-3 h-3" />
                                                                            <span>Chapter {chapter.chapter}</span>
                                                                        </div>
                                                                        <div className="w-1 h-1 bg-gray-600 rounded-full" />
                                                                        <span className="text-xs text-gray-500">
                                                                            {/* Time ago logic */}
                                                                            {(() => {
                                                                                const readableAt = new Date(item.lastReadAT);
                                                                                const now = new Date();
                                                                                const diffInMs = now - readableAt;
                                                                                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                                                                                const diffInMonths = Math.floor(diffInDays / 30);
                                                                                const diffInYears = Math.floor(diffInDays / 365);
                                                                                const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                                                                                const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                                                                                const diffInSeconds = Math.floor(diffInMs / 1000);

                                                                                if (diffInYears >= 1) {
                                                                                    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
                                                                                } else if (diffInMonths >= 1) {
                                                                                    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
                                                                                } else if (diffInDays >= 1) {
                                                                                    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                                                                                } else if (diffInHours >= 1) {
                                                                                    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                                                                                } else if (diffInMinutes >= 1) {
                                                                                    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
                                                                                } else {
                                                                                    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
                                                                                }
                                                                            })()}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="relative w-fit flex justify-end h-full">
                                                            {item.chapters?.slice(0, 1).map((chapter) => (
                                                                <button
                                                                    key={chapter.id}
                                                                    onClick={() =>
                                                                        handleChapterClicked(item.manga, chapter, item.allChaptersList)
                                                                    }
                                                                    className="group/btn h-full w-20 relative px-4 py-5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm overflow-hidden"
                                                                >
                                                                    <div className="absolute w-full inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                                                                    <span className="relative flex items-center gap-1.5">
                                                                        <Eye className="w-3.5 h-3.5" />
                                                                        Read
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Progress Bar */}
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-gray-400">
                                                                Progress: {progress.current}/{progress.total} chapters
                                                            </span>
                                                            <span className="text-white font-medium">{progress.percentage}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className="h-full bg-gray-200 rounded-full transition-all duration-500 ease-out relative"
                                                                style={{ width: `${progress.percentage}%` }}
                                                            >
                                                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Mobile View: Only cover image and title */}
                        <div className="flex sm:hidden gap-2 overflow-x-auto pb-4">
                            {readHistory
                                .sort((item1, item2) => new Date(item2.lastReadAT) - new Date(item1.lastReadAT))
                                .map((item) => (
                                    <div
                                        key={item.manga.id}
                                        className="flex-shrink-0 w-24 cursor-pointer"
                                        onClick={() => handleMangaCoverImageClicked(item.manga)}
                                    >
                                        <div className="relative w-24 h-32 border border-white/30 shadow-sm shadow-yellow-400  rounded overflow-hidden">
                                            <Image
                                                src={item.manga.coverImageUrl}
                                                alt={item.manga.title}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2NCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0zMiA0MEwyOCAzNkwyOCA0NEwzMiA0MFoiIGZpbGw9IiM2QjczODAiLz4KPC9zdmc+';
                                                }}
                                            />
                                        </div>
                                        <h3 className="mt-2 text-[10px] font-semibold text-white line-clamp-2 text-center">
                                            {item.manga.title}
                                        </h3>
                                    </div>
                                ))}
                        </div>

                        {/* Expand/Collapse Button */}
                        {readHistory.length > 2 && (
                            <button
                                onClick={handleToggleExpand}
                                className="w-full hidden sm:flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-300 hover:bg-gray-800/30 rounded-lg transition-all duration-200"
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        <span>Show less</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        <span>Show more</span>
                                    </>
                                )}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default React.memo(MangaReadHistory);