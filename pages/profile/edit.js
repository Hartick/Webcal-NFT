import React, { useState, useEffect } from "react"
import connect from "../utils/auth"
import { getUser, updateUser } from "../../services/user.service";
import upload from "../../services/s3.service";
import image from "next/image";
import Swal from 'sweetalert2'



const Edit = () => {

    const [profileImage, setProfileImage] = useState();
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [account, setAccount] = useState();
    const [userInfo, setUserInfo] = useState([]);

    
    function isFileImage(file) {
        return file && file.type.split('/')[0] === 'image';
    }


    useEffect(() => {
        loadUser()
    }, [])

    async function editProfile() {
        if(profileImage != undefined) {
            if(isFileImage(profileImage)) {
                upload(profileImage).then(data => {
                    data.promise().then(d => {
                        console.log(d)
                        const photoUrl = d.Location
                        userInfo.userProfileImageUrl = photoUrl
                        userInfo.walletAddress = account
                        updateUser(userInfo).then(data => {
                            Swal.fire({
                                title: 'Profile updated successfully!',
                                text: 'Congratulation, your profile has been updated!',
                                icon: 'success',
                                confirmButtonText: 'Great!'
                            })
                        });
                    });
                })
            }
        } else {
            userInfo?.walletAddress = account
            updateUser(userInfo).then(data => {
                Swal.fire({
                    title: 'Profile updated successfully!',
                    text: 'Congratulation, your profile has been updated!',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                  })
            });
        }
    
    }

    async function loadUser() {
        const {account} = await connect()
        setAccount(account)
        
        const user = await getUser(account)
        setUserInfo(user)
        if(userInfo == null) {
            userInfo = {
                biography: null,
                publicName: null,
                userProfileImageUrl: null,
                walletAddress: account

            }
        }
    }

    
    
    return(
        <div className="flex justify-center mt-11">
            
            <div className="flex-column w-1/2  bg-black-600 px-8 py-8 rounded-t-lg text-white text-justify">
                <h1 className="block text-3xl font-bold mb-8">Edit Profile</h1>
                <img className="w-72 mb-8" src={profileImage ? profileImagePreview : "/placeholder.jpg"}></img>
                
                <label className="block mb-10 ">
                    <h2 className="text-2xl mb-3 font-bold" >Select a file</h2>
                        <input  type='file'  onChange={e=> { 
                                setProfileImage(e.target.files[0])
                                setProfileImagePreview(URL.createObjectURL(e.target.files[0]))
                        }}></input>
                    </label>
               
                
               <label for="Username" className="block mb-10" >
                    <h2 className="text-2xl font-bold mb-1 " >Choose an username</h2>
                    <input required name="Username" className="block border w-2/3 p-2 rounded-md text-black-600" defaultValue={userInfo?.publicName} onChange={(e)=>{
                        setUserInfo({...userInfo, publicName: e.target.value })
                    }} type='text' placeholder="Username"></input>
                </label>
               
                <label for="Biography">
                    <h2 className="text-2xl mb-1 font-bold">Biography</h2>
                    <p className="mb-6 w-2/3">Describe yourself. Make the world know who you are. </p>
                    <textarea  className="block border-2 p-2 rounded-md w-full text-black-600" name="Biography" defaultValue={userInfo?.biography} cols='86' rows="6" onChange={(e)=>{
                        setUserInfo({...userInfo, biography: e.target.value})
                    }} type='text' placeholder="Biography"></textarea>
                </label>
                
                <button className="block py-3 px-12 text-white rounded-md mt-8 w-full bg-green-600" onClick={editProfile}>Edit profile</button>
                
            </div>
        </div>
    )
}

export default Edit;