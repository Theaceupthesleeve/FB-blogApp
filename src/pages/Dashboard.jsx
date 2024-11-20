import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({isAuth}) => {

  const [title, setTitle] = useState('')
  const [postTitle, setPostTitle] = useState('')

  let navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts')

  const createPost = async() => {
    if(title === '' || postTitle === ''){
      alert('Bhai fill to karo input...');
      return false;
    } else{
      // console.log('else chal raha kaam sahi kar')
      try {
        await addDoc(postCollectionRef, {
          title,
          postTitle,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid
          }
        })
        console.log(auth)
        navigate('/');
      }catch(error){
        console.log(error);
        
      }
    }
  }

  useEffect(() => {
    if(!isAuth){
      navigate('/login')
    }
  })

  return (
    <div className='container ml-[37%] mt-11 '>
        <div className="bg-light p-5 rounded mt-3 j">
            <h1 className='text-3xl font-bold'>Create a Blog</h1>
            <div className='mb-3 mt-2'>
                <label htmlFor="title" className='text-1xl'>Blog Title</label><br />
                <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs mt-2" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='mb-3'>
            <label htmlFor="title" className='text-1xl'>Description...</label><br />
                <textarea
                 placeholder="Post..."
                 className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" onChange={(e) => setPostTitle(e.target.value)}></textarea>  
            </div>
            <button className='btn ml-[6rem]' onClick={createPost}>Publish Blog</button>
        </div>
    </div>
  )
}

export default Dashboard