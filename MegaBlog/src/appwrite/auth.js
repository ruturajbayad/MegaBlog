import conf from '../conf.js'
import {Client, Account, ID} from 'appwrite'

export class Account {
    client = new Client();
    account;

    constructor(){
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
                    this.account = new Account(this.client);
                }
    async createAccount({email, password, name}){
       try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // direct login
            return this.login({email,password})
        } else {
            return userAccount
        }
       } catch (error) {
        throw error;
       }
    }

    async login({email, password}){
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new Account();

export default authService