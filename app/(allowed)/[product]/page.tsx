'use client'
import ProductMain from "@/components/business/products/product-main/ProductMain"
import ProductMainSkeleton from "@/components/business/skeletons/product-main-skeleton/ProductMainSkeleton"
import { ProductSchema } from "@/schemas/product"
import { IProduct } from "@/types"
import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react"
import { z } from "zod"

const ProductPage = ({ params }: { params: { product: string } }) => {
    const [isError, setIsError] = useState<{ status: boolean, message: string }>({ status: false, message: '' })
    const [product, setProduct] = useState<IProduct>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    console.log(product)
    useEffect(() => {
        (async () => {
            axios.get<{ product: IProduct }>(`http://localhost:3000/api/products/${params.product}`)
                .then((res) => setProduct(res.data.product))
                .catch((err: AxiosError<{ message: string }>) => setIsError({ status: true, message: '' }))
                .finally(() => setIsLoading(false))
        })()
    }, [])

    return (
        <div>
            {isLoading && <ProductMainSkeleton />}
            {product ? <ProductMain props={product} /> : <></>}
        </div>
    )
}

export default ProductPage