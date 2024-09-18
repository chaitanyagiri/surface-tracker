import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

// Function to validate the request body
function validateRequestBody(body: any) {
    const { type, visitor, metadata, createdAt, tag, url } = body || {};

    if (!visitor) {
        throw new Error('Visitor is required');
    }
    if (!metadata) {
        throw new Error('Metadata is required');
    }
    if (!createdAt) {
        throw new Error('CreatedAt is required');
    }
    if (!tag) {
        throw new Error('Tag is required');
    }

    return { type: type || 'page_view', visitor, metadata, createdAt, tag, url };
}

// POST handler
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { type, visitor, metadata, createdAt, tag, url } = validateRequestBody(body);

        const newEvent = await db.event.create({
            data: { type, visitor, metadata, createdAt, tag, url },
        });

        return NextResponse.json(newEvent);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// GET handler
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const { searchParams } = new URL(req.url);
        const tag = searchParams.get('tag');    
        const events = await db.event.findMany({
            where: {
                tag,
            }
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching events' }, { status: 500 });
    }
}