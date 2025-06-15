import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import {
  Book,
  Users,
  Eye,
  Star,
  BookOpen,
  Library,
  List,
  UserPlus,
  ChevronUp,
  ChevronDown,
    ShoppingCart,
    BookMarked,
} from 'lucide-react';
import { getRatingColor } from "../../constants/Flags"
import StableFlag from "../StableFlag";
const MemoStableFlag = React.memo(StableFlag);
const MangaDetail = ({ manga, handleChapterClick, chapters }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToLibrary = () => {
    alert('Added to library!');
  };


      const websiteNames = {
        al: "AniList",
        amz: "Amazon",
        bw: "BookWalker",
        ebj: "eBookJapan",
        mal: "MyAnimeList",
        mu: "MangaUpdates",
        ap: "Anime Planet",
        nu: "Novel Updates",
        kt: "MangaDex",
        raw: "Raw",
        cdj: "CDJapan",
        yen: "YEN Press",
    };

    const getFullLink = (key, link) =>
    ({
        mu: `https://www.mangaupdates.com/${link}`,
        mal: `https://myanimelist.net/manga/${link}`,
        bw: `https://bookwalker.jp/${link}`,
        ap: `https://www.anime-planet.com/${link}`,
        nu: `https://www.novelupdates.com/${link}`,
        kt: `https://mangadex.org/title/${manga.id}/${link}`,
        al: `https://anilist.co/manga/${link}`,
    }[key] || link);

    const iconMap = {
        raw: <Book className="w-4 h-4 mr-2 text-white" />,
        bw: <BookOpen className="w-4 h-4 mr-2 text-white" />,
        amz: <ShoppingCart className="w-4 h-4 mr-2 text-white" />,
        ebj: <Book className="w-4 h-4 mr-2 text-white" />,
        cdj: <Library className="w-4 h-4 mr-2 text-white" />,
        mu: <BookMarked className="w-4 h-4 mr-2 text-white" />,
        ap: <Library className="w-4 h-4 mr-2 text-white" />,
        al: <Book className="w-4 h-4 mr-2 text-white" />,
        mal: <Library className="w-4 h-4 mr-2 text-white" />,
    };
  return (
    <div className="min-h-full  w-full">
      <div className="relative ">
        {/* Background Image */}
        <div
          className="absolute  inset-x-0 top-0 h-[180px] sm:h-[220px] md:h-[350px] bg-cover bg-center"
          style={{ backgroundImage: `url('${manga.coverImageUrl}')` }}
        >
          <div className="absolute inset-0 h-[180px] sm:h-[220px] md:h-[350px] bg-black/60 backdrop-blur-sm z-10"></div>
        </div>

        <main className="relative px-4 sm:px-6 md:px-10">
          <div className="relative z-10 pt-6 sm:pt-8 md:p-8 pb-0">

            {/* Mobile Layout (< 768px) */}
            <div className="block md:hidden">
              {/* Mobile Cover Image - Centered and Larger */}
              <div className="flex justify-center mb-6">
                <div className="relative w-36 h-52 sm:w-40 sm:h-56 group select-none shadow-2xl">
                  <a href={manga.coverImageUrl} className="block relative w-full h-full">
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                      <List className="text-white" size={18} />
                    </div>
                    <Image
                      className="w-full h-full rounded-lg shadow-2xl transition-transform duration-200 group-hover:scale-105 object-cover"
                      src={manga.coverImageUrl}
                      alt="Cover image"
                      width={160}
                      height={224}
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>

              {/* Mobile Title Section */}
              <div className="text-center mb-6 px-2">
                <h1 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-lg mb-2 leading-tight">
                  {manga.title}
                </h1>
                <p className="text-white/80 text-sm sm:text-base mb-3 font-medium">
                  {manga.altTitles.find(alt => alt.en)?.en || manga.altTitle}
                </p>
                <p className="text-white/70 text-sm mb-4">
                  Author: <span className="text-white font-medium">{manga.authorName.map(author => author.attributes.name).join(', ')}</span>
                </p>
              </div>

              <div className='grid grid-cols-2 w-full gap-4'>
                {/* Mobile Secondary Button */}
                <div className="mb-2 w-full">
                  <Button
                    onClick={handleAddToLibrary}
                    variant="secondary"
                    className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium py-6 rounded-lg border border-gray-600/30"
                  >
                    Add To Library
                  </Button>
                </div>
                {/* Mobile Action Button */}
                <div className="mb-6  w-full">
                  <Button
                    onClick={()=>{handleChapterClick(chapters[chapters.length-1])}}
                    variant="primary"
                    Icon={BookOpen}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 rounded-lg shadow-lg"
                  >
                    Read Latest
                  </Button>
                </div>
              </div>

              {/* Mobile Stats Row */}
              <div className="flex justify-center items-center gap-6 mb-6 px-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">{manga.rating.rating.bayesian.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1 text-white/70" />
                  <span className="text-white text-sm">{manga.rating.comments.repliesCount}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-pink-400" />
                  <span className="text-pink-400 text-sm font-semibold">{manga.rating.follows}</span>
                </div>
              </div>

              {/* Mobile Publication Info */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center text-white/60 text-sm">
                  <Book className="w-4 h-4 mr-2" />
                  <span className="uppercase font-medium">
                    Publication: {manga.year}, {manga.status}
                  </span>
                </div>
              </div>


              {/* Expandable Section */}
              <div className="px-4 mb-0">

                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                        className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded px-4 py-2 text-white hover:bg-white/20 transition-colors duration-200 w-fit mx-auto lg:mx-0"
                    >
                        <span className="text-sm font-medium">
                            {showFullDescription ? 'Show Less' : 'Show More Details'}
                        </span>
                        {showFullDescription ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                {showFullDescription && (
                  <div className="mt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {/* Tags Section */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-2 uppercase tracking-wide">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        <Tag variant={manga.contentRating.trim()} size="small" className=" text-white">
                          {manga.contentRating}
                        </Tag>
                        {manga.flatTags.slice(0, 8).map((tag, index) => (
                          <Tag key={index} size="small" className="bg-gray-700/60 text-white/90 hover:bg-gray-600/60">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-2 uppercase tracking-wide">Description</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {manga.description}
                      </p>
                    </div>
                     <div className='w-full sm:w-5/12 flex flex-wrap gap-6 sm:gap-9 h-fit'>
                                        <div className="flex flex-row gap-4 w-full">
                                            <div className='min-w-1/3'>
                                                <h3 className="text-white font-bold text-lg mb-2">Author</h3>
                                                <div className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-sm inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                    {manga.authorName[0].attributes.name}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-2">Artist</h3>
                                                <div className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-sm inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                    {manga.artistName[0].attributes.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='h-fit'>
                                            <h3 className="text-white font-bold text-lg mb-2">Genres</h3>
                                            <div className='flex gap-2 flex-wrap'>
                                                {manga.tags.find(group => group.group === 'genre')?.tags.map((genre, index) => (
                                                    <div key={index} className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-xs inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                        {genre}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="h-fit">
                                            <h3 className="text-white font-bold text-lg mb-2">Themes</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {manga.tags.find(group => group.group === 'theme')?.tags.map((theme, index) => (
                                                    <div key={index} className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-xs inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                        {theme}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="h-fit">
                                            {manga.tags.find(group => group.group === 'format')?.tags.length > 0 && (
                                                <h3 className="text-white font-bold text-lg mb-2">Format</h3>
                                            )}
                                            <div className="flex flex-wrap gap-2">
                                                {manga.tags.find(group => group.group === 'format')?.tags.map((format, index) => (
                                                    <div key={index} className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-xs inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                        {format}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="text-white font-bold text-lg mb-2">Demographic</h3>
                                            <div className='bg-white/10 backdrop-blur-md min-w-fit px-3 py-2 text-xs inline-flex items-center Capitalize rounded transition-colors duration-200'>
                                                {manga.MangaStoryType}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="text-white font-bold text-lg mb-4">Read or Buy</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {Object.entries(manga.links).map(([key, link], index) => (
                                                    key !== 'kt' && (
                                                        <a
                                                            key={index}
                                                            href={getFullLink(key, link)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-white/10 backdrop-blur-md rounded px-3 py-2 flex items-center"
                                                        >
                                                            {iconMap[key] || <Book className="w-4 h-4 mr-2 text-white" />}
                                                            <span className="text-white text-xs">{websiteNames[key]}</span>
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="text-white font-bold text-lg mb-4">Track</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {['mu', 'ap', 'al', 'mal'].map((key, index) => (
                                                    manga.links[key] && (
                                                        <a
                                                            key={index}
                                                            href={getFullLink(key, manga.links[key])}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-white/10 backdrop-blur-md rounded px-3 py-2 flex items-center"
                                                        >
                                                            {iconMap[key] || <Book className="w-4 h-4 mr-2 text-white" />}
                                                            <span className="text-white text-xs">{websiteNames[key]}</span>
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="text-white font-bold text-lg mb-4">Alternative Titles</h3>
                                            <div className="space-y-2">
                                                {manga.altTitles.map((title, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-800 transition-all duration-150"
                                                    >
                                                        <MemoStableFlag
                                                            code={Object.keys(title)[0] || "en"}
                                                            className="w-6 sm:w-8 h-6 sm:h-8 rounded-md shadow-sm"
                                                            alt="flag"
                                                        />
                                                        <span className="text-xs sm:text-sm line-clamp-1 font-medium text-gray-200">
                                                            {Object.values(title)[0]}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Layout (>= 768px) - Original Design */}
            <div className="hidden md:flex gap-8 mt-14">
              {/* Left Column - Manga Cover */}
              <div className="relative w-40 h-60 lg:w-48 lg:h-[295px] group select-none mx-auto md:mx-0">
                <a href={manga.coverImageUrl} className="block relative w-full h-full">
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
                    <List className="text-white" size={20} />
                  </div>
                  <Image
                    className="w-full h-full rounded shadow-md transition-transform duration-200 group-hover:translate-y-0 object-cover"
                    src={manga.coverImageUrl}
                    alt="Cover image"
                    width={384}
                    height={295}
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Right Column - Manga Details */}
              <div className="flex-1">
                <div className="h-72 flex justify-between flex-col">
                  <div className="flex flex-col">
                    <h1 className="text-white text-5xl lg:text-7xl line-clamp-1 max-w-[80%] font-bold drop-shadow-lg">
                      {manga.title}
                    </h1>
                    <p className="text-white text-lg mb-6 line-clamp-1 max-w-[50%]">
                      {manga.altTitles.find(alt => alt.en)?.en || manga.altTitle}
                    </p>
                  </div>
                  <p className="text-white text-base mb-8">
                    {manga.authorName.map(author => author.attributes.name).join(', ')}
                  </p>
                </div>

                <div className="flex gap-4 mb-5">
                  <Button onClick={handleAddToLibrary} variant="primary" size="large">
                    Add To Library
                  </Button>
                  <Button
                    onClick={()=>{handleChapterClick(chapters[chapters.length-1])}}
                    variant="secondary"
                    size="large"
                    Icon={BookOpen}
                  >
                    Start Reading
                  </Button>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="text-yellow-400 text-base">{manga.rating.rating.bayesian.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <UserPlus className="w-4 h-4 mr-1 text-white" />
                      <span className="text-white text-base">{manga.rating.follows}</span>
                    </div>
                    <div className="flex items-center">
                      <Library className="w-4 h-4 mr-1 text-white" />
                      <span className="text-white text-base">{manga.rating.comments.repliesCount}</span>
                    </div>
                    <div className="flex items-center ml-2">
                      <Book className="w-4 h-4 mr-2 text-white" />
                      <span className="text-white text-xs font-bold uppercase">
                        Publication: {manga.year}, {manga.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Tag variant={manga.contentRating.trim()}>{manga.contentRating}</Tag>
                  {manga.flatTags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Description */}
            <div className="hidden md:block mt-4">
              <p className="text-white text-base mb-4">
                {manga.altTitle}
              </p>
              <p className="text-white text-base leading-relaxed">
                {manga.description}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MangaDetail;

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  Icon = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none  flex items-center justify-center';

  const variants = {
    primary: 'bg-purple-900/70 text-white hover:bg-purple-950 disabled:bg-gray-400',
    secondary: 'bg-gray-600/30 text-white hover:bg-[#666666] disabled:bg-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
  };

  const sizes = {
    small: 'px-3 py-1 text-sm h-8',
    medium: 'px-4 py-2 text-base h-10',
    large: 'px-6 py-3 text-base h-12',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {Icon && <Icon alt="icon" className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

const Tag = ({
  children,
  variant,
  size = 'small',
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex bg-gray-600/30 text-white items-center font-bold uppercase rounded transition-colors duration-200';

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const tagClasses = `${baseClasses} ${getRatingColor(variant)} ${sizes[size]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`;

  return (
    <span
      onClick={onClick}
      className={tagClasses}
      {...props}
    >
      {children}
    </span>
  );
};