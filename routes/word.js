const express = require('express');
// const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Word = require('../models/Word')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/', (req,res,next)=>{
  Word.find()
    .then(word=>{
      res.json(word)
    })
    .catch(err => next(err))
})

router.get('/details/:id', (req,res,next)=>{
  let id = req.params.id
  Word.findById(id)
    .then(word=>{
      res.json(word)
    })
    .catch(err => next(err))
})

router.post('/new', (req,res,next)=>{
  let { header, assoziation, notes, type } = req.body
  Word.create({
    header:header,
    assoziation:assoziation,
    notes:notes,
    type:type
  })
    .then(word => {
      res.json({
        success: true,
        word
      });
    })
    .catch(err => console.log(err))
})

router.post('/new-pic', parser.single('picture'), (req,res,next)=>{
  let { header, assoziation, notes, type } = req.body
  let file = req.file
  Word.create({
    imgPath:file.url,
    imgName:file.originalname,
    public_id:file.public_id,
    header:header,
    assoziation:assoziation,
    notes:notes,
    type:type
  })
    .then(word => {
      res.json({
        success: true,
        word
      });
    })
    .catch(err => console.log(err))
})

router.post('edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, assoziation, notes, type } = req.body
  Word.findByIdAndUpdate(id,{
    header:header,
    assoziation:assoziation,
    notes:notes,
    type:type
  })
    .then(word => {
      res.json({
        success: true,
        word
      });
    })
    .catch(err => console.log(err))
})

router.post('edit-pic/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, assoziation, notes, type, public_id } = req.body
  cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
  let file = req.file;

  Word.findByIdAndUpdate(id,{
    imgPath:file.url,
    imgName:file.originalname,
    public_id: file.public_id,
    header:header,
    assoziation:assoziation,
    notes:notes,
    type:type
  })
    .then(word => {
      res.json({
        success: true,
        word
      });
    })
    .catch(err => console.log(err))
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id
  Word.findById(id)
  .then(word=>{
    if(word.public_id){
      cloudinary.v2.uploader.destroy(word.public_id, function(result) { console.log(result) });
    }
  })
  .then(sth=>{
    Word.findByIdAndDelete(id)
    .then(sth=>{
      res.json({
        success:true
      })
    })
    .catch(err => next(err))
  })
  .catch(err=>console.log(err))
})

module.exports = router;
