import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return new NextResponse('Missing email or password', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: email === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER',
      },
    });

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}