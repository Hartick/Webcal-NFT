import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import unicallogo from '../../../public/logo.png'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import connect from '../../utils/auth'
import { getUser } from '../../../services/user.service'


const Menu = () => (
  <>
     <Link href="/explore">
      <p>Explore</p> 
      </Link>
     <p>My Items</p>
    
  </>
 )

const Header = () => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };

    const [account, setAccount] = useState()
    const [userInfo, setUserInfo] = useState();
    const [toggleMenu,setToggleMenu] = useState(false)




    useEffect(()=>{loadUser()},[])

    async function loadUser() {
        const {account} = await connect()
        setAccount(account)
        
        const user = await getUser(account)
        setUserInfo(user)
        
    }


  return (
    <div className='navbar'>
    <div className="navbar-links">
      <div className="navbar-links_logo">
      <Link href="/"> 
        <Image src={unicallogo} alt="logo" width={40} height={40}/>
        </Link>
      </div>
      <div className="navbar-links_container">
        <input type="text" placeholder='Search Item Here' autoFocus={true} />
       <Menu />
      
      </div>
    </div>
    <div className="navbar-sign">
      <>
       <Link href="/create"> 
        <button type='button' className='primary-btn' >Create</button>
      </Link>
      <Link href="/import"> 
        <button type='button' className='secondary-btn' >Import</button>
      </Link>
              
      {account != undefined ? 
             ( 
              <>
             <Link href="/profile">
                <p style={{color: "green"}}>
                  Account: {(userInfo?.publicName) ? userInfo.publicName : "0x"+account.substr(2,3)+".."+account.substr(account.length - 4, account.length - 1)}
                </p>
            </Link>
            <Link href="/profile/edit">
              <button type='button' className='secondary-btn' >Edit Profile</button>
            </Link>
            </>
            ) : 
            <p style={{color: "red"}}> (error) </p> 
            }
      
      </>
      <>
      </>
  
     

     
    </div>
    <div className="navbar-menu">
      {toggleMenu ? 
      <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
      : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
      {toggleMenu && (
        <div className="navbar-menu_container scale-up-center" >
          <div className="navbar-menu_container-links">
           <Menu />
          </div>
          <div className="navbar-menu_container-links-sign">
            <>
            <Link href="/create"> 
              <button type='button' className='primary-btn' >Create</button>
            </Link>
            <Link href="/import"> 
              <button type='button' className='secondary-btn'>Import</button>
             </Link>
            
            {account != undefined ? 
             ( 
              <>
             <Link href="/profile">
                <p style={{color: "green"}}>
                  Account: {(userInfo?.publicName) ? userInfo.publicName : "0x"+account.substr(2,3)+".."+account.substr(account.length - 4, account.length - 1)}
                </p>
            </Link>
            <Link href="/profile/edit">
              <button type='button' className='secondary-btn' >Edit Profile</button>
            </Link>
            </>) : 
            <p style={{color: "red"}}> (error) </p> 
            }

            </>
         
          </div>
          </div>
      )}
    </div>
  </div>
   
  )
}

export default Header