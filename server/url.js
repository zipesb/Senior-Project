const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
        // use modules such as express-fileupload, Multer, Busboy
    

    setTimeout(() => {
        console.log('url uploaded')
        return res.status(200).json({ result: true, msg: 'url uploaded' });
    });
})

module.exports = router;