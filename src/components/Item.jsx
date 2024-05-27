import { Link } from 'react-router-dom';
import './css/Item.css'
const Item = (props) => {
    return (
        <div className="item">
            {props.id === 10 ? <Link to={`/sports/t-shirts`}><img src={props.image} alt="" /></Link> : <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link>} 
            <p>{props.name}</p>
        </div>
    )
}
export default Item;