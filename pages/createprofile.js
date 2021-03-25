import React, { useEffect, useState, useMemo } from 'react';
import { atom, useRecoilState} from 'recoil'
import Select from 'react-select'
import styles from '../styles/createprofile.module.css';
import University from '../json_api/university.json'


const menuAtom = atom({
    key: "menu",
    default: 1
})

const Createprofile = () => {
    const [universityOption, setUniversityOption] = useState([])

    useEffect(()=>{
        listUniversity()
    }, [])

    async function listUniversity() {
        const arr = []

        await asyncForEach(University, async snap=>{
            let item = { value: snap.university, label: snap.university }
            arr.push(item)
        })
        setUniversityOption(arr)
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerOpacity}>
                <div className={styles.content}>
                    <div style={{textAlign: 'center'}}>
                        <span className={styles.title}>สร้างโปรไฟล์ของคุณบน<br/>
                            <span>Smart</span> &nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Friends</span>
                        </span>  
                    </div> <br/>

                    <Menu1 university={universityOption} />
                    <Menu2></Menu2>
                </div>
            </div>
        </div>
    );
}

const Menu1 = ({university})=>{
    const [universityList, setUniversityList] = useState([])
    const [selectInput, setSelectInput] = useState("")
    const [optionSelect, setOptionSelect] = useState("none")
    const [form, setForm] = useState({
        universityName: "",
        faculty: "",
        major: "",
        grade: ""
    })

    const [menu, setMenu] = useRecoilState(menuAtom)

    useMemo(()=>{
        if(selectInput){
            setUniversityList(university)
            setOptionSelect("")
        } else setOptionSelect("none")
    }, [selectInput])

    const selectstyle = {
        menu: (provided, state)=>({
            ...provided,
            display: optionSelect,
        }),
        dropdownIndicator: ()=>({
            display: "none"
        }),
        control: (provided)=>({
            ...provided,
            height: 'auto',
            cursor: 'text'
        }),
        input: (provided, state)=>({
            ...provided,
            height: 'auto',
            fontSize: '1vw'
        }),
        placeholder: (provided)=>({
            ...provided,
            lineHeight: 25,
            fontSize: '1vw'
        }),
        valueContainer: (provided)=>({
            ...provided,
            lineHeight: "25px !important",
            fontSize: '1vw'
        }),
        singleValue: (provided)=>({
            ...provided,
            lineHeight: 25,
            fontSize: '1vw'
        }),
        option: (provided)=>({
            ...provided,
            fontSize: '1vw'
        })
    }
    
    return(
        <div className={styles.menu + ` ${menu==2?"hide":"show"}`}>
            <style jsx>{`
                .hide{
                    animation: menuHide 1s forwards; /* forwards */
                }
                @keyframes menuHide{
                    from{
                        left: 0;
                    }
                    to{
                        left: calc(-100% - 500px);
                        visibility: hidden;
                        position: absolute; 
                    }
                }

                .show{
                    animation: menuShow 1s forwards; /* forwards */
                }
                @keyframes menuShow{
                    from{
                        left: calc(-100% - 500px);
                        visibility: hidden;
                        position: absolute; 
                    }
                    to{
                        left: 0;
                        position: relative;
                        visibility: visible;
                    }
                }
            `}</style>

            <span>ชื่อมหาวิทยาลัยของคุณ</span> <br/>
            <div style={{color: 'black', fontSize: 16}}>
            <Select 
                onInputChange={e=>setSelectInput(e)} //setUniversityLength(universityLength+1)
                placeholder="ระบุชื่อมหาลัยของคุณ ..." 
                styles={selectstyle}
                options={universityList}
                onChange={e=>setForm({...form, universityName: e.value})}
                /> <br/>
            </div>
            <span>คณะ</span> <br/>
            <input type="text" placeholder="ระบุชื่อคณะที่คุณกำลังศึกษา ..." 
            onChange={e=>setForm({...form, faculty: e.target.value})} className={styles.input} /> <br/><br/>

            <span>สาขา</span> <br/>
            <input type="text" placeholder="ระบุชื่อสาขาที่คุณกำลังศึกษา ..." 
            onChange={e=>setForm({...form, major: e.target.value})} className={styles.input} /> <br/><br/>

            <span>ชั้นปี</span> <br/>
            <select className={styles.input} style={{width: '15%', padding: 2}} onChange={e=>setForm({...form, grade: e.target.value})}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            
            <button className={styles.btn} onClick={()=>{
                setMenu(2)
            }}>ถัดไป</button>
        </div>
    );
}

const Menu2 = ()=>{
    const [menu, setMenu] = useRecoilState(menuAtom);

    return(
        <div className={styles.menu + ` ${menu==2?"show":"hide"}`}>
            <style jsx>{`
                .hide{
                    position: relative;
                    animation: menuHide 1s forwards;
                }
                @keyframes menuHide{
                    from{
                        right: 0;
                    }
                    to{
                        right: calc(-100% - 30px);
                        position: absolute;
                        visibility: hidden;
                    }
                }
                .show{
                    position: relative;
                    display: block;
                    right: calc(-100% - 30px);
                    animation: menuShow 1s forwards .3s;
                }

                @keyframes menuShow{
                    from{
                        right: calc(-100% - 30px);
                    }
                    to{
                        right: 0;
                    }
                }
            `}</style>

            menu 2 <br/>
            menu 2 <br/>
            menu 2 <br/>
            menu 2 <br/><br/>

            <button className={styles.btn} onClick={()=>setMenu(1)} style={{left: 0}}>ก่อนหน้า</button>
        </div>
    )
}

export default Createprofile;