/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const thread = searchParams.get('thread');
    const repliesCount = parseInt(searchParams.get('repliesCount') || '0', 10);

    try {
        // For Vercel deployment, return mock comments data
        const mockComments = [
            {
                id: 1,
                author: "MangaReader123",
                content: "Great chapter! The art style is amazing.",
                timestamp: "2024-01-15T10:30:00Z",
                likes: 15,
                replies: 3
            },
            {
                id: 2,
                author: "OtakuFan456",
                content: "I love how the story is developing. Can't wait for the next chapter!",
                timestamp: "2024-01-15T11:45:00Z",
                likes: 8,
                replies: 1
            },
            {
                id: 3,
                author: "MangaExpert",
                content: "The character development in this series is top-notch.",
                timestamp: "2024-01-15T12:20:00Z",
                likes: 22,
                replies: 5
            }
        ];

        return NextResponse.json({
            data: mockComments,
            total: mockComments.length,
            timestamp: new Date().toISOString(),
            source: 'Demo Comments (Vercel Compatible)',
            message: 'Web scraping disabled in serverless environment. Showing demo data.',
            thread: thread || 'demo',
            repliesCount: repliesCount
        });

    } catch (error: any) {
        console.error('Comments API Error:', error);
        
        return NextResponse.json({
            data: [],
            total: 0,
            timestamp: new Date().toISOString(),
            source: 'Error Fallback',
            error: 'Failed to fetch comments',
            message: 'Comments feature temporarily unavailable in serverless environment.'
        }, { status: 500 });
    }
}