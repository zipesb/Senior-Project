const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
        // use modules such as express-fileupload, Multer, Busboy
    

    setTimeout(() => {
        console.log(req.body);
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    });
})

module.exports = router;