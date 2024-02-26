import conf from '../conf/config'
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method 
                // login krva do
                return this.loginUser({email,password});
            }
            else{
                return userAccount;
            }
            
            
        }
        catch(error){
            console.log("Create Account Issue: ",error);
        }
    }

    async loginUser({email,password}){
        try{
            const loginResult=await this.account.createEmailSession(email,password);
            return loginResult;

        } catch(error){
            console.log("Login Issue: ",error);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();            
        }
        catch(error){
            console.log("Error in getting Current User: ",error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
            console.log("Logout Successfully!");
        } catch (error) {
            console.log("Logout Issue: ",error);
        }
    }
}

const AuthServObj= new AuthService();

export default AuthServObj