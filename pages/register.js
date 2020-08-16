import React from 'react';
import styles from '../styles/register.module.css';

const register = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span>เข้าร่วมกับ &nbsp;&nbsp;
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
                <div className={styles.btn}><span className={styles.backgroundBtn}></span>สมัครเข้าร่วม smart friends</div> <br/><hr/><br/>
                <div className={styles.btn}><span className={styles.backgroundBtn}></span>เข้่าสู่ระบบ</div>
            </div>

            <div className={styles.backgroundPeople}></div>
        </div>
    );
}

export default register;
