import dbConnect from '../../config/dbConnect';
import { UserModel } from '../../models/users.model';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client("101046199020-qa3qkq13bvuancv94a1rcae0jlqmerlg.apps.googleusercontent.com")

dbConnect()

export default (req, res)=>{
    if(req.method == "POST"){
        switch(req.body.loginWith) {
            case 'google':
                function verify() {
                    return new Promise((resolve, reject)=>{
                        client.verifyIdToken({
                            idToken: req.body.token,
                            audience: "101046199020-qa3qkq13bvuancv94a1rcae0jlqmerlg.apps.googleusercontent.com"
                        }).then(response=>{
                            if(response) resolve(response.payload)
                            else reject("Token error")
                        });
                    })
                }
                
                verify().then(response=>{
                    if(response.email){
                        const users = UserModel.findOne({email: response.email})
                        
                        users.then(user=>{
                            if(user){
                                if(user.createdProfile) res.status(200).json({status: "success"})
                                else res.status(200).json({status: "createProfile"})
                            } else {
                                const insert = new UserModel({
                                    email: response.email,
                                    name: response.name,
                                    age: "",
                                    gender: "",
                                    picture: response.picture,
                                    grade: "",
                                    faculty: "",
                                    major: "",
                                })
                                insert.save((err, docs)=>{
                                    if(err){
                                        res.status(400).json({status: err})
                                    }

                                    res.status(200).json({status: "createProfile"})
                                })
                            }
                        })

                    } else res.status(400).json({status: res})
                })

                break;

            case 'facebook':
                fetch(`https://graph.facebook.com/debug_token?input_token=${req.body.token}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`)
                .then(response=>response.json())
                .then(result=>{
                    console.log(result.data)
                })

                break
            case 'smf':
                break;
            default:;
        }
    } else{
        res.status(400).end("Method is not undefined.")
    }
}