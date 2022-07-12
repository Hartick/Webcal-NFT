import Link from 'next/link'
import React from 'react'
import coin from '../../../public/coin.png'
import "./Banner.module.css"


const Banner = (props) => {

    return (
        <>
            <div className='header section__padding'>
                <div className="header-content">
                    <div>
                        <h1>{props.title}</h1>
                        <img className='shake-vertical' src={coin.src} alt="" />
                    </div>
                </div>
            </div>
      </>
    )
}

export default Banner