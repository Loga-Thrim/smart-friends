import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Select from 'react-select';
import styles from '../styles/post.module.css';
import Loading from '../components/loading';
import { VscChromeClose } from 'react-icons/vsc';

const choosePicPopupState = atom({
    key: 'choosePicPopup',
    default: 0
})

const ImagePreviewState = atom({
    key: 'imgPreview',
    default: null
})

function useOutsideAlerter(ref) {
    const [choosePicPopup, setChoosePicPopup] = useRecoilState(choosePicPopupState)

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setChoosePicPopup(0)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const post = () => {
    const router = useRouter()
    const [choosePicPopup, setChoosePicPopup] = useRecoilState(choosePicPopupState)
    const [preview, setPreview] = useRecoilState(ImagePreviewState)
    const [uploadPic, setUploadPic] = useState(null)

    const [loading, setLoading] = useState(false);

    const [screenWidth, setScreenWidth] = useState(0)

    const [post, setPost] = useState({
        username: "logathrim",
        title: "",
        place: "",
        timeStart: "",
        timeEnd: "",
        gender: "ทุกเพศ",
        grade: "ทุกชั้นปี",
        num: "10",
        join: "1",
        img: ""
    })

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const gender = [
        { value: 'ทุกเพศ', label: 'ทุกเพศ' },
        { value: 'ชาย', label: 'ชาย' },
        { value: 'หญิง', label: 'หญิง' },
    ]
    const grade = [
        { value: 'ทุกชั้นปี', label: 'ทุกชั้นปี' },
        { value: '1', label: 'ปี 1' },
        { value: '2', label: 'ปี 2' },
        { value: '3', label: 'ปี 3' },
        { value: '4', label: 'ปี 4' },
    ]
    const img = [1, 2, 3, 4, 5]

    useEffect(()=>{
        if(uploadPic){
            const objUrl = URL.createObjectURL(uploadPic)
            setPreview(objUrl)
        }
    }, [uploadPic])

    useEffect(()=>{
        setPost({...post, img: preview})
    }, [preview])

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    useLayoutEffect(()=>{
        function updateSize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    function chooseUploadPic(e){
        setUploadPic(e.target.files[0])
        setChoosePicPopup(0)
    }

    function fPost(){
        setLoading(true);
        const formData = new FormData();
        formData.append("img", uploadPic)

        if(preview == "/picEvent/1.jpg" || preview == "/picEvent/2.jpg" || preview == "/picEvent/3.jpg"
        || preview == "/picEvent/4.jpg" || preview == "/picEvent/5.jpg" || preview == "" || preview === null){
            fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(res=>{
                if(res.status === 200){
                    res.json().then(result=>{
                        setLoading(false)
                        router.push("/")
                    })
                }
            })
        } else{
            fetch("http://localhost:3000/api/postimage", {
                method: "POST",
                body: formData
            }).then(res=>{
                if(res.status === 200){
                    res.json().then(result=>{
                        const {username, title, place, timeStart, timeEnd, gender, grade, num} = post

                        fetch("http://localhost:3000/api/post", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                                username, title, place, timeStart, timeEnd, gender, grade, num,
                                img: `/picEvent/${result.imgName}`
                            })
                        }).then(res=>{
                            if(res.status === 200){
                                res.json().then(data=>{
                                    setLoading(false)
                                    router.push("/")
                                })
                            }
                        })
                    })
                }
            })
        }

    }

    return (
        <>
        {loading?<Loading></Loading>:null}
        <div className={styles.container}>
            {choosePicPopup ? (
                <div className={styles.choosePic}>
                    <div className={styles.choosePicContent} ref={wrapperRef}>
                        <span className={styles.title}>เลือกรูปภาพกิจกรรม</span>
                        <div className={styles.cross} onClick={()=>setChoosePicPopup(0)}>
                            <VscChromeClose />
                        </div> <br/><br/><br/>
                        <label htmlFor="upload-img" className={styles.btnUploadImg}>+&nbsp; อัพโหลดรูปภาพ</label>
                        <input type="file" id="upload-img" style={{display: 'none'}} onChange={chooseUploadPic} /> <br/><br/>
                        <span>คุณสามารถเลือกรูปภาพที่เราเตรียมไว้ให้</span> <br/><br/>

                        <div style={{lineHeight: '40px', position: 'relative', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                            {img.map(n => 
                                <span style={{width: '31%', padding: '1%'}}>
                                    <ImgList url={n} key={n}></ImgList>
                                </span>
                            )}
                        </div>
                    </div> <br/><br/>
                </div>
            ) : null}

            <div className={styles.containerOpacity}>
                <div className={styles.content}>

                    <span className={styles.title}>โพสต์กิจกรรมของคุณ</span> <br/><br/>
                    <p>ชื่อกิจกรรม</p>
                    <input type="text" className={styles.input} required value={post.title} onChange={e=>setPost({...post, title: e.target.value})} placeholder="ระบุหัวข้อหรือชื่อกิจกรรมของคุณ ..." /> <br/><br/><br/>
                    <span>* ท่านสามารถเลือกระบุเพียงส่วนใดส่วนหนึ่งก็ได้</span> <br/>
                    <p>สถานที่</p>
                    <input type="text" className={styles.input} value={post.place} onChange={e=>setPost({...post, place: e.target.value})} placeholder="ระบุสถานที่ในการทำกิจกรรมของคุณ ..." /> <br/><br/>
                    <p>ช่วงเวลา</p>
                    <span style={{paddingRight: "4%"}}>ตั้งแต่</span>
                    <input type="time" className={styles.inputTime} value={post.timeStart} onChange={e=>setPost({...post, timeStart: e.target.value})} /> <br/><br/>
                    <span style={{paddingRight: "4%"}}>ถึง</span>
                    <input type="time" className={styles.inputTime} value={post.timeEnd} onChange={e=>setPost({...post, timeEnd: e.target.value})} /> <br/><br/>
                    <p>เพิ่มรูปภาพกิจกรรม</p>
                    <button type="button" className={styles.addImg} onClick={()=>setChoosePicPopup(1)}>เลือกรูปภาพกิจกรรม</button> <br/>
                    {!preview ? <div className={styles.preImg}>preview รูปภาพกิจกรรม</div> : null}
                    <img src={preview} className={styles.preview} />
                    <br/>

                    {(screenWidth > 420)?(
                        <>
                            <p>ชั้นปี</p>
                            <div className={styles.selectOption}>
                                <Select placeholder="ชั้นปั ..." options={grade} defaultValue={grade[0]} onChange={e=>setPost({...post, grade: e.value})} />
                            </div> 
                            <p>เพศ</p>
                            <div className={styles.selectOption}>
                                <Select placeholder="เพศ ..." options={gender} defaultValue={gender[0]} onChange={e=>setPost({...post, gender: e.value})} />
                            </div>
                        </>
                    ): (
                        <>
                            <p>ชั้นปี</p>
                            <select>
                                <option value={grade[0].value}>{grade[0].label}</option>
                                <option value={grade[1].value}>{grade[1].label}</option>
                                <option value={grade[2].value}>{grade[2].label}</option>
                                <option value={grade[3].value}>{grade[3].label}</option>
                                <option value={grade[4].value}>{grade[4].label}</option>
                            </select>
                            <p>เพศ</p>
                            <select>
                                <option value={gender[0].value}>{gender[0].label}</option>
                                <option value={gender[1].value}>{gender[1].label}</option>
                                <option value={gender[2].value}>{gender[2].label}</option>
                            </select>
                        </>
                    )}

                    <br/><br/>
                    <span>จำนวนผู้เข้าร่วม</span>
                    <span style={{paddingLeft: 25}}></span>
                    <input type="number" defaultValue="10" onChange={(e)=>setPost({...post, num: e.target.value})} className={styles.num} />

                    <br/><br/><br/>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <button className={styles.btnPost} onClick={fPost}>โพสต์</button> <br/><br/>
                    </div> <br/>
                </div>
            </div>
        </div>
        </>
    );
}

const ImgList = (props)=>{
    const [choosePicPopup, setChoosePicPopup] = useRecoilState(choosePicPopupState)
    const [localPreview, setLocalPreview] = useRecoilState(ImagePreviewState)

    function choosePicLocal(e){
        setLocalPreview(`/picEvent/${props.url}.jpg`)
        setChoosePicPopup(0)
    }

    return(
        <div className="imgList" onClick={choosePicLocal}>
            <style jsx>{`
                .imgList{
                    background: url("/picEvent/${props.url}.jpg");
                    background-size: cover;
                    background-position: center;
                    height: 120px;
                    cursor: pointer;
                }

                @media only screen and (max-width: 400px){
                    .imgList{
                        height: 100px;
                    }
                }
            `}</style>
        </div>
    )
}

export default post;