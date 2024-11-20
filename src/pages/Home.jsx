import { useEffect, useState } from "react"
import React   from 'react'
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from '../firebase-config'


const Home = (isAuth) => {

  const [postLists, setPostLists] = useState([])
  const [loading, setloading] = useState(false)
  const postCollectionRef = collection(db, 'posts')

  const getPosts = async() => {
    setloading(false)
    const data = await getDocs(postCollectionRef);
    setPostLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    setloading(false)
  }

  const deletePost = async(id) => {
    // console.log(id);
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc)
    
  }

  useEffect(() => {
    getPosts(); 
  }, [])

  return ( 
    <div className="homepage">
      {postLists.length === 0 ? <span className="ml-[50%] mt-[20%] loading loading-spinner loading-lg"></span> : postLists.map((post) =>{
        return(
          <div key={post.id} className="card mb-4 shadow-sm border m-20"> 
          <div className="flex justify-end">
           
          </div>
            <div className="card-body">
              <h5 className="card-title mb-3 font-bold ">{post.title}</h5>
              <hr />
              <p className="card-title mb-3">{post.postTitle}</p>
              <span className="badge bg-slate-900 p-4 rounded-md">Post by : {post.author.name}</span>
              {isAuth && post.author.id === auth.currentUser.uid && <span className="flex justify-end">
              <button onClick={() => {deletePost(post.id)}} className="btn btn-outline btn-error">Delete</button>
              </span>}
              

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home