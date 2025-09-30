/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

// Simplified version for Vercel deployment without Puppeteer
export async function GET() {
    try {
        // For Vercel deployment, we'll return mock data or use a different approach
        // since Puppeteer doesn't work well in serverless environment
        
        const mockComments = [
            {
                id: 1,
                mangaTitle: "One Piece",
                chapter: "Chapter 1100",
                volume: "Vol. 108",
                chapterTitle: "Thank You, Bonney",
                commentAuthor: "MangaFan123",
                originalPostAuthor: "Translator Team",
                threadUrl: "https://forums.mangadex.org/threads/one-piece.123/",
                timestamp: new Date().toISOString(),
                content: "Great chapter! The emotional moments were perfectly executed."
            },
            {
                id: 2,
                mangaTitle: "Attack on Titan",
                chapter: "Chapter 139",
                volume: "Vol. 34",
                chapterTitle: "Final Chapter",
                commentAuthor: "AOTReader",
                originalPostAuthor: "Official Release",
                threadUrl: "https://forums.mangadex.org/threads/attack-on-titan.456/",
                timestamp: new Date().toISOString(),
                content: "What an incredible ending to this amazing series!"
            },
            {
                id: 3,
                mangaTitle: "Demon Slayer",
                chapter: "Chapter 205",
                volume: "Vol. 23",
                chapterTitle: "Life Shining Across the Years",
                commentAuthor: "KimetsuFan",
                originalPostAuthor: "Scan Team",
                threadUrl: "https://forums.mangadx.org/threads/demon-slayer.789/",
                timestamp: new Date().toISOString(),
                content: "Beautiful conclusion to Tanjiro's journey."
            }
        ];

        return NextResponse.json({
            status: "success",
            data: mockComments,
            message: "Latest activity loaded (demo data for Vercel deployment)",
            timestamp: new Date().toISOString(),
            source: "mock_data"
        });

    } catch (error: any) {
        console.error('Latest Activity API Error:', error);
        
        return NextResponse.json({
            status: "error",
            error: "Failed to fetch latest activity",
            message: "Web scraping is not available in serverless environment. Using fallback data.",
            details: error.message,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
