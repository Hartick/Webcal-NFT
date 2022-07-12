import { nftAddress, nftMarketplaceAddress } from "../utils/options";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json"
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json"

import { useRouter } from "next/router"
import connect from "../utils/auth";
import { useState } from "react";
import Link from 'next/link'


import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


export default function NFTCard({nft, buyable, sellable = false}){
    const router = useRouter()
    const [nftPrice, setPrice] = useState()
    const [account, setAccount] = useState()

    const [isSelling, setIsSelling] = useState(false)

    
    async function listItemOnSale(){
        const {account, web3} = await connect()
        setAccount(account);

        if(nftPrice){
            const contract = new web3.eth.Contract(NFTMarketplace.abi, nftMarketplaceAddress)
            const nftContract = new web3.eth.Contract(NFT.abi, nftAddress)
            const listingFees = web3.utils.toWei('.1', 'ether')
            nftContract.methods.approve(nftMarketplaceAddress, nft.id).send({from: account}).then(confirmations =>{
                contract.methods.listItemOnSale(nft.id, nftAddress, web3.utils.toWei(nftPrice.toString(), 'ether')).send({
                    from: account,
                    value: listingFees,
                }).on('receipt', transaction => {
                    console.log("redirecting")
                    router.reload()
                }); 
            })
            
        }
        

       
    }

    async function buyNFT(){
        const {account, web3} = await connect()
        const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplace.abi, nftMarketplaceAddress)
        nftMarketplaceContract.methods.sellMarketItem(nft.id, nftAddress).send({from: account, value:  web3.utils.toWei(nft.price.toString(), 'ether')}).on('receipt', transaction => {
            router.push('/profile')
        })
    }


    return(
        <>
        <div className="card-column" >
                          <div className="list-card">
                            <div className="list-card-top">
                              <img src={nft.image} alt="" />
                            <Link href={`/post/123`}>
                            <p className="list-title">{nft.title}</p>
                            </Link>
                            <p className="list-description">{nft.description.substring(0,80)}</p>

                            </div>
                            <div className="list-card-bottom">
                                {nft.onSale === true ?
                                 (<p>{nft.price} <span>MATIC</span></p>)
                                 : <p>Not on sale</p>
                            }
                              <p> <AiFillHeart /></p>
                            </div>
                            <div className='flex '>
                    {!nft.onSale && sellable && 
                        <>
                            <button className="card-action-button green-bg" onClick={() => {
                                    if(isSelling) {
                                        listItemOnSale()
                                    }else{
                                        setIsSelling(true)
                                    }
                                }}>Sale</button>
                            {isSelling && <input className="py-1 px-3 rounded-full ml-2 text-black-600 border-none focus:border-none w-4/5" type='text' onChange={(e)=>{setPrice(e.target.value)}} placeholder={nft.lastPrice}/>}
                        
                        </> 
                    }
                    {buyable &&
                        <>
                            <button className="card-action-button blue-bg" onClick={buyNFT}>Buy</button>
                        </>
                    
                    }
                </div>
                          </div>
                        </div> 
                        </>       
    )
}