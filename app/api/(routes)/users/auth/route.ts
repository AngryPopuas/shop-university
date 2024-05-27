import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'
import { getAccountByToken } from "@/app/api/actions/jwt";
import { cookies } from "next/headers";



export async function GET(req: Request) {
    try {
        const isAuthorized = cookies().get('auth')

        if (!isAuthorized) {
            return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
        }
        const user = await getAccountByToken(isAuthorized.value)
        const userDto = {
            _id: user?._id,
            name: user?.name,
            isActivated: user?.isActivated,
            cart: user?.cart,
            orders: user?.orders,
            favorires: user?.favorires,
            avatar: user?.avatar
        }

        if (!user) {
            return NextResponse.json({ message: 'Ошибка авторизации' }, { status: 403 })
        }
        return NextResponse.json({ message: 'Успешно', user: userDto }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 400 })
    }
}
