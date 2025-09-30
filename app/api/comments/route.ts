import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const thread = searchParams.get('thread') || 'general';
    const repliesCount = parseInt(searchParams.get('repliesCount') || '5', 10);

    try {
        // Simple mock comments
        const mockComments = [];
        const authors = [
            "MangaExpert2024", "OtakuReader", "ChapterAnalyst", "StoryLover",
            "ArtAppreciator", "PlotTheorist", "CharacterFan", "SeriesFollower"
        ];
        
        const commentTemplates = [
            "This chapter was absolutely incredible!",
            "I love how the story is progressing.",
            "The art style never fails to amaze me.",
            "Such an emotional chapter.",
            "The plot twists keep getting better!",
            "Amazing work by the team.",
            "This series deserves more recognition.",
            "The world-building is phenomenal."
        ];

        for (let i = 0; i < Math.min(repliesCount, 8); i++) {
            mockComments.push({
                id: i + 1,
                author: authors[i % authors.length],
                content: commentTemplates[i % commentTemplates.length],
                timestamp: new Date(Date.now() - (i * 900000)).toISOString(), // 15 minutes apart
                likes: Math.floor(Math.random() * 50) + 5,
                replies: Math.floor(Math.random() * 10),
                threadId: thread
            });
        }

        return NextResponse.json({
            status: "success",
            data: mockComments,
            total: mockComments.length,
            timestamp: new Date().toISOString(),
            thread: thread,
            repliesCount: repliesCount
        });

    } catch (error) {
        console.error('Comments API Error:', error);
        
        return NextResponse.json({
            status: "error",
            data: [],
            total: 0,
            timestamp: new Date().toISOString(),
            error: 'Failed to fetch comments',
            thread: thread,
            repliesCount: repliesCount
        }, { status: 500 });
    }
}