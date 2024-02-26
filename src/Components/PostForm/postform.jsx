import React,{useCallback,useEffect, useState} from 'react';
import {Input,Button,RTE,Select} from ".."
import { useNavigate } from 'react-router-dom';
import StorageServiceObj from "../../appwrite/conf"
import {useSelector } from 'react-redux';
import {useForm} from "react-hook-form";


const Postform = ({post}) => {
    const {register,handleSubmit,control,watch,setValue,getValues} = useForm({
        defaultValues:{
            title:post?.title||"",
            slug:post?.slug||"",
            content:post?.content||"",
            status:post?.status||"active"
        }
    });
    const navigate=useNavigate();
    const userData= useSelector((state)=>state.auth.userData)
    const [working, setworking] = useState(false);

    const submit= async (data)=>{
        //edit the post
        setworking(true);
        if(post){
            const file= data.image[0] ? await StorageServiceObj.FileUpload(data.image[0]) : null;
            if(file){
                await StorageServiceObj.DeleteFile(post.featured_image);
            }

            const dbpost= await StorageServiceObj.UpdatePost(post.$id,{...data,featured_image:file?file.$id:undefined})
            if(dbpost){
                setworking(false);
                navigate(`/post/${dbpost.$id}`)
            }
        }
        // create new post
        else{
            const file= data.image[0]? await StorageServiceObj.FileUpload(data.image[0]) : null;
            if(file){
                const fileid=file.$id;                
                const dbpost= await StorageServiceObj.createPost({...data,userId:userData.$id,featured_image:fileid})
                if(dbpost){
                    setworking(false);
                    navigate(`/post/${dbpost.$id}`)
                }
            }

        }
    }

    const slugTransform= useCallback((value)=>{
        if(value && typeof(value) === "string"){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return ""
    },[])

    useEffect(()=>{
        const subscription= watch((value,{name})=>{
            if(name=='title'){
                setValue('slug',slugTransform(value.title),{ shouldValidate : true})
            }
        })
        return () => subscription.unsubscribe()
    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title: "
                    className="mb-4"
                    placeholder="Enter Your Title Here"
                    {...register("title",{required:true})}
                />
                
                <Input
                    label="Slug: "
                    className="mb-4"
                    placeholder="Slug-URL"
                    {...register("slug",{required:true})}
                    onInput={(e)=>{
                        setValue("slug",slugTransform(e.target.value),{shouldValidate:true})
                    }}
                />

                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
                

            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png image/jpg image/gif image/jpeg"
                    {...register("image",{required: !post})}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img src={StorageServiceObj.GetFilePreview(post.featured_image)} 
                        alt={post.title}
                        className='rounded-lg' />
                    </div>
                )}
            <Select
                options={['active','inactive']}
                label='status'
                className='mb-4'
                {...register('status',{required:true})}
            />
            <Button
                type='submit'
                bgColor={post?'bg-green-500': undefined}
                className='w-full'
            >
                {post? working? "Updating" :"Update" : working? "Submitting": "Submit"}
            </Button>
            </div>
            
        </form>
    );
}

export default Postform;