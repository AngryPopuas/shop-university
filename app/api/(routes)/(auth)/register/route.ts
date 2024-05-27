import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next';
import { CreateAccountFormSchema } from "@/schemas/user"
import { cookies } from 'next/headers'
import clientPromise from "@/lib/db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()
        const validation = CreateAccountFormSchema.safeParse({ name, email, password })

        if (!validation.success) return NextResponse.json({ message: 'Не верные данные' }, { status: 400 })

        const client = await clientPromise
        const db = client.db('test')

        const isEmailExist = await db.collection('users').findOne({ email })

        if (isEmailExist) return NextResponse.json({ message: 'Данная почта уже существует' }, { status: 400 })

        const hashedPassword = await bcrypt.hash(password, 10)
        const refreshToken = jwt.sign({ data: { name, email } },
            // @ts-expect-error 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        cookies().set('auth', refreshToken, { httpOnly: true })
        await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            refreshToken,
            isActivated: false,
            avatar: 'https://utfs.io/f/43280b85-ab79-4b7e-8d90-4af150b4f9c7-n92lk7.png',
            cart: [],
            orders: [],
            favorites: [],
        })

        return NextResponse.json({ message: 'Пользователь был создан' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }
} 