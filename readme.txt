some code for further use:
1: Store images in mongo db
    backend (index.js):

            import Jimp from 'jimp';
            import {Image} from './models/models.js'; // Update with the correct path
            import multer from 'multer';

            // Multer setup for handling image uploads
            const storage = multer.memoryStorage();
            const upload = multer({ storage: storage });

            // Sample route for image upload
            // app.post('/upload', upload.array('images', 10), async (req, res) => {
            //     try {
            //       const uploadedImages = req.files;
            
            //       // Save image details to the database
            //       const savedImages = await Promise.all(
            //         uploadedImages.map(async (file) => {
            //           const image = new Image({
            //             filename: file.originalname, // Use originalname instead of filename
            //             contentType: file.mimetype,
            //             data: file.buffer,
            //           });
            //           const savedImage = await image.save();
            
            //           // Return the saved image details to the client
            //           return {
            //             _id: savedImage._id,
            //             filename: savedImage.filename,
            //             contentType: savedImage.contentType,
            //           };
            //         })
            //       );
            
            //       // Return image details to the client
            //       res.json({ uploadedImages: savedImages });
            //     } catch (error) {
            //       console.error('Error uploading images:', error);
            //       res.status(500).json({ error: 'Internal Server Error' });
            //     }
            //   });

    frontend (app.jsx):
                ///for storing images in the database
            // import React, { useState } from 'react';
            // import axios from 'axios';

            // const App = () => {
            //   const [images, setImages] = useState([]);
            //   const [uploadedImages, setUploadedImages] = useState([]);
            //   const [combinedImage, setCombinedImage] = useState('');

            //   const handleImageUpload = async (e) => {
            //     e.preventDefault();

            //     const formData = new FormData();
            //     for (const image of images) {
            //       formData.append('images', image);
            //     }

            //     try {
            //       const response = await axios.post('http://localhost:5000/upload', formData);
            //       setUploadedImages(response.data.uploadedImages);
            //     } catch (error) {
            //       console.error('Error uploading images:', error);
            //     }
            //   };

            //   const handleImageCombine = async () => {
            //     try {
            //       const imageIds = uploadedImages.map((image) => image._id);

            //       const response = await axios.post('http://localhost:5000/combine', {
            //         imageIds: imageIds,
            //       });

            //       // Set the combined image URL to be displayed
            //       setCombinedImage(URL.createObjectURL(new Blob([response.data])));
            //     } catch (error) {
            //       console.error('Error combining images:', error);
            //     }
            //   };

            //   return (
            //     <div>
            //       <form onSubmit={handleImageUpload}>
            //         <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />
            //         <button type="submit">Upload Images</button>
            //       </form>
            //       {combinedImage && (
            //         <div>
            //           <img src={combinedImage} alt="Combined Image" />
            //         </div>
            //       )}
            //       {uploadedImages.length > 0 && (
            //         <div>
            //           <button onClick={handleImageCombine}>Combine Images</button>
            //         </div>
            //       )}
            //     </div>
            //   );
            // };

            // export default App;

2:fetching images from the database and performing image processing on it ( need improvement in it, no working properly)
    backend (index.js):
                // Sample route for fetching images from the database
            app.get('/images', async (req, res) => {
                try {
                const images = await Image.find();
                res.json({ images });
                } catch (error) {
                console.error('Error fetching images:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                }
            });
            
            // Sample route for image processing and combining
            app.post('/combine', async (req, res) => {
                try {
                const selectedImageIds = req.body.selectedImageIds; // Array of selected image IDs from the frontend
            
                // Retrieve selected images from the database based on IDs
                const selectedImages = await Image.find({ _id: { $in: selectedImageIds } });
            
                // Perform image processing on selected images
                const combinedImage = await processImages(selectedImages);
            
                // Convert the processed image to a buffer
                const combinedImageBuffer = await combinedImage.getBufferAsync(Jimp.AUTO);
            
                // Respond with the combined image
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(combinedImageBuffer);
                } catch (error) {
                console.error('Error combining images:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                }
            });
            
            // Function to perform image processing on selected images
            async function processImages(images) {
                // Create a Jimp image for each selected image
                const processedImages = await Promise.all(
                images.map(async (imageData) => {
                    const image = await Jimp.read(imageData.data);
                    // Implement image processing logic as needed
                    // Example: Resize the image
                    image.resize(100, 100);
                    return image;
                })
                );
            
                // Combine processed images into a single image
                const combinedImage = processedImages.reduce((baseImage, processedImage) => {
                return baseImage.composite(processedImage, 0, 0); // Update with your desired coordinates
                }, await Jimp.create(100, 100)); // Create a base image with a size that fits your processing
            
                return combinedImage;
            }
    frontend(app.jsx):
                    
            import React, { useState, useEffect } from 'react';
            import axios from 'axios';

            const App = () => {
            const [images, setImages] = useState([]);
            const [selectedImageIds, setSelectedImageIds] = useState([]);
            const [combinedImage, setCombinedImage] = useState('');

            // Fetch images from the database on component mount
            useEffect(() => {
                const fetchImages = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/images');
                    setImages(response.data.images);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
                };

                fetchImages();
            }, []);

            const handleImageCombine = async () => {
                try {
                const response = await axios.post('http://localhost:5000/combine', {
                    selectedImageIds: selectedImageIds,
                });

                // Convert the ArrayBuffer to a Uint8Array
                const uint8Array = new Uint8Array(response.data);

                // Create a Blob from the Uint8Array
                const combinedBlob = new Blob([uint8Array], { type: 'image/jpeg' });

                // Set the combined image URL to be displayed
                setCombinedImage(URL.createObjectURL(combinedBlob));
                } catch (error) {
                console.error('Error combining images:', error);
                }
            };

            return (
                <div>
                <h2>Select Images</h2>
                {images.map((image) => (
                    <div key={image._id}>
                    <input
                        type="checkbox"
                        value={image._id}
                        onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedImageIds([...selectedImageIds, image._id]);
                        } else {
                            setSelectedImageIds(selectedImageIds.filter((id) => id !== image._id));
                        }
                        }}
                    />
                    <img src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(image.data)))}`} alt={image.filename} />
                    </div>
                ))}
                <button onClick={handleImageCombine}>Combine Images</button>
                {combinedImage && (
                    <div>
                    <h2>Combined Image</h2>
                    <img src={combinedImage} alt="Combined Image" />
                    </div>
                )}
                </div>
            );
            };

            export default App;

input for menu:  "items": [
    {
      "item_type": "Rice",
          "options": [
            "Chicken Pulao",
            "Chicken Biryani"
          ]
          
      
    },
    {
      "item_type": "Mutton Gravy",
      "options": [
"Mutton Qorma",
"Mutton White Qorma",
"Mutton Karahi"
      ]
        
    },    {
      "item_type": "Chicken Gravy",
      "options": [
"Chicken Jalfrezi",
"Chicken White Karahi"
      ]
        
    },
        {
      "item_type": "Kabab",
      "options": [
"Reshmi Seekh Kabab",
"Gola Kabab"
      ]
        
    },
       {
      "item_type": "Chicken Dry Item",
      "options": [
"Chicken Boti (BBQ)",
"Chicken Steam Roast"
      ]
        
    },
    {
      "item_type": "Salad",
      "options": [
"Russian Salad",
"Fresh Green Salad",
"Apple Cabbage Salad",
"Chicken Pineapple Salad",
"Macaroni Salad",
"Creamy Pasta Salad"
      ]
        
      
    },
    {
      "item_type": "Dessert",
      "options": 
       [ "Kheer",
       "Fruite Trifle"
       ]
      
    },
    {
      "item_type": "Roghni Naan",
    "options": [
      ]
    },    {
      "item_type": "Sauce",
    "options": [
        "Raita",
        "Mint Sauce"
      ]
    },
    {
      "item_type": "Tea",
    "options": [
"Green Tea",
"Pink Tea" 
      ]
    },{
      "item_type": "Soft Drinks",
    "options": [

      ]
    },
    {
      "item_type": "Mineral Water",
          "options": [
      ]
    }
  ]
            

Access key:AKIAQ3EGPBJMLZFW4U6W
secret key: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