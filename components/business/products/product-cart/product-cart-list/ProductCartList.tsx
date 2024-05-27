import { IProductCart } from "@/types"
import ProductCartItem from "../product-cart-item/ProductCartItem"


const ProductCartList = ({ products }: { products: Array<IProductCart> }) => {
    return (
        <div className="flex flex-col space-y-5 w-full">
            {products.map((product, index) => {
                return (
                    <ProductCartItem props={product} key={index} />
                )
            })}
        </div>
    )
}

export default ProductCartList