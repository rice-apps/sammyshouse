const express = require('express');
const imageRouter = express.Router();
const mongoose = require('mongoose');
const Image = require('../model/image');

module.exports = (mongoUrl, upload) => {
    const url = mongoUrl;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;
    connect.once('open', () => {
        // Initialize stream.
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });

    // Upload a single image.
    imageRouter.route('/')
        .post(upload.single('file'), (req, res, next) => {
            console.log(req.body);
            // check for existing images
            Image.findOne({ caption: req.body.caption })
                .then((image) => {
                    console.log(image);
                    if (image) {
                        return res.status(200).json({
                            success: false,
                            message: 'Image already exists',
                        });
                    }

                    let newImage = new Image({
                        caption: req.body.caption,
                        filename: req.file.filename,
                        fileId: req.file.id,
                    });

                    newImage.save()
                        .then((image) => {

                            res.status(200).json({
                                success: true,
                                image,
                            });
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })
        .get((req, res, next) => {
            Image.find({})
                .then(images => {
                    res.status(200).json({
                        success: true,
                        images,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    // Get the most recent image.
    imageRouter.route('/recent')
        .get((req, res, next) => {
            Image.findOne({}, {}, { sort: { '_id': -1 } })
                .then((image) => {
                    res.status(200).json({
                        success: true,
                        image,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    // Update multiple files.
    imageRouter.route('/multiple')
        .post(upload.array('file', 3), (req, res, next) => {
            res.status(200).json({
                success: true,
                message: `${req.files.length} files uploaded successfully`,
            });
        });

    // Get a file by filename.
    imageRouter.route('/file/:filename')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                res.status(200).json({
                    success: true,
                    file: files[0],
                });
            });
        });

    // Get image by file ID.
    imageRouter.route('/getImageById/:id')
        .get(async (req, res, next) => {
            const image = await Image.findOne({ fileId: req.params.id });

            gfs.find({ filename: image.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(files[0].filename).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });

    // Delete image by file ID.
    imageRouter.route('/deleteImage/:id')
        .post((req, res, next) => {
            console.log(req.params.id);
            gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
                if (err) {
                    return res.status(404).json({ err: err });
                }

                res.status(200).json({
                    success: true,
                    message: `File with ID ${req.params.id} is deleted`,
                });
            });
        });

    return imageRouter;
};