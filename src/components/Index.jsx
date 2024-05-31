import React from 'react'
import './css/home.css'
import Banner from './Assets/banner.png';
export default function Index(){
    return (
        <div className="home">
            <div className='container'>
                <div className='title'>
                <h1>Explore our premium collection of boys' and girls' school uniforms, crafted for comfort and durability during the school day.</h1>
<p>Discover a diverse range of sizes and styles, ensuring every student feels confident and prepared for the academic journey ahead.</p>
                </div>
                <img src={Banner} alt=''></img>
            </div>
        </div>
    )
}