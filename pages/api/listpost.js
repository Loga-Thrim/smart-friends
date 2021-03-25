import dbConnect from '../../config/dbConnect';
import { PostModel } from '../../models/posts.model';

dbConnect()

export default async (req, res)=>{
    if(req.method === "POST"){
        PostModel.find({}, (err, result)=>{
            if(err) res.status(404).json({success: false, err})

            res.status(200).json({post: result})
        })
    } else res.status(404).json({success: false, err: "method is not available"})
}