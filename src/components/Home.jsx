import './css/home.css'
import Banner from './Assets/banner.png'
export default function Home(){
    return (
        <div className="home">
            <div className='container'>
                <div className='title'>
                    <h1>Discover our premium collection of boys and girls school uniforms,designed for comfort and durability throughout the school day...</h1>
                    <p>Explore our wide range of sizes and styles, ensuring every student feels confident and ready for the academic journey ahead.</p>
                </div>
                <img src={Banner} alt=''></img>
            </div>
        </div>
    )
}