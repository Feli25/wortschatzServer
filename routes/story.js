const express = require('express');
// const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Story = require('../models/Story')

router.get('/', (req,res,next)=>{
  Story.find()
    .then(story=>{
      res.json(story)
    })
    .catch(err => next(err))
})

router.get('/details/:id', (req,res,next)=>{
  let id = req.params.id
  Story.findById(id)
    .then(story=>{
      res.json(story)
    })
    .catch(err => next(err))
})

router.post('/new', (req,res,next)=>{
  let { header, assoziation, content, notes, wordIds } = req.body
  Story.create({
    header:header,
    assoziation:assoziation,
    content:content,
    notes:notes,
    wordIds:wordIds
  })
    .then(story => {
      res.json({
        success: true,
        story
      });
    })
    .catch(err => console.log(err))
})

router.post('edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, assoziation, content, notes, wordIds } = req.body
  Story.findByIdAndUpdate(id,{
    header:header,
    assoziation:assoziation,
    content:content,
    notes:notes,
    wordIds:wordIds
  })
    .then(story => {
      res.json({
        success: true,
        story
      });
    })
    .catch(err => console.log(err))
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id
  Story.findByIdAndDelete(id)
    .then(sth=>{
      res.json({
        success:true
      })
    })
    .catch(err => next(err))
})

module.exports = router;
