import { Client , Databases , ID, Storage } from "appwrite";
import config from "./config";
class FileService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
   async createCourse({title,description,syllabus,thumbnail}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    syllabus,
                    thumbnail,
                }
            )
        } catch (error) {
            console.log("CreateFile :: " , error.message);
        }
    }
    async deleteCourse(id){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
            return true;
        } catch (error) {
            console.log("deleteFile : " , error.message);
            return false;
        }
    }
    async getCourse(id){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log("getFile : " . error.message);
        }
    }
    async getAllCourses(){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId
            )
        } catch (error) {
            console.log("getAllFiles :: " , error.message);
        }
    }
    // File Upload Services 
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique,
                file
            )
        } catch (error) {
            console.log("uploadFile :: " , error.message);
        }
    }
    async deleteFile(id){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                id,
            )
        } catch (error) {
            console.log("Appwrite deletFile : " , error.message);
        }
    }
}
const fileServices = new FileService();
export default fileServices;