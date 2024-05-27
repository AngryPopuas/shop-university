import { Button } from "@/components/ui/button"
import ProductCarousel from "../product-carousel/ProductCarousel"
import { ProductSchema } from "@/schemas/product"
import { useToast } from "@/components/ui/use-toast"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { IProduct } from "@/types"
import z from 'zod'
import ProductOptionsCart from "../product-options-cart/ProductOptionsCart"


const ProductMain = ({ props }: { props: IProduct }) => {



    return (
        <div className="w-fill flex lg:flex-row flex-col justify-between lg:space-x-20 lg:items-stretch items-center lg:space-y-0 space-y-5">
            <div>
                <ProductCarousel props={props.imagesUrl} />
            </div>
            <div className="flex flex-col rounded-md space-y-[35px] w-full">
                <h2>{props.title}</h2>
                <span>{props.description}</span>
                <h3>{props.price}₽</h3>
                <ProductOptionsCart product_id={props._id} />
            </div>
        </div>
    )
}

export default ProductMain