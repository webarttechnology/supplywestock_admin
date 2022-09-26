import React, { useEffect, useState } from 'react'
import Messagefedd from '../components/Messagefedd'
import MessSidBar from '../components/MessSidBar'
import { io } from "socket.io-client";
import { URL } from '../Api/constant';
import * as API from "../Api/index";
const initial = {
message: "",
};

const Message = () => {
 const socket = io("http://api.supplywestock.com:3001");
 console.log("socket", socket);
    const [userList, setUserList] = useState([])
    const [feedMess, setFeedMess] = useState([])
    const [formData, setFormData] = useState(initial)
    const [userDetails, setUserDetails] = useState([])
    const [chatCode, setChatCode] = useState("")
    const [text, setText] = useState("");
    const [typeData, setTypeData] = useState("")
    const [typeUserid, setTypeUserid] = useState("")
    const [typeId, setTypeId] = useState("")

    const messageHandaler = (data) => {  
        socket.emit('typing', {user: data === "" ? "" : localStorage.getItem("_userId"), typing: data === "" ? false : true})
        setText(data)
    }

    const chatRoomShow = async() =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatRoomlist(localStorage.getItem("_userId"), header) 
            console.log("responsedf", response);
            setUserList(response.data.data)
        } catch (error) {
            
        }
   } 


   const chatShowIng = async (chatCodeid, userDet) => {
        setUserDetails(userDet)
        setChatCode(chatCodeid)
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatfeedShow(chatCodeid, header)
            console.log("sssresponse", response);
            setFeedMess(response.data.data)
        } catch (error) {
            
        }
   }  


   const handalerChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleOnEnter(text) {
    console.log("chatCode", chatCode);
    socket.emit("createChat", {
        senderId: localStorage.getItem("_userId"),
        chatroomId: chatCode,
        message: text,
    });
  }
   
   useEffect(() => {
        socket.on("display", (data) => {
            console.log("display", data);
            setTypeData(data.typing)
            setTypeUserid(data.chatCode)
            setTypeId(data.user)
        });

        socket.on("receiveChat", (data) => {
            console.log("receiveChat", data);
            setFeedMess(data);
        });
        chatRoomShow()
    }, [])

  return (
    <>
        <section class="section">
            <div class="page-heading">
                <h3>Message</h3>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div className='row'>
                                <div className='col-md-3 border_right'>
                                    <MessSidBar userList={userList} chatShowIng={chatShowIng} />
                                </div>
                                <div className='col-md-9'>
                                    {userDetails.length === 0 ? (
                                        ""
                                    ):(
                                        <Messagefedd 
                                            handalerChanges={handalerChanges}
                                            userDetails={userDetails}
                                            setText={messageHandaler} 
                                            feedMess={feedMess}
                                            text={text}
                                            typeData={typeData}
                                            messageSend={handleOnEnter}
                                            typeUserid={typeUserid}
                                            typeId={typeId}
                                        />
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Message