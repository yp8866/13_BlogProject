import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {Link, useNavigate, useParams} from "react-router-dom"
import {Container, Button} from "../Components"
import StorageServiceObj from '../appwrite/conf';
import parse from "html-react-parser"


const Post = () => {
    const [post, setpost] = useState(null);
    const navigate= useNavigate();
    const {slug}= useParams();
    const userData= useSelector((state)=> state.auth.userData);
    const isAuthor= post&&userData?  (post.userId === userData.$id) : false;


    useEffect(()=>{
        if(slug){
            StorageServiceObj.getPost(slug).then((post)=>{
                if(post)
                    setpost(post);
                else navigate("/")
            })
        }
        else navigate("/")

    },[slug,navigate])
    const deletePost= ()=>{
        StorageServiceObj.DeletePost(post.$id).then((status)=>{
            if(status){
                StorageServiceObj.DeleteFile(post.featured_image).then((data)=>(
                    navigate("/")
                ))
            }
        })
    }


    return post? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={StorageServiceObj.GetFilePreview(post.featured_image)}
                        alt={post.title}
                        className="rounded-xl w-1/3 h-1/3"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ): null;
}

export default Post;
