import React,{useState,useEffect} from 'react';
import {Container,Postform} from "../Components"
import StorageServiceObj from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';

const Editpost = () => {
    const [post,setpost] = useState(null);
    const {slug} = useParams
    const navigate= useNavigate();

    useEffect(()=>{
        if(slug){
            StorageServiceObj.getPost(slug).then((post)=>{
                if(post)
                    setpost(post)
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])
    return post? (
        <div className='py-8'>
            <Container>
                <Postform post={post}/>
            </Container>
        </div>
    ) : null;
}

export default Editpost;

