function upload (req, res){
    if (req.file.filename){
        res.status(201).json({
            message: 'image uploaded success',
            url: req.file.filename
        })
    }else{
        res.status(500).json({
            message: 'image uploaded failed'
        })
    }
}

module.exports = {
    upload: upload
}
