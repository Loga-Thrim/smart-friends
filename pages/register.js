import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Recaptcha from 'react-google-invisible-recaptcha';
import styles from '../styles/auth.module.css';

const register = () => {
    const [ref, setRef] = useState("")
    const router = useRouter()

    function register(){
        console.log("Resolved")
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span className={styles.title}>เข้าร่วมกับ &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Smart</span> &nbsp;&nbsp;
                    <span>Friends</span>
                </span> <br/><br/><br/>

                <div className={styles.user_box}>
                    <input type="text" required />
                    <label>Email address</label>
                </div>
                <div className={styles.user_box}>
                    <input type="password" required />
                    <label>Password</label>
                </div>
                <div className={styles.user_box}>
                    <input type="password" required />
                    <label>Confirm password</label>
                </div>

                <div onClick={()=>ref.execute()} className={styles.btn}><span className={styles.backgroundBtn}></span>สมัครเข้าร่วม smart friends</div> <br/><hr/><br/>
                <div onClick={()=>router.push("login")} className={styles.btn}><span className={styles.backgroundBtn}></span>เข้าสู่ระบบ</div>

                <Recaptcha
                    ref = {ref => setRef(ref)}
                    sitekey = "6LdJm78ZAAAAAIwUNTv6gdBoBRcf1vNSBEH-N1FQ"
                    onResolved = {register}
                />
            </div>

            <div className={styles.backgroundPeople}></div>
        </div>
    );
}

export default register;
