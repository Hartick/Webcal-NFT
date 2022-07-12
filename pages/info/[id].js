import { nftAddress, nftMarketplaceAddress } from "../utils/options"
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json"
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json"
import axios from "axios"
import { useEffect, useState } from "react";
import connect from "../utils/auth"
import profileCover from '../../public/profile-cover.png'
import profileImage from '../../public/profile-image.jpg'
import "../components/Profile.module.css"
import { getUser } from "../../services/user.service";
import List from "../components/NFT/List";
import { useRouter } from 'next/router'



export default function Info(){

    const [profileNFTs, setProfileNFTs] = useState([])
    const [profileInfo, setProfileInfo] = useState();
    
    const router = useRouter()
    const { id }  = router.query

    useEffect( ()=>{
            loadContent()
        }, [])

        async function loadUser() {
            console.log(id)
            const user = await getUser(id)
            setProfileInfo(user)
        }
    



        async function loadContent(){
            loadUser();
            const{account, web3} = await connect()
            if(account && web3){

                const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplace.abi, nftMarketplaceAddress);
                const nftContract = new web3.eth.Contract(NFT.abi, nftAddress);
    
                try{
                    const items = await nftMarketplaceContract.methods.fetchAllItemsOfOwner().call({from: id})
                    const NFTs = await Promise.all(items.map(async nft => {
                        console.log(nft)
                            const tokenURI = await nftContract.methods.tokenURI(nft.tokenId).call()
                            const meta = await axios.get(tokenURI)
            
                            const item = {
                                id: nft.tokenId,
                                title: meta.data.title,
                                description: meta.data.description,
                                image: meta.data.image, 
                                owner: nft.owner,
                                price: web3.utils.fromWei(nft.price.toString(), 'ether'),
                                lastPrice: web3.utils.fromWei(nft.lastPrice.toString(), 'ether'),
                                onSale: nft.onSale,
                            }
                            return item
                            
                        }));

                    
                    setProfileNFTs(NFTs)
                    console.log(profileNFTs)

                }catch(err){
                    console.log(err)
                }
            }
        }
    return(
        <>
                <div className='profile'>
                <div className="profile-top">
                <div className="profile-banner">
                <img
                        src={profileCover.src}
                        alt="profile banner" 
                />
                </div>
                <div className="profile-pic">
                    <img
                        src={profileInfo?.userProfileImageUrl
                            ? profileInfo?.userProfileImageUrl
                            : profileImage.src}
                        alt="profile image"/>
                    <h3>{profileInfo?.publicName ? profileInfo.publicName : id}</h3>
                </div>
                </div>
                <div className="profile_info p-6">
                        <h5 className="text-white-600 text-center">{profileInfo?.biography}</h5>
            </div>             

                <div className="profile-bottom">

                <div className="profile-bottom-input">
                
                    <input type="text" placeholder='Search Item here' />
                    <select>
                    <option>Recently Listed</option>
                    <option>Popular</option>
                    <option>Low to High</option>
                    <option>High to Low</option>
                    </select>
                </div>
                <div className="flex-row py-4 px-12">
                    <div className="text-center mt-6 mb-12 text-white">
                        <h1 className="text-5xl  font-bold "></h1>
                        <h2>Show which NFTs the user own.</h2>
                    </div>
                    <List title="" items={profileNFTs} buyable={false}/>
                </div>             
            </div>
            </div></>
    )
}