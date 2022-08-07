const fs = require('fs');

exports.download =(req, res, next) => {

    console.log('fileController.download: Star')
    const path = req.body.path
    const file = fs.createReadStream(path)
    const filename ='1659615581120-71745a85.pdf'
    res.setHeader('Content-Disposition', 'attachment:filename="'+filename+'"')
    file.pipe(res);
}