import express from "express";
import { Decor } from "../models/models.js";
// import dotenv from 'dotenv'
import "dotenv/config";
import crypto from "crypto";

// import jwt from 'jsonwebtoken'
// import 'dotenv/config';
// import bycrypt from 'bcryptjs'
import protect from "../middleWare/authMiddleWare.js";

const router = express.Router();

import multer from "multer";
// Multer setup for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
});


import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// const imageName = randomImageName();

//working post method
// router.post("/adddecoritem", upload.single("images"), async (req, res) => {
//   // console.log("req.body",req.body);
//   // console.log("req.file",req.file);
//   // req.file.buffer

//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Body: req.file.buffer,
//     ContentType: req.file.mimetype,
//   };

//   await s3.send(new PutObjectCommand(params));

//   const getObjectParams = {
//     Bucket: bucketName,
//     Key: imageName,
//   };

//   const command = new GetObjectCommand(getObjectParams);
//   const url = await getSignedUrl(s3, command);
//   const baseUrl = url.split('?')[0];
//   console.log(url);
//   const newItem = {
//     category: req.body.category,
//     images: imageName,
//     img_url: baseUrl,
//   };

//   const decor = await Decor.create(newItem);
//   return res.status(200).send(decor);

// });

router.post("/adddecoritem", upload.array("images", 10), async (req, res) => {
  // console.log("req.body",req.body);
  // console.log("req.file",req.file);
  // req.file.buffer
  try {
    const uploadedImages = [];

    for (const file of req.files) {
      const imageName = randomImageName();
      const params = {
        Bucket: bucketName,
        Key: imageName, // Use a unique key for each image
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(params));

      const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command);
      const baseUrl = url.split('?')[0];
      
      uploadedImages.push({ img_url: baseUrl, imageName: imageName });
    }

    const newItem = {
      category: req.body.category,
      price: req.body.price,
      images: uploadedImages,
    };

    const decor = await Decor.create(newItem);
    return res.status(200).send(decor);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});
//delete decor from database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Decor.findById(id);

    if (!deleteItem) {
      return res.status(404).send({ message: "decor item not found" });
    }

    const image = deleteItem.images;

    const getObjectParams = {
      Bucket: bucketName,
      Key: image,
    };

    const command = new DeleteObjectCommand(getObjectParams);

    await s3.send(command);

    const delete_Item = await Decor.findByIdAndDelete(id);
    if (!delete_Item) {
      return res.status(404).send({ message: "decor item not found" });
    }

    return res.status(200).send({ message: "decor item deleted successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.messsage });
  }
});

//update a decor in the database
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Decor.findById(id);
    const { _id, name, item_type, quantity, image } = item;

    if (item) {
      item.name = req.body.name || name;
      item.item_type = req.body.item_type || item_type;
      item.quantity = req.body.quantity || quantity;
      item.image = req.body.image || image;
    }
    const result = await Decor.findByIdAndUpdate(id, item);
    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item updated successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// router.post('/adddecoritem',protect,async(req,res)=>{
//     try {
//         if (
//             !req.body.name ||
//             !req.body.item_type ||
//             !req.body.quantity ||
//             !req.body.image
//         ) {
//             res.status(400).send({ message: 'send all required fields: name, item type, quantity, image' });
//         } else { // Corrected structure with 'else'
//             const newItem = {
//                 name: req.body.name,
//                 item_type: req.body.item_type,
//                 quantity: req.body.quantity
//             };
//             const decor = await Decor.create(newItem);
//             return res.status(200).send(decor);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message:error.message});
//     }

// })
router.get("/", async (req, res) => {
  try {
    const decor_items = await Decor.find({});
    return res.status(200).json({
      count: Decor.length,
      data: decor_items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//get single decor item from database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Decor.findById(id);

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
