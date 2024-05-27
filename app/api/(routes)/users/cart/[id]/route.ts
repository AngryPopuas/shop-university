import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'
import { getAccountByToken } from "@/app/api/actions/jwt";
import { cookies } from "next/headers";



export async function POST(req: Request, context: { params: { id: string } }) {
    try {
        const product_id = context.params.id
        const isAuthorized = cookies().get('auth')

        if (!isAuthorized || !product_id) {
            return NextResponse.json({ message: 'Отсутствует информация' }, { status: 400 })
        }
        const user = await getAccountByToken(isAuthorized.value)

        if (!user) {
            return NextResponse.json({ message: 'Ошибка авторизации' }, { status: 403 })
        }

        const product = user.cart.find(item => item.id === product_id)?.amout
        if (product !== undefined && product > 0) return NextResponse.json({ message: 'Товар есть в корзине', amout: product }, { status: 200 })

        return NextResponse.json({ message: 'Товара нет в корзине', amout: 0 }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Отсутствует информация' }, { status: 400 })
    }
}
