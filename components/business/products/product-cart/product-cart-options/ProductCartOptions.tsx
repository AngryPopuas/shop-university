'use client'
import { Button } from "@/components/ui/button"
import { IProductCart } from "@/types"
import { useState, useEffect } from "react"


const ProductCartOptions = ({ products }: { products: Array<IProductCart> }) => {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        (() => {
            let price = 0
            products.forEach((item) => price += item.price * item.amout)
            setTotalPrice(price)
        })()
    }, [])

    return (
        <div className="flex flex-col rounded-md px-10 space-y-10 w-full max-w-[450px]">
            <h2 className="text-2xl font-light">Общая стоимость: {totalPrice}₽</h2>
            <Button>Оформить</Button>
        </div>
    )
}

export default ProductCartOptions