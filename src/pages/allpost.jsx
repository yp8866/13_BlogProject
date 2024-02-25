import React,{useState,useEffect} from 'react';
import StorageServiceObj from '../appwrite/conf';
import { Postcard,Container } from '../Components';


const Allpost = () => {
    const [posts,setposts] = useState([]);
    useEffect(()=>{
        StorageServiceObj.getPosts([]).then((posts)=> {
            if(posts)
                setposts(posts.documents)
        })
    },[])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div className='p-2 w-1/4' key={post.$id}>
                            <Postcard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
            
        </div>
    );
}

export default Allpost;
