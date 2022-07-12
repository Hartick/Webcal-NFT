import React from 'react'
import { useRouter } from 'next/router'



export default function CollectionInfo(){
    const[ownedNFTs, setOwnedNFTs] = useState([])
    const [account, setAccount] = useState()
    const [userInfo, setUserInfo] = useState();

    const router = useRouter();

    const collectionName = router.collectionName;
    
    
    useEffect( ()=>{
            loadContent()
        }, [])

        async function loadUser() {
            const {account} = await connect()
            setAccount(account)
            
            const user = await getUser(account)
            setUserInfo(user)
        }
        
        async function getCollectionInfo() {

        }
    



        async function loadContent(){
            loadUser();
            const{account, web3} = await connect()
            if(account && web3){
                setAccount(account)

                const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplace.abi, nftMarketplaceAddress);
                const nftContract = new web3.eth.Contract(NFT.abi, nftAddress);
    
                try{
                    const items = await nftMarketplaceContract.methods.fetchAllItemsOfOwner().call({from: account})
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

                    
                   setOwnedNFTs(NFTs)
                   console.log(ownedNFTs)

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
                        src={userInfo?.userProfileImageUrl
                            ? userInfo?.userProfileImageUrl
                            : profileImage.src}
                        alt="profile image"/>
                   <h3>{userInfo?.publicName ? userInfo.publicName : account}</h3>
               </div>
             </div>
             <div className="profile_info p-6">
                     <h5 className="text-white-600 text-center">{userInfo?.biography}</h5>
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
                        <h1 className="text-5xl  font-bold ">YOUR COLLECTION</h1>
                        <h2>That's how you spent your money</h2>
                    </div>
                    <List title="" items={ownedNFTs} buyable={false} sellable={true}/>
                </div>             
            </div>
           </div></>
    )
}