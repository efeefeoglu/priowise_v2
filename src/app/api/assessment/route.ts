import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAssessment } from '@/lib/assessment-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const assessment = await getAssessment(user.id);
    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
