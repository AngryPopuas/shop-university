
import { ProductSchema } from '@/schemas/product'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import z from 'zod'


const ProductPreview = ({ props }: { props: IProduct }) => {
    const router = useRouter()
    const handleRedirectProduct = () => {
        router.push(`${props._id}`)
    }
    return (
        <div onClick={handleRedirectProduct} className='flex flex-col justify-between items-start rounded-md transition-all hover:bg-input bg-transparent p-[10px] space-y-[10px] cursor-pointer w-[270px]'>
            <div className='w-[250px] h-[250px] relative'><Image src={props.imagesUrl[0]} alt='Продукт' className='rounded-md object-cover' fill={true} /></div>
            <h4>{props.title.length < 16 ? props.title : props.title.slice(0,16) + '...' }</h4>
            <p>{props.description.length < 16 ? props.description : props.description.slice(0,16) + '...' }</p>
            <h3>{props.price}₽</h3>
        </div>
    )
}

export default ProductPreview