import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'
import { getAccountByToken } from "@/app/api/actions/jwt";
import { cookies } from "next/headers";
import { CartActions } from "./utilcart";




export async function POST(req: Request) {
    try {
        const { product_id, params } = await req.json()
        if (!product_id) return NextResponse.json({ message: 'Не верный айди' }, { status: 400 })
        const isAuthorized = cookies().get('auth')

        if (!isAuthorized) {
            return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
        }

        const user = await getAccountByToken(isAuthorized.value)

        if (!user) {
            return NextResponse.json({ message: 'Ошибка авторизации' }, { status: 403 })
        }

        // @ts-ignore
        const request = await CartActions[params || 'add'](user, product_id)

        return NextResponse.json({ message: 'Продукт был добавлен', amout: request.amout }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }
} 