import dbConnect from '../../config/dbConnect';
import { PostModel } from '../../models/posts.model';

dbConnect()

export default async (req, res)=>{
    if(req.method == "POST"){

        if(req.body.username){
            const post = new PostModel(req.body)
            post.save(err=>{
                if(err) res.status(400).end("database error")

                res.status(200).json({success: true})
            })
        } else{
            res.status(400).end()
        }
    } else{
        res.status(404).end("Method is not undefined.")
    }
}