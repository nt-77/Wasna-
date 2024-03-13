import mongoose from 'mongoose';
import bycrypt from 'bcryptjs'


const bookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true
    }
)

const userSchema =mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'please add a name'],
        },
        email:{
            type:String,
            required:[true, 'please add a email'],
            unique:true,
            trim:true,
            match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please enter a valid email'
            ]
        },
        password:{
            type:String,
            required:[true, 'please add a password'],
            minLength:[6,"please enter a password of atleast 6 characters" ]
        },
        bio:{
            type:String,
            // required:[true, 'please add bio'],
            default:"bio",
            maxLength:[250, "bio must not be more then 250 characters"]
        },
        photo:{
            type:String,
            required:[true, 'please add a photo'],
            default:"https://i.ibb.co/4pDNDk1/avatar.png",
        },

    },
    {
        timestamps:true
    }
)
//modify the user before saving it in the database
    userSchema.pre("save",async function(next){
        // if(!this.isModified("password")){
        //     return next()
        // }
        //encrypt password
        const salt=await bycrypt.genSalt(10);
        const encryptedPassword= await bycrypt.hash(this.password, salt);
        this.password=encryptedPassword;
        next()
    })



    const decorSchema =mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, 'please add a name'],
              },
              item_type: {
                type: String,
                required: [true, 'please add the item type'],
              },
              quantity: {
                type: Number,
                required: [true, 'please add total quantity'],
              },
              image: {
                filename: String,
                contentType: String,
                data: String,
              }
            },
        {
            timestamps:true
        }
    )
    const CateringSchema =mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, 'please add a name'],
              },
              price: {
                type: Number,
                required: [true, 'please add the item type'],
              },
              weight: {
                type: Number,
                required: [true, 'please add weight'],
              },vendor :{
                type: String,
                required: [true, 'please add a vendor'],
              }
            },
        {
            timestamps:true
        }
    )

    // Menu Schema
// const MenuSchema = mongoose.Schema(
//     {
//     title: String,
//     category: String,
//     description: String,
//     price: Number,
//     items: [
//       {
//         item_type: String,
//         options: 
//           [
//             {options:{String}},
//       ],

//       },
//     ],
//   });

const MenuSchema = mongoose.Schema(
    {
    title: String,
    category: String,
    description: String,
    price: Number,
    items: [
        {
          item_type: String,
          options: [String]
        },
    ],
  });

  const CustumMenuSchema = mongoose.Schema(
    {
    title: String,
    category: String,
    description: String,
    price: Number,
    items: [
        {
          item_type: String,
          option:[String],
        },
    ],
  });

    // //when storing one image in the database
    // const imageSchema = new mongoose.Schema({
    //     filename: String,
    //     contentType: String,
    //     data: Buffer,
    //   });
      

export const Book= mongoose.model('book', bookSchema)       //creating book model for database
export const User= mongoose.model('user', userSchema)       //creating book model for database
export const Decor= mongoose.model('decor', decorSchema)       //creating book model for database
export const Menu= mongoose.model('menu', MenuSchema)       //creating book model for database
export const CustomMenu= mongoose.model('customMenu', CustumMenuSchema)       //creating book model for database
// export const Image= mongoose.model('image', imageSchema)       //creating book model for database