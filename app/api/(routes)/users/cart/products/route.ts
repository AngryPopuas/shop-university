import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'
import { getAccountByToken } from "@/app/api/actions/jwt";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    try {
        const isAuthorized = cookies().get('auth')

        if (!isAuthorized) {
            return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
        }

        const user = await getAccountByToken(isAuthorized.value)

        if (!user) {
            return NextResponse.json({ message: 'Ошибка авторизации' }, { status: 403 })
        }
        const user_cart = [...user.cart.map(item => new ObjectId(item.id))]

        const client = await clientPromise
        const db = client.db('test')
        const request = await db
            .collection("products")
            .find({ _id: { $in: [...user_cart] } })
            .toArray();

        const products = request.map((item) => {
            item.amout = user.cart.find((cart_find) => cart_find.id === String(item._id))?.amout
            return item
        })



        return NextResponse.json({ message: 'Корзина полученна!', products }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }
} 