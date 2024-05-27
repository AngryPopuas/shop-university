
import { IProductCart } from '@/types'
import ProductCartList from '../product-cart-list/ProductCartList'
import ProductCartOptions from '../product-cart-options/ProductCartOptions'



const ProductCartWrapper = ({ props }: { props: Array<IProductCart> }) => {

    return (
        <div className='flex flex-row justify-between space-x-5'>
            <ProductCartList products={props} />
            <ProductCartOptions products={props} />
        </div>
    )
}

export default ProductCartWrapper