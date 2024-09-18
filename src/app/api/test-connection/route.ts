import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

// GET handler
export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');

    if (!tag) {
        return NextResponse.json({ error: 'Tag parameter is required' }, { status: 400 });
    }

    try {
        const entry = await db.event.findFirst({
            where: {
                tag,
                type: 'ScriptInitialized'
            }
        });

        if (entry) {
            return NextResponse.json({ success: true, message: 'Script has been initialized successfully.' });
        } else {
            return NextResponse.json({ success: false, message: 'Script initialization failed.' });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error testing connection' }, { status: 500 });
    }
}