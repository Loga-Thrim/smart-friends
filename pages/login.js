import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Recaptcha from 'react-google-invisible-recaptcha';

import styles from '../styles/auth.module.css';

const register = () => {
    const router = useRouter()
    const [ref, setRef] = useState("")
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imgUrl: ""
    })

    function responseGoogle(res){
        const {name, email, imageUrl} = res.profileObj
        setProfile({name, email, imageUrl})

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                loginWith: 'google',
                token: res.tokenId
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result.status)

            if(result.status == "createProfile") router.push("/createprofile");
            else if(result.status == "success") router.push("/")
        })
    }

    function responseFacebook(res){
        console.log(res)
        
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                loginWith: 'facebook',
                token: res.accessToken
            })
        })/* .then(res=>res.json())
        .then(result=>{
            console.log(result)
        }) */
    }

    function login(e){
        alert("Here")
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div>
                    <span className={styles.title}>เข้าร่วมกับ &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Smart</span> &nbsp;&nbsp;
                        <span>Friends</span>
                    </span>     
                </div>
                <br/><br/>

                <form onSubmit={(e)=>{
                    e.preventDefault()
                    ref.execute()
                }}>
                    <div className={styles.user_box}>
                        <input type="text" required />
                        <label>Email address</label>
                    </div>
                    <div className={styles.user_box}>
                        <input type="password" required />
                        <label>Password</label>
                    </div>
                    <button type="submit" className={styles.btn}><span className={styles.backgroundBtn}></span>เข้าสู่ระบบ</button> <br/><hr/><br/>
                </form>

                <GoogleLogin
                    clientId="101046199020-qa3qkq13bvuancv94a1rcae0jlqmerlg.apps.googleusercontent.com"
                    buttonText="เข้าสู่ระบบด้วย Google Account"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className={styles.googleBtn}
                /> <br/><br/>
                <FacebookLogin
                    appId="916359325498494"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={()=>console.log("clicked")}
                    callback={responseFacebook} 
                    textButton="เข้าสู่ระบบด้วย Facebook Account"
                    cssClass={styles.facebookBtn}
                /> <br/><br/>
                <div onClick={()=>router.push('register')} className={styles.btn}><span className={styles.backgroundBtn}></span>สมัครบัญชี smart friends</div>

                <Recaptcha
                    ref = {ref => setRef(ref)}
                    sitekey = "6LdJm78ZAAAAAIwUNTv6gdBoBRcf1vNSBEH-N1FQ"
                    onResolved = {login}
                />
            </div>

            <div className={styles.backgroundPeople}></div>
        </div>
    );
}

export default register;
