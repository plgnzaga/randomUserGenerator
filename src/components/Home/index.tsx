import axios from "axios";
import React, { ReactElement, useEffect, useReducer, useState } from "react";
import { HiOutlineSparkles  } from "react-icons/hi2";
import userInfoComponent from "./UserInfoComponent";

const Home = () => {
    
    const INITIAL_STATE: InitialState = {
        userInfo:[],
        isLoading:false
    }

    const reducer = (state:any,action:{type:string,payload:[]}) => {
        switch(action?.type){
            case "FETCH_USERS" :
                return {
                    ...state,
                    userInfo:action.payload
                }
            case "VIEW_USER" :
                return {
                    ...state,
                    values:action.payload
                }
            case "REMOVE_USER" :
                return {
                    ...state,
                    
                }
            case "RESET_FIELD":
                return{
                    ...state
                }
            default:
                return state;
        }
    }

    interface InitialState {
        userInfo:[],
        isLoading:boolean,

    }

    interface UserInfoResponse {
        email: string,
        fullname: string,
        location: string,
        contact: string | number,
        age: number,
        imgSrc: string
    }
    
    const [state,dispatch] = useReducer(reducer,INITIAL_STATE);

    const [userInfo, setUserInfo] = useState<UserInfoResponse[]>([]);
    const [usersHistory, setUsersHistory] = useState<UserInfoResponse[]>([]);

    const fetchUserInfo = async () => {
        try {
            const { data } = await axios.get(`https://randomuser.me/api`);
            let result = data.results.map((i: any) => {
                return {
                    email: i.email,
                    fullname: `${i.name.first} ${i.name.last}`,
                    location: `${i.location.city} ${i.location.state} ${i.location.country}`,
                    contact: i.phone,
                    age: i.dob.age,
                    imgSrc: i.picture.large
                }
            });
            dispatch({type:'FETCH_USERS',payload:result})
            //setUserInfo(result);
            
        } catch (error) {

        }
    }

    const saveToLocalStorage = () => {
        setUsersHistory(prev => [...state.userInfo,...prev]);
        localStorage.setItem("user-info",JSON.stringify(usersHistory))
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])
    
    useEffect(() => {
        saveToLocalStorage();
    },[state.userInfo])

    return <>
        <section className="wrapper">
            <div className="container">
                <section className="profile-section d-grid">
                    {/* {JSON.stringify(state.userInfo)} */}
                    {state.userInfo?.map((x:any) =>
                        <>
                            <div className="image-holder">
                                <img src={x.imgSrc} className="profile-pic"></img>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h2>{x.fullname}</h2>
                            </div>
                            {userInfoComponent("Mail", <a href={`mailto:${x.email}`} target="_blank">{x.email}</a>)}
                            {userInfoComponent("Location", x.location)}
                            {userInfoComponent("Contact", x.contact)}
                            {userInfoComponent("Age", x.age)}
                        </>
                    )}
                   
                    <button className="generate" onClick={() => {
                        fetchUserInfo();
                    }}>
                        <div style={{display:'flex',justifyContent:'center'}}>
                        Generate <HiOutlineSparkles style={{fontSize:'1rem'}}/>
                        </div>
                    </button> 
                </section>
                <section className="user-log-section">
                    <div style={{display:"flex"}}>
                    <div style={{flexGrow:'1'}}><strong>Generated User Logs</strong></div>
                    <div style={{flexGrow:'1',textAlign:'right'}}><b>Count:{usersHistory?.length}</b></div>
                    </div>
                    <div>
                        <div className="user-log-header">
                            <section>Profile Image</section>
                            <section>Fullname</section>
                            <section>Mail</section>
                            <section>Location</section>
                            <section>Contact</section>
                            <section>Age</section>
                        </div><div className="user-log">
                        {usersHistory.map((item) => 
                            <>
                                <section><img src={item.imgSrc} className="profile-pic-xs"></img></section>
                                <section>{item.fullname}</section>
                                <section>{item.email}</section>
                                <section>{item.location}</section>
                                <section>{item.contact}</section>
                                <section>{item.age}</section>
                           </> 
                        )}
                         </div>   
                    </div>
                </section>
            </div>
        </section>
    </>
}

export default Home;