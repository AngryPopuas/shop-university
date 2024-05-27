import clientPromise from "@/lib/db"
import { ProductSchema } from "@/schemas/product"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const client = await clientPromise
        const db = client.db('test')
        const product = await db
            .collection("products")
            .findOne({ _id: new ObjectId(context.params.id) })
        return NextResponse.json({ product, message: 'Успешно' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }
}