import React, { useState, useEffect } from 'react';
import styles from '../styles/index.module.css';
import Loading from '../components/loading';

const Home = () => {
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [])

  useEffect(()=>{
    setLoading(true)
    fetch("http://localhost:3000/api/listpost", {
      method: "POST"
    }).then(res=>res.json())
    .then(result=>{
      setPost(result.post.reverse())
      setLoading(false)
    })
  }, [])

  return (
    <>
    {loading?<Loading></Loading>:null}
    <div className={styles.container}>
      <div className={styles.containerOpacity}>
        <div className={styles.content_menu}>
          <span>โปรไฟล์ของฉัน</span>
        </div>

        <div className={styles.content}>
          <div className={styles.box}>
            {post.map((item, index)=>
              <div className={styles.mainBox} key={index}>

                <div className={styles.boxPoster}>
                  <img src={item.picture} alt=""/>
                  <span className={styles.name}>{item.username}</span>
                </div>

                <div className={styles.boxHeader}>
                  <span className={styles.title}>{item.title}</span>
                </div>

                <div className="postImg"></div>

                <div className={styles.boxContent}>
                  <div className={styles.rowLayout}>
                    <div className={styles.left}>
                      <span>สถานที่&nbsp; : &nbsp;&nbsp;{item.place?item.place:'-'}</span>
                      <span>ตั้งแต่&nbsp; : &nbsp;&nbsp;{item.timeStart?item.timeStart+' น.':'-'}</span>
                      <span>ถึง&nbsp; : &nbsp;&nbsp;{item.timeEnd?item.timeEnd+' น.':'-'}</span>
                    </div>
                    <div className={styles.right}>
                      <span>ระดับชั้น&nbsp; : &nbsp;&nbsp;{item.grade?item.grade:'-'}</span>
                      <span>เพศ&nbsp; : &nbsp;&nbsp;{item.gender?item.gender:'-'}</span>
                      <span>จำนวนผู้เข้าร่วม&nbsp; : &nbsp;&nbsp;{item.join}/{item.num}</span>
                    </div>
                  </div>

                </div>

                <style jsx>{`
                  .postImg{
                    background: url(${item.img?item.img:"/picEvent/default.jpg"});
                    background-size: cover;
                    width: 100%;
                    height: 250px;
                    background-position: ${item.img?"center":'50% 30%'};
                  }
                `}</style>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;