import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import InputEmoji from "react-input-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
const Messagefedd = ({setText, text, userDetails,feedMess,messageSend, typeData, typeUserid,typeId}) => {

    console.log("feedMess", feedMess);

    console.log("userDetails", userDetails)

  return (
    <>
        <div className='headerTitle'>
            {userDetails.length === 2 ?(
                <h4>{userDetails[0].firstName} {userDetails[0].lastName}, {userDetails[1].firstName} {userDetails[1].lastName}</h4>
            ):(
                <h4>{userDetails[0].firstName} {userDetails[0].lastName}, {userDetails[1].firstName} {userDetails[1].lastName}, {userDetails[2].firstName} {userDetails[2].lastName}</h4>
            )}
            
        </div>
        <div className='messfeed'>
            <div className='row m-0'>
                <ScrollToBottom className="scroll">
                    {feedMess.map((item, index)=>(
                        <>
                            {localStorage.getItem("_userId") != item.senderId ? (
                                <div className='col-md-12 d-flex flex-column'>
                                    <div className='isResiver'>
                                        <p>{item.message[0].msg}</p>
                                        <span className="messTime">{moment(item.createdAt ,"HH:mm").format(
                                          "hh:mm A"
                                        )}</span>
                                    </div>
                                    <span className='usermessName'>{item.user.firstName} {item.user.lastName}</span>
                                    <p className='messDate'>{moment(item.createdAt).format("DD-MMM-YY")}</p>
                                </div>
                                ):(
                                <>  
                                    <div className='align-items-end flex-column col-md-12 d-flex justify-content-end text-end pe-4'>
                                        <div className='isSender'>
                                            <p> {item.message[0].msg} </p>
                                            <span className="messTime">{moment(item.createdAt ,"HH:mm").format(
                                          "hh:mm A"
                                        )}</span>
                                        </div>
                                        <span className='usermessName'>{item.user.firstName} {item.user.lastName}</span>
                                        <p className='messDate'>{moment(item.createdAt).format("DD-MMM-YY")}</p>
                                    </div>
                                </>
                            )}
                        </>
                    ))}
                </ScrollToBottom>
            </div>
        </div>
        <div className='messinput'>
            <div id="subscription_area">
                <div class="container">
                    {/* <div className='row'>
                        {typeId === localStorage.getItem("_userId") ? (""):(
                            <p className='mb-1 ps-4 text-start'>{typeData ? "Typeing..." : ""}</p>
                        )}
                        
                    </div> */}
                    <div class="row">
                        <div class="col-sm-12">
                            <div className="mess_type_input">
                                {/* <label for="file-upload" className="custom-file-upload">
                                    <i class="bi bi-paperclip"></i>
                                </label>
                                <input hidden id="file-upload" type="file" /> */}
                                <InputEmoji
                                    className="messBox"
                                    value={text}
                                    onChange={setText}
                                    cleanOnEnter
                                    onEnter={messageSend}
                                    placeholder="Type a message"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Messagefedd