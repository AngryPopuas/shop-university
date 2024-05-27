'use server'
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { LogginAccountFormSchema } from "@/schemas/user";
import { IUser } from '@/types';
import clientPromise from "@/lib/db";
import bcrypt from 'bcrypt'


export const getAccountByToken = async (token: string): Promise<IUser | null> => {
    try {
        const userToken = jwt.verify(token,
            // @ts-expect-error
            process.env.JWT_SECRET,
            async function (err, decoded: { data: { email: string, name: string } }) {
                if (decoded) {
                    const client = await clientPromise
                    const db = client.db('test')
                    const user = await db.collection('users').findOne({
                        email: decoded.data.email
                    })
                    return user ? user : null
                }
            }
        )
        return userToken || null
    } catch (err) {
        return null
    }
}
// export const test = () => {
//     const test = jwt.sign({
//         data: {
//             name: 'John',
//             email: 'askldjaljksd',
//             id: 'asdkljasjdlk'
//         }
//     },
//         // @ts-expect-error
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' });

//     console.log(test)

//     jwt.verify(test,
//         // @ts-ignore
//         process.env.JWT_SECRET,
//         function (err, decoded) {
//             // @ts-ignore
//             console.log(decoded) // bar
//         });
// }