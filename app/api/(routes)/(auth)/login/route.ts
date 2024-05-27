import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'
import { getAccountByToken } from "@/app/api/actions/jwt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        const validation = LogginAccountFormSchema.safeParse({ email, password })

        if (!validation.success) return NextResponse.json({ message: 'Не верные данные' }, { status: 400 })

        const client = await clientPromise
        const db = client.db('test')

        const user = await db.collection('users').findOne({ email })

        if (!user) return NextResponse.json({ message: 'Пользователь не найден' }, { status: 400 })

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) return NextResponse.json({ message: 'Не верный пароль' }, { status: 400 })

        return NextResponse.json({ message: 'Успешный вход' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }
} 