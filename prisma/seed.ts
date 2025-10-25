import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@workflowpro.com' },
    update: {},
    create: {
      email: 'admin@workflowpro.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@workflowpro.com' },
    update: {},
    create: {
      email: 'manager@workflowpro.com',
      name: 'Manager User',
      password: hashedPassword,
      role: 'manager',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@workflowpro.com' },
    update: {},
    create: {
      email: 'user@workflowpro.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'user',
    },
  });

  console.log('✓ Created users');

  // Create forms
  const leaveRequestForm = await prisma.form.create({
    data: {
      title: 'Employee Leave Request',
      description: 'Submit a leave request for approval',
      status: 'published',
      createdBy: admin.id,
      fields: JSON.stringify([
        { id: '1', type: 'text', label: 'Employee Name', required: true },
        {
          id: '2',
          type: 'dropdown',
          label: 'Leave Type',
          required: true,
          options: ['Sick Leave', 'Vacation', 'Personal', 'Other'],
        },
        { id: '3', type: 'date', label: 'Start Date', required: true },
        { id: '4', type: 'date', label: 'End Date', required: true },
        { id: '5', type: 'textarea', label: 'Reason', required: true },
      ]),
    },
  });

  const expenseForm = await prisma.form.create({
    data: {
      title: 'Expense Reimbursement',
      description: 'Submit expenses for reimbursement',
      status: 'published',
      createdBy: admin.id,
      fields: JSON.stringify([
        { id: '1', type: 'text', label: 'Employee Name', required: true },
        {
          id: '2',
          type: 'dropdown',
          label: 'Expense Category',
          required: true,
          options: ['Travel', 'Meals', 'Office Supplies', 'Client Entertainment'],
        },
        { id: '3', type: 'number', label: 'Amount', required: true },
        { id: '4', type: 'date', label: 'Expense Date', required: true },
        { id: '5', type: 'textarea', label: 'Description', required: true },
        { id: '6', type: 'file', label: 'Receipt', required: false },
      ]),
    },
  });

  console.log('✓ Created forms');

  // Create workflows
  const leaveWorkflow = await prisma.workflow.create({
    data: {
      name: 'Leave Approval Workflow',
      description: 'Automated leave request approval process',
      status: 'active',
      formId: leaveRequestForm.id,
      createdBy: admin.id,
      nodes: JSON.stringify([
        {
          id: '1',
          type: 'trigger',
          data: { label: 'Form Submitted' },
          position: { x: 100, y: 100 },
        },
        {
          id: '2',
          type: 'action',
          data: { label: 'Create Task' },
          position: { x: 300, y: 100 },
        },
        {
          id: '3',
          type: 'approval',
          data: { label: 'Manager Approval' },
          position: { x: 500, y: 100 },
        },
        {
          id: '4',
          type: 'end',
          data: { label: 'Complete' },
          position: { x: 700, y: 100 },
        },
      ]),
      edges: JSON.stringify([
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
      ]),
    },
  });

  console.log('✓ Created workflows');

  // Create form submissions
  const submission1 = await prisma.formSubmission.create({
    data: {
      formId: leaveRequestForm.id,
      submittedBy: user.id,
      status: 'submitted',
      data: JSON.stringify({
        employeeName: 'Regular User',
        leaveType: 'Vacation',
        startDate: '2025-11-01',
        endDate: '2025-11-05',
        reason: 'Family vacation trip',
      }),
    },
  });

  const submission2 = await prisma.formSubmission.create({
    data: {
      formId: expenseForm.id,
      submittedBy: user.id,
      status: 'submitted',
      data: JSON.stringify({
        employeeName: 'Regular User',
        expenseCategory: 'Travel',
        amount: 250.50,
        expenseDate: '2025-10-20',
        description: 'Client meeting travel expenses',
      }),
    },
  });

  console.log('✓ Created submissions');

  // Create approvals
  await prisma.approval.create({
    data: {
      title: 'Leave Request - Regular User',
      description: 'Vacation leave for 5 days',
      submissionId: submission1.id,
      requestedBy: user.id,
      status: 'pending',
      level: 1,
    },
  });

  await prisma.approval.create({
    data: {
      title: 'Expense Reimbursement - Regular User',
      description: 'Travel expenses $250.50',
      submissionId: submission2.id,
      requestedBy: user.id,
      approverId: manager.id,
      status: 'approved',
      comments: 'Approved - Valid business expense',
      respondedAt: new Date(),
      level: 1,
    },
  });

  console.log('✓ Created approvals');

  // Create workflow executions
  await prisma.workflowExecution.create({
    data: {
      workflowId: leaveWorkflow.id,
      status: 'completed',
      completedAt: new Date(),
      logs: JSON.stringify([
        { step: 'Form Submitted', timestamp: new Date(), status: 'success' },
        { step: 'Task Created', timestamp: new Date(), status: 'success' },
        { step: 'Approval Sent', timestamp: new Date(), status: 'success' },
      ]),
    },
  });

  console.log('✓ Created workflow executions');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📧 Test Users:');
  console.log('  Admin: admin@workflowpro.com / password123');
  console.log('  Manager: manager@workflowpro.com / password123');
  console.log('  User: user@workflowpro.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
