import { v2 as cloudinary } from 'cloudinary'
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


async function upload(image) {
    const response = await cloudinary.uploader.upload(image, {tags: 'test'})
    console.log(" *** file uploaded to cloud service ***")
    return response.url;
}

exports.upload = upload;