import { ProductSchema } from '@/schemas/product'
import ProductPreview from '../product-preview/ProductPreview'
import { IProduct } from '@/types'

const ProductsListPreview = ({ props }: { props: Array<IProduct> }) => {
  return (
    <div className='grid grid-cols-4 gap-y-5 w-full'>
      {props.map((item,index) => {
        return (
          <ProductPreview key={index} props={item} />
        )
      })}
    </div>
  )
}

export default ProductsListPreview