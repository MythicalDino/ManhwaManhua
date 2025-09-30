import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Simple mock data for Latest Community Activity
        const mockActivity = [
            {
                id: 1,
                mangaTitle: "One Piece",
                chapter: "Chapter 1100",
                volume: "Vol. 108", 
                chapterTitle: "Thank You, Bonney",
                commentAuthor: "PirateKing2024",
                originalPostAuthor: "Official Scans",
                threadUrl: "#",
                timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
                content: "Incredible chapter! Oda never fails to deliver emotional moments.",
                likes: 45,
                replies: 12
            },
            {
                id: 2,
                mangaTitle: "Jujutsu Kaisen",
                chapter: "Chapter 245",
                volume: "Vol. 28",
                chapterTitle: "The Final Battle Begins",
                commentAuthor: "SorcererFan",
                originalPostAuthor: "Translation Team",
                threadUrl: "#",
                timestamp: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
                content: "The art in this chapter is absolutely stunning!",
                likes: 38,
                replies: 8
            },
            {
                id: 3,
                mangaTitle: "Attack on Titan",
                chapter: "Chapter 139",
                volume: "Vol. 34",
                chapterTitle: "Toward the Tree on That Hill",
                commentAuthor: "TitanSlayer",
                originalPostAuthor: "Final Chapter Team",
                threadUrl: "#",
                timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                content: "What an ending! This series will be remembered forever.",
                likes: 156,
                replies: 34
            },
            {
                id: 4,
                mangaTitle: "Demon Slayer",
                chapter: "Chapter 205",
                volume: "Vol. 23",
                chapterTitle: "Life Shining Across the Years",
                commentAuthor: "BreathingTechnique",
                originalPostAuthor: "Kimetsu Scans",
                threadUrl: "#",
                timestamp: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
                content: "Beautiful conclusion to an amazing journey.",
                likes: 89,
                replies: 21
            },
            {
                id: 5,
                mangaTitle: "My Hero Academia",
                chapter: "Chapter 408",
                volume: "Vol. 40",
                chapterTitle: "The Final Act",
                commentAuthor: "PlusUltra",
                originalPostAuthor: "Hero Scans",
                threadUrl: "#",
                timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
                content: "Deku's character development has been incredible!",
                likes: 67,
                replies: 15
            }
        ];

        return NextResponse.json({
            status: "success",
            data: mockActivity,
            total: mockActivity.length,
            message: "Latest community activity loaded successfully",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Latest Activity API Error:', error);
        
        return NextResponse.json({
            status: "error",
            error: "Failed to fetch latest activity",
            message: "Service temporarily unavailable",
            timestamp: new Date().toISOString(),
            data: []
        }, { status: 500 });
    }
}