import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductDisplay from "./ProductDisplay";

const Product = () => {
    const {data_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = data_product.find((e) => e.id === Number(productId))
    return (
        <div>
            <ProductDisplay product={product}/>
        </div>
    )
}
export default Product;