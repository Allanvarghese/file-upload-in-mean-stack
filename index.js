// requiring module
const expresss =require('express');
const cors = require('cors')
//import multer
const multer =require('multer')

const port =3000;

// express init
const app =expresss();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions))




//testing in dom
app.get('/',(req,res)=>{
    res.send('DOM working successfully')
})

//use of multer
//function to store
const storage= multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"uploads");
    },
    filename: function(req,file,callback){
        callback(null,`${Date.now()}--- ${file.originalname}` );
    }
})

const upload = multer({storage: storage})
//router
app.post('/file',upload.single("file"),(req,res)=>{
    //assign new file from req.file
    const file =req.file;

    //checking file is assigned or not
    if (file) {
        res.json(file) 
    }
    else{
        throw new Error('FILE upload unsuccessfull');
    }

})
//use multifiles
// app.post('/multifiles',upload.array("files"),(req,res)=>{
//     //assign new file from req.file
//     const files =req.files;

//     //checking files is assigned or not
//     if (Array.isArray(files) && files.length > 0) {
//         res.json(req.files) 
//     }
//     else{
//         // throw new Error('FILE upload unsuccessfull');
//     }

// })


app.post("/multiplefiles", upload.array("files"), function (req, res, next) {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
      res.json(req.files);
    } else {
      res.status(400);
      throw new Error("No file");
    }
  });

//listen to a port

app.listen(port,()=>{
    console.log(`express app running on port ${port}`);
})