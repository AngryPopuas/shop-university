'use client'
import ProductCartEmpty from "@/components/business/products/product-cart/product-cart-empty/ProductCartEmpty"
import ProductCartWrapper from "@/components/business/products/product-cart/product-cart-wrapper/ProductCartWrapper"
import ProfileMain from "@/components/business/profile/profile-main/ProfileMain"
import { IProductCart, IProfile } from "@/types"
import { getUserAccount } from "@/utils/auth"
import axios from "axios"
import { Cardo } from "next/font/google"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CartPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [cartProducts, setCardProducts] = useState<Array<IProductCart>>()
    useEffect(() => {
        (async () => {
            const request = await axios.get<{ message: string, products: Array<IProductCart> }>('http://localhost:3000/api/users/cart/products')
                .then((res) => {
                    if (res) setCardProducts(res.data.products)
                })
                .catch((err) => {
                    router.push('/auth/register')
                })
                .finally(() => setIsLoading(false))
        })()
    }, [])
    return (
        <div>
            {
                isLoading
                    ?
                    <h2>Loading</h2>
                    :
                    cartProducts && cartProducts?.length > 0
                        ?
                        <ProductCartWrapper props={cartProducts} />
                        :
                        <ProductCartEmpty />
            }
        </div>
    )
}

export default CartPage