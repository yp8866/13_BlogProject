import conf from '../conf/config'
import {Client, ID, Databases,Storage,Query} from "appwrite"

export class StorageService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setEndpoint(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket= new Storage(this.client);


    }

    async createPost({title,slug,content,featured_image,status,userId}){
        try {
            return  await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite add Post Error: ",error);
        }
    }

    async UpdatePost(slug,{title,content,featured_image,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                }
            )

        } catch (error) {
            console.log("Appwrite UpdatePost Problem: ",error);
        }
    }

    async DeletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Delete Post Problem: ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite GetPost Error ",error);
            return 0;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Get AllPosts Error: ",error);
            return 0;
            
        }
    }


    //file uploading related services
    
    async FileUpload(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite File Upload ERror: ",error);   
            return 0;
        }
    }

    async DeleteFile(fileID){
        try {
            await this.bucket.DeleteFile(conf.appwriteBucketId,fileID);
            return true;
        } catch (error) {
            console.log("appwrite Delete File Error: ",error);
            return false;
        }
    }

    GetFilePreview(fileID){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId,fileID);
        } catch (error) {
            console.log("Appwrite  Get Preview Error: ", error);
        }
    }
}

const StorageServiceObj= new StorageService();
export default StorageServiceObj;