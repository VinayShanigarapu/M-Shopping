import { useContext } from 'react'
import './css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from './Item'

export default function SportsTshirts(){
    const {data_product} = useContext(ShopContext);
    return (
        <div className="shop-category">
            <div className='shopcategory-name'>
                <p>Sports T-Shrits</p>
                
            </div>
            <div className='shopcategory-products'>
                {data_product.map((item,i) => {
                    if(item.subcategory==="color")
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} subcategory={item.subcategory}/>
                    else
                        return null;
                })}
            </div>
        </div>
    )
}