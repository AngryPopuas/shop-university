import { ProductSchema } from '@/schemas/product'
import { IProduct, IProductCart } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


const ProductCartItem = ({ props }: { props: IProductCart }) => {
    const router = useRouter()
    const handleRedirectProduct = () => {
        router.push(`/${props._id}`)
    }
    return (
        <div className='flex flex-row justify-between items-center rounded-md transition-all p-5 space-x-5  hover:bg-input bg-transparent w-full'>
            <div onClick={handleRedirectProduct} className='w-[100px] h-[100px] relative'><Image src={props.imagesUrl[0]} alt='Продукт' className='rounded-md object-cover cursor-pointer' fill={true} /></div>
            <span onClick={handleRedirectProduct} className='cursor-pointer text-muted-foreground'>{props.title.length < 16 ? props.title : props.title.slice(0, 16) + '...'}</span>
            <span>{props.description.length < 16 ? props.description : props.description.slice(0, 16) + '...'}</span>
            <span>{props.price * props.amout}₽</span>
            <span>{props.amout}</span>
            <Button variant={'destructive'} size={'sm'} className='z-10'>Удалить</Button>
        </div>
    )
}

export default ProductCartItem