/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const thread = searchParams.get('thread');
    const repliesCount = parseInt(searchParams.get('repliesCount') || '0', 10);

    try {
        // Mock comments data based on thread parameter
        const generateMockComments = (threadId: string, count: number) => {
            const comments = [];
            const authors = [
                "MangaExpert2024", "OtakuReader", "ChapterAnalyst", "StoryLover",
                "ArtAppreciator", "PlotTheorist", "CharacterFan", "SeriesFollower"
            ];
            
            const commentTemplates = [
                "This chapter was absolutely incredible! The character development is top-notch.",
                "I love how the story is progressing. Can't wait for the next release!",
                "The art style in this series never fails to amaze me.",
                "Such an emotional chapter. The author really knows how to tug at heartstrings.",
                "The plot twists keep getting better and better!",
                "Amazing work by the translation team as always.",
                "This series deserves more recognition. Highly recommend!",
                "The world-building in this manga is phenomenal."
            ];

            for (let i = 0; i < Math.min(count, 10); i++) {
                comments.push({
                    id: i + 1,
                    author: authors[i % authors.length],
                    content: commentTemplates[i % commentTemplates.length],
                    timestamp: new Date(Date.now() - (i * 1000 * 60 * 15)).toISOString(), // 15 minutes apart
                    likes: Math.floor(Math.random() * 50) + 5,
                    replies: Math.floor(Math.random() * 10),
                    threadId: threadId,
                    isVerified: Math.random() > 0.7 // 30% chance of verified user
                });
            }
            
            return comments;
        };

        const mockComments = generateMockComments(thread || 'general', repliesCount || 5);

        return NextResponse.json({
            status: "success",
            data: mockComments,
            total: mockComments.length,
            timestamp: new Date().toISOString(),
            source: 'Demo Comments (Vercel Compatible)',
            message: 'Comments loaded successfully',
            thread: thread || 'general',
            repliesCount: repliesCount,
            note: "Real-time forum comments are disabled in serverless environment. Showing demo data."
        });

    } catch (error: any) {
        console.error('Comments API Error:', error);
        
        return NextResponse.json({
            status: "error",
            data: [],
            total: 0,
            timestamp: new Date().toISOString(),
            source: 'Error Fallback',
            error: 'Failed to fetch comments',
            message: error.message || 'Comments feature temporarily unavailable.',
            thread: thread || 'unknown',
            repliesCount: repliesCount || 0
        }, { status: 500 });
    }
}