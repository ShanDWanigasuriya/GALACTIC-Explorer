const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Image = require('../model/Image');
const { verifyToken } = require('../middleware/authMiddleware');

// Route to add an image to a collection
router.post('/spaceCollection/add', async (req, res) => {
    try {
        const { idNo, title, imageUrl, collection } = req.body;
        const newImage = new Image({ idNo, title, imageUrl, collection });
        await newImage.save();
        res.status(201).send('Image added to collection');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to fetch all images from the database
router.get('/spaceCollection/all', async (req, res) => {
    try {
        // Find all images in the database
        const images = await Image.find();

        // Check if images were found
        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found in the database.' });
        }

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/spaceCollection/searchById/:idNo', async (req, res) => {
    try {
        let { idNo } = req.params;

        // Remove any leading colon (:) characters from the collection name
        idNo = idNo.replace(/^:/, '');

        // Find all images with the specified collection name
        const images = await Image.find({ idNo });

        // Check if images were found
        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found for this collection.' });
        }

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route to search images based on collection, idNo, or title
router.get('/spaceCollection/searchbyAny/:value', async (req, res) => {
    try {
        let { value } = req.params;

        // Remove any leading colon (:) characters from the collection name
        value = value.replace(/^:/, '');

        let images;

        // Check if the value matches an image ID (assuming ID is a string)
        images = await Image.find({ idNo: value });

        // If no images found by ID, search by collection name or image title
        if (!images || images.length === 0) {
            images = await Image.find({
                $or: [
                    { collection: value },
                    { title: { $regex: new RegExp(value, 'i') } } // Case-insensitive title search
                ]
            });
        }

        // Check if images were found
        if (images && images.length > 0) {
            res.status(200).json(images);
        } else {
            res.status(404).json({ message: 'Image not found.' });
        }
    } catch (error) {
        console.error('Error searching images:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.delete('/spaceCollection/delete/:id', async (req, res) => {
    try {
        let { id } = req.params;

        // Remove any leading colon (:) characters from the id
        id = id.replace(/^:/, '');

        // Check if the provided id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid image ID.' });
        }

        // Find and delete the image by id
        const deletedImage = await Image.findByIdAndDelete(id);

        // Check if image was found and deleted
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        res.status(200).json({ message: 'Image deleted successfully.' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
