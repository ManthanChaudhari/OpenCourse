const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKETID)
}
export default config;