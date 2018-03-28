const Photo = require('../models/Photo')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = {
  create: function (req, res) {
    let decode = jwt.verify(req.headers.token, 'secret')
    // console.log(decode)
    Photo.create({
      caption: req.body.caption,
      imageUrl: req.file.cloudStoragePublicUrl,
      user: mongoose.Types.ObjectId(decode.id) 
    })
    .then(photo => {
      res.status(200).json({
        message: 'photo posted',
        photo
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'unable to post photo',
        err
      })
    })
  },
  getAllPhotos: function (req, res) {
    Photo.find()
      .populate('user')
      .populate('like')
      .sort('-createdAt')
      .exec()
      .then(photo => {
        res.status(200).json({
          message: 'all photos retrieved',
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to retrieve photos',
          err
        })
      })
  },
  editCaption: function (req, res) {
    let decode = jwt.verify(req.headers.token, 'secret')
    // console.log(decode)
    Photo.findOneAndUpdate({ _id: req.params.id, user: decode.id} , {
      caption: req.body.caption
    })
      .exec()
      .then(photo => {
        res.status(200).json({
          message: 'photo updated',
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to update photo',
          err
        })
      })
  },
  deletion: function (req, res) {
    let decode = jwt.verify(req.headers.token, 'secret')
    // console.log(decode)
    Photo.findOneAndRemove({ _id: req.params.id, user: decode.id })
      .exec()
      .then(photo => {
        res.status(200).json({
          message: 'photo deleted',
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to delete photo',
          err
        })
      })
  },
  like: function (req, res) {
    let decode = jwt.verify(req.headers.token, 'secret')
    Photo.findOne({_id: req.params.id})
      .exec()
      .then(photo => {
        if (decode.id != photo.user){
          let index = photo.like.indexOf(decode.id)
          if (index === -1) {
            photo.like.push(decode.id)
            photo.save()
            res.status(200).json({
              message: 'photo liked',
              photo
            })
          } else {
            let del = photo.like.indexOf(decode.id)
            photo.like.splice(del, 1)
            photo.save()
            res.status(200).json({
              message: 'photo has been unliked',
              photo
            })
          }
        } else {
          res.status(200).json({
            message: 'cannot like own photo',
            photo
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to like photo',
          err
        })
      })
  }
}