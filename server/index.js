const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const jwt = require('jsonwebtoken');
const { createtoken } = require('./JWT');
const { authenticateToken } = require('./JWT');
require('dotenv').config();
const path = require("path")
const User = require('./models/User')
const Post = require('./models/Post')
const Category = require('./models/Category');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2 ;




app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors({
	origin: "*",
	credentials: true
}))

app.use(cookieParser());
app.use(fileUpload({
	useTempFiles:true
}))



const PORT = process.env.PORT || 5000 ;


mongoose.connect("mongodb+srv://sujaltagade01:eLF1KCzKwc1Kh9wx@cluster0.g6scxsi.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("connected to database successfully"))
	.catch((err) => console.log(err));



app.get('/', (req, res) => {
	res.json("All Good");
})



// REGISTER ACCOUNT
app.post("/register", async (req, res) => {

	try {

		const salt = await bcrypt.genSalt(10)
		const hashPass = await bcrypt.hash(req.body.password, salt)
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPass,
		});

		const user = await newUser.save();
		res.status(200).json({ message: "User registered successfully", user });
	} catch (err) {
		res.status(500).json(err)
	}
})

//LOGIN ACCOUNT
app.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username })

		if (!user) {
			return res.status(400).json("Wrong ceredentials")
		}

		const validate = await bcrypt.compare(req.body.password, user.password);

		if (!validate) {
			return res.status(400).json("Wrong credentials")
		}

		const { password, ...others } = user._doc;
		const {_id,username} = others ;
		const accesstoken = createtoken(_id,username) ;
		res.status(200).json({ message: "User logged in successfully",accesstoken})
	} catch (err) {
		res.status(500).json(err)
	}
})

//UPDATE ACCOUNT
app.put('/users/:id', async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt)
		}
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			}, { new: true });
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err)
		}
	} else {
		return res.status(401).json("You can update only you account");
	}
})

//DELETE ACCOUNT
app.delete('/users/:id', async (req, res) => {
	// if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			try {
				await Post.deleteMany({ username: user.username })
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("User Deleted")
			} catch (err) {
				return res.status(500).json(err)
			}
		} catch (err) { 
			return res.status(401).json("User not found");
		}
	// } 
	// else {
	// 	return res.status(401).json("You can update only you account");
	// }
})

// GET USER
app.get('/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others)
	}
	catch (err) {
		return res.status(500).json(err);
	}
})

// GET STATUS
app.get('/status',authenticateToken, async (req,res)=>{
	try{
		const username = req.user.username ;
		const user = await User.findOne({username},{password: 0}) ;
		if(!user){
			return res.status(404).json("User not found") ;
		}
		res.json(user) ;
	}
	catch(err){
		return res.status(500).json(err);
	}
})

// LOG OR NOT
app.get('/logOrNot', (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];
  
	if (!token) {
	  res.json({ loggedIn: false });
	} else {
	  try {
		const decoded = jwt.verify(token, "hdsufhdoufhewu8f8ewfjewuf9");
		res.json({ loggedIn: true });
	  } catch (err) {
		res.json({ loggedIn: false });
	  }
	}
  });



  cloudinary.config({ 
	cloud_name: 'dtsoqd1wr', 
	api_key: '834366412839724', 
	api_secret: 'maXxNTggT9teghy9t-tSiwkgWU8' 
  });



  



// CREATE POST

app.post('/createPost', async (req, res) => {
	const newPostData = req.body ;
	const newPost = new Post(newPostData) ;
	try{
		const savedPost = await newPost.save() ;
		res.status(200).json(savedPost)
	}catch(err){
		res.status(500).json(err) ;
	}
	
  });
  
  
  app.post("/upload", async (req, res) => {
	const file = req.files.photo
	await cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
		
		res.json(result.secure_url)
	})
  });
  







// UPDATE POST
app.put('/updatePost/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
					$set:req.body 				
				},
				{new:true}
				); 
				res.status(200).json(updatedPost) ;
			} catch (err) {
				return res.status(500).json(err)
			}	
		}else{
			return res.status(401).json("you can update only your post")
		}
	} catch (err) {
		return res.status(500).json(err);
	}
})

// DELETE POST
app.delete('/deletePost/:id',async (req,res)=>{
	try{
		const post = await Post.findById(req.params.id) ;
		if(post.username === req.body.username){
			const deletedPost = await Post.findByIdAndDelete(req.params.id) ;
			res.status(200).json({message:"Post deleted successfully",deletedPost})
		}
		else{
			return res.status(401).json("You can only delete your post")
		}
	}
	catch(err){
		return res.status(500).json(err) ;
	}	
})



// GET ALL POST
app.get('/AllgetPosts', async (req,res)=>{
	const username = req.query.user ;
	const catName = req.query.cat ;
	try{
		let posts ;
		if(username){
			posts = await Post.find({username}) 
		}else if(catName){
			posts = await Post.find({categories:{
				$in:[catName]
			}}) ;
		}else{
			posts = await Post.find() ;
		}
		res.status(200).json(posts) ;
	}catch(err){
		return res.status(500).json(err) ;
	}
})

// GET POST
app.get('/getPost/:id',async(req,res)=>{
	try{	
		const data = await Post.findById(req.params.id)
		res.status(200).json(data)
	}catch(err){
		return res.status(500).json(err) ;
	}
})


// CREATE NEW CATEGORY
app.post('/newCat',async (req,res)=>{
	const newCat = new Category(req.body);
	try{
		const saveCat = await newCat.save() ;
		res.status(200).json(saveCat) ;
	}catch(err){
		return res.status(500).json(err) ;
	}
})

// GET ALL CATEGORIES
app.get('/getAllCat',async (req,res)=>{
	try{
		 const categories = await Category.find() ;
		 res.status(200).json(categories) ; 
	}catch(err){
		return res.status(500).json(err);
	}
})








app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
})




// sujaltagade01
// eLF1KCzKwc1Kh9wx

// driver
// mongodb+srv://sujaltagade01:eLF1KCzKwc1Kh9wx@cluster0.g6scxsi.mongodb.net/?retryWrites=true&w=majority

// compass
// mongodb+srv://sujaltagade01:eLF1KCzKwc1Kh9wx@cluster0.g6scxsi.mongodb.net/