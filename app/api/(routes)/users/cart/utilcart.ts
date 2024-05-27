import clientPromise from "@/lib/db"
import { IUser } from "@/types"


export const CartAddProduct = async (user: IUser, id: string) => {
    try {
        const client = await clientPromise
        const db = client.db('test')

        const isProductExist = user.cart.filter((item) => item.id === id).length > 0

        if (isProductExist) {
            const updatedCart = [...user.cart]
            updatedCart[updatedCart.findIndex(item => item.id === id)].amout += 1
            await db.collection('users').findOneAndUpdate(
                { email: user.email }, { $set: { cart: [...updatedCart] } }
            )
            return { amout: updatedCart[updatedCart.findIndex(item => item.id === id)].amout }
        } else {
            await db.collection('users').findOneAndUpdate(
                { email: user.email }, { $addToSet: { cart: { id: id, amout: 1 } } },
            )
            return { amout: 1 }
        }

    } catch {
        throw new Error()
    }

}
export const CartRemoveProduct = async (user: IUser, id: string) => {
    try {
        const client = await clientPromise
        const db = client.db('test')

        const updatedCart = [...user.cart].filter((item) => item.id !== id)

        const request = await db.collection('users').findOneAndUpdate(
            { email: user.email }, { $set: { cart: [...updatedCart] } }
        )
        return { amout: 0 }
    } catch {
        throw new Error()
    }
}
export const CartReduceProduct = async (user: IUser, id: string) => {
    try {
        const client = await clientPromise
        const db = client.db('test')

        const product = user.cart.find((item) => item.id === id)

        if (product?.amout === 1) {
            CartRemoveProduct(user, id)
            return { amout: 0 }
        } else {
            const updatedCart = [...user.cart]
            updatedCart[updatedCart.findIndex(item => item.id === id)].amout -= 1
            await db.collection('users').findOneAndUpdate(
                { email: user.email }, { $set: { cart: [...updatedCart] } }
            )
            return { amout: updatedCart[updatedCart.findIndex(item => item.id === id)].amout }
        }
    } catch {
        throw new Error()
    }
}

export const CartActions = {
    add: CartAddProduct,
    remove: CartRemoveProduct,
    reduce: CartReduceProduct,
}