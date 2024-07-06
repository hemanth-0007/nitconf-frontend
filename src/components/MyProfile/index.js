 
import React from 'react'
import userImg from '../../assets/userImg.jpg'


const MyProfile = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
        <div>
            <h1 className='text-bold text-5xl text-center
                            m-5'>My Profile</h1>
            <div className='flex flex-col justify-center items-center
                             w-1/2 mx-auto my-10 p-5 rounded-2xl 
                             hover:shadow-xl transition-all ease-in-out duration-100'>
                <img className='h-28 w-28' src = {userImg} alt = 'profile' />
                <div className='overflow-hidden flex flex-col justify-center items-start'> 
                    <h2 className='text-2xl font-mono '><span className="font-bold ">FirstName : {" "}</span>{user.firstname}</h2>
                    <h2 className='text-2xl font-mono '><span className="font-bold ">LastName : {" "}</span>{user.lastname}</h2>
                    <h2 className='text-2xl font-mono '><span className="font-bold ">Email : {" "}</span>{user.email}</h2>
                    <h2 className='text-2xl font-mono '><span className="font-bold ">Password : {" "}</span>****</h2>
                    <button className='bg-blue-500 hover:bg-blue-900 text-white font-bold 
                                        m-3 py-2 px-4 rounded-full self-center
                                        hover:-translate-y-0.5 transition-all ease-in-out duration-100'>Edit Profile</button>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default MyProfile