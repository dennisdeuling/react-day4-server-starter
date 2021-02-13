const express = require('express');
const router = express.Router();

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup.config');

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
	// console.log('file is: ', req.file)

	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	// get image_url from the file object and save it in the
	// variable 'image_url', but this can be any name, just make sure you remember to use the same in frontend
	res.json({image_url: req.file.path});
});

module.exports = router;
