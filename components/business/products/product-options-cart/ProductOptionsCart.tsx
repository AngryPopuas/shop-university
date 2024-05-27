'use client'
import { Button } from "@/components/ui/button"
import ProductCarousel from "../product-carousel/ProductCarousel"
import { ProductSchema } from "@/schemas/product"
import { useToast } from "@/components/ui/use-toast"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct } from "@/types"
import { useRouter } from "next/navigation"
import Link from "next/link"


const ProductOptionsCart = ({ product_id }: { product_id: string }) => {
    const router = useRouter()
    const [productAmout, setProductAmout] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isProductAdded, setIsProductAdded] = useState<boolean>(false)
    const { toast } = useToast()
    
    useEffect(() => {
        (async () => {
            await axios.post<{ amout: number | null }>(`http://localhost:3000/api/users/cart/${product_id}`)
                .then((res) => setProductAmout(res.data.amout || 0))
                .catch((err: AxiosError<{ message: string }>) => { toast({ variant: "destructive", title: err.response?.data.message, description: `Статус код: ${err.response?.status}` }) })
                .finally(() => setIsLoading(false))
        })()
    }, [])
    
    const handleCartProduct = async (params?: string) => {
        setIsLoading(true)
        axios.post<{ message: string, amout: number }>(`http://localhost:3000/api/users/cart`, { product_id, params: params ? params : 'add' })
            .then((res) => {
                toast({ title: res.data.message, description: `Статус код: ${res.status}` })
                setIsProductAdded(true)
                setProductAmout(res.data.amout)
            })
            .catch((err: AxiosError<{ message: string }>) => {
                toast({ variant: "destructive", title: err.response?.data.message, description: `Статус код: ${err.response?.status}` })
                setTimeout(() => router.push('/auth/login'), 500)
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <>
            {productAmout !== 0
                ?
                <div className="flex flex-row items-center space-x-[5px]">
                    <Link href={'/profile/cart'}><Button disabled={isLoading} size={'lg'}>В корзине </Button></Link>
                    <Button className="text-3xl" variant={'ghost'} disabled={isLoading} onClick={() => handleCartProduct('add')}>+</Button>
                    <h3>{productAmout}</h3>
                    <Button className="text-3xl" variant={'ghost'} disabled={isLoading} onClick={() => handleCartProduct('reduce')}>-</Button>
                </div>
                :
                <Button disabled={isLoading} onClick={() => handleCartProduct('add')} size={'lg'}>Добавить в корзину</Button>

            }
        </>
    )
}

export default ProductOptionsCart