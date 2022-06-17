import express from "express";
export const router = express.Router();
import {Post} from '../models/Post.js'

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
//   res.send('We are on posts!')
})

router.post('/', async (req, res) => {
    
  const post = new Post({
    tite: req.body.title, 
    description: req.body.description
  })

  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({message: err})
  }
})

