import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/approvals - Get all approvals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const requestedBy = searchParams.get('requestedBy');

    const where: any = {};
    if (status) where.status = status;
    if (requestedBy) where.requestedBy = requestedBy;

    const approvals = await prisma.approval.findMany({
      where,
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        submission: {
          select: {
            id: true,
            form: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        requestedAt: 'desc',
      },
    });

    return NextResponse.json(approvals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch approvals' },
      { status: 500 }
    );
  }
}

// POST /api/approvals - Create a new approval request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, submissionId, requestedBy, level } = body;

    if (!title || !requestedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const approval = await prisma.approval.create({
      data: {
        title,
        description,
        submissionId,
        requestedBy,
        level: level || 1,
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(approval, { status: 201 });
  } catch (error) {
    console.error('Error creating approval:', error);
    return NextResponse.json(
      { error: 'Failed to create approval' },
      { status: 500 }
    );
  }
}
