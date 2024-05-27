'use client'
import { ProductSchema } from "@/schemas/product"
import { useEffect, useState } from "react"
import z from 'zod'
import axios, { AxiosError } from "axios"
import ProductsListPreview from "@/components/business/products/products-list-preview/ProductsListPreview"
import { IProduct } from "@/types"
import ProductListPreviewSkeleton from "@/components/business/skeletons/products-list-preview-skeleton/ProductListPreviewSkeleton"

const HomePage = () => {
    const [isError, setIsError] = useState<{ status: boolean, message: string }>({ status: false, message: '' })
    const [productList, setProductList] = useState<Array<IProduct>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            axios.get<{ products: Array<IProduct>, message: string }>('http://localhost:3000/api/products')
                .then((res) => setProductList(res.data.products))
                .catch((err: AxiosError<{ message: string }>) => setIsError({ status: true, message: '' }))
                .finally(() => setIsLoading(false))
        })()
    }, [])
    console.log(productList)
    return (
        <div className="w-full">
            {isLoading && <ProductListPreviewSkeleton />}
            {isError.status && <h2>{isError.message}</h2>}
            {productList.length ? <ProductsListPreview props={productList} /> : <></>}
        </div>
    )
}

export default HomePage