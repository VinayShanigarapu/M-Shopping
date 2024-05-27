import { useContext } from 'react'
import './css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from './Item'

export default function ShopCategory(props){
    const {data_product} = useContext(ShopContext);
    console.log(data_product)
    return (
        <div className="shop-category">
            <div className='shopcategory-name'>
                {props.category==="boys" ? <p>PRE-PRIMARY BOYS</p> : (props.category==="girls" ? <p>PRE-PRIMARY GIRLS</p> : <p>Nursery to Class 2</p>)}
                
            </div>
            <div className='shopcategory-products'>
                {data_product.map((item,i) => {
                    if(props.category===item.category && item.subcategory==="pre-primary")
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} subcategory={item.subcategory}/>
                    else
                        return null;
                })}
            </div>
            <div className='shopcategory-name'>
                {props.category==="boys" ? <p>PRIMARY BOYS</p> : (props.category==="girls" ? <p>PRIMARY GIRLS</p> : <p>3rd to 6th Class</p>)}
            </div>
            <div className='shopcategory-products'>
                {data_product.map((item,i) => {
                    if(props.category===item.category && item.subcategory==="primary")
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} subcategory={item.subcategory}/>
                    else
                        return null;
                })}
            </div>
        </div>
    )
}