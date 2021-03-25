import formidable from 'formidable';

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async (req, res)=>{
    if(req.method == "POST"){
        
        if(req){
            const form = new formidable.IncomingForm();
            form.uploadDir = "./public/picEvent";
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                if(err) res.status(404).json({success: false})
                const imgName = files.img._writeStream.path.slice(16)
                
                res.status(200).json({imgName})
            });
        } else{
            res.status(400).end()
        }
    } else{
        res.status(404).end("Method is not undefined.")
    }
}