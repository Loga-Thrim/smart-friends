import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login';

import styles from '../styles/login.module.css';

const register = () => {
    const router = useRouter()
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imgUrl: ""
    })
    function responseGoogle(res){
        const {name, email, imageUrl} = res.profileObj
        setProfile({name, email, imageUrl})
    }
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span className={styles.title}>เข้าร่วมกับ &nbsp;&nbsp;
                    <span>Smart</span> &nbsp;
                    <span>Friends</span>
                </span> <br/><br/><br/>

                <div className={styles.user_box}>
                    <input type="text" required />
                    <label>Username</label>
                </div>
                <div className={styles.user_box}>
                    <input type="password" required />
                    <label>Password</label>
                </div>
                <div className={styles.btn}><span className={styles.backgroundBtn}></span>เข้่าสู่ระบบ</div> <br/><hr/><br/>
                <GoogleLogin
                    clientId="695757163741-ut1lsv3604fnb0di8samm7g1ondh1e7i.apps.googleusercontent.com"
                    buttonText="เข้าสู่ระบบด้วย Google Account"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className={styles.googleBtn}
                /> <br/><br/>
                <div onClick={()=>router.push('register')} className={styles.btn}><span className={styles.backgroundBtn}></span>สมัครเข้าร่วม smart friends</div>  <br/><br/>
            </div>

            <div className={styles.backgroundPeople}></div>
        </div>
    );
}

export default register;
