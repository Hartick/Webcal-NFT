import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from 'next/link'
import NFTCard from '../nftCard';


const List = ({title, items, buyable, sellable = false}) => {
  return (
    <div className='list section__padding'>
      <div className="list-container">
        <div className="list-container-text">
          <h1>{title}</h1>
        </div>
        <div className="list-container-card">
            {items.map(nft => {
                console.log(nft);
               return( <NFTCard key={nft.id} buyable={buyable} nft={nft} sellable={sellable}/>)
            })
            }
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  )
}

export default List