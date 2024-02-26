import React,{useState,useEffect} from 'react';
import StorageServiceObj from '../appwrite/conf';
import { Container,Postcard } from '../Components';


const Home = () => {
    const [posts, setposts] = useState([])
    useEffect(()=>{
        StorageServiceObj.getPosts().then((posts)=>{
            if(posts)
                setposts(posts.documents)
        })
    },[])


    if(posts.length === 0)
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts yet for you...😒 , Login to see all posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )

    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div className='p-2 w-1/4' key={post.$id}>
                            <Postcard {...post}/>
                        </div>
                    ))}

                </div>
            </Container>
        </div>
        
    )
}

export default Home;
