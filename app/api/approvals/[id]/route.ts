import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/approvals/[id] - Get a specific approval
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const approval = await prisma.approval.findUnique({
      where: { id },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        submission: {
          include: {
            form: true,
          },
        },
      },
    });

    if (!approval) {
      return NextResponse.json(
        { error: 'Approval not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(approval);
  } catch (error) {
    console.error('Error fetching approval:', error);
    return NextResponse.json(
      { error: 'Failed to fetch approval' },
      { status: 500 }
    );
  }
}

// PUT /api/approvals/[id] - Update approval (approve/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, approverId, comments } = body;

    if (!status || !approverId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "approved" or "rejected"' },
        { status: 400 }
      );
    }

    const approval = await prisma.approval.update({
      where: { id },
      data: {
        status,
        approverId,
        comments,
        respondedAt: new Date(),
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

    return NextResponse.json(approval);
  } catch (error) {
    console.error('Error updating approval:', error);
    return NextResponse.json(
      { error: 'Failed to update approval' },
      { status: 500 }
    );
  }
}
