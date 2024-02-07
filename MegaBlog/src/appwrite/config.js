import conf from '../conf.js'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service{
    client = new Client()
    database;
    bucket;
    
    constructor(){
        this.client
                  .setEndpoint(conf.appwriteUrl)
                  .setProject(conf.appwriteProjectId);
                  this.database = new Databases(this.client);
                  this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, feturedImage, status, userId}){
        try {
           return await this.database.createDocument(conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug ,{title, content, feturedImage, status}){
        try {
            await this.database.updateDocument(conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    feturedImage,
                    status
                }) 
            
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug)
            return true
        } catch (error) {
            throw error;
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug);
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
           return await this.database.getDocument(conf.appwriteDatabse,
                conf.appwriteCollectionId,
                queries);
        } catch (error) {
            throw error;
        }
    }

    // upload File 
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,
                ID.unique(),
                file
                )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,
                fileId);
                return true
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,
            fileId);
    }

}

const service = new Service();
export default service