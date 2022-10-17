//import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import InputEmoji from "react-input-emoji";
import moment from 'moment-timezone'
import ScrollToBottom from "react-scroll-to-bottom";
import { TIMEZONE } from '../Api/constant';
const Messagefedd = ({setText, text, userDetails,feedMess,messageSend, messageAccept, regectMessage, sallerid}) => {

    console.log("feedMess", feedMess);

    console.log("userDetails", userDetails)

  return (
    <>
        <div className='headerTitle'>
            <h4>
                Product name : {userDetails[0].productName}
            </h4>
            <h4>
                Product details :  {userDetails[0].product_des}
            </h4>
            <h4>Seller Id : {sallerid}</h4>    
        </div>
        <div className='messfeed'>
            <div className='row m-0'>
                <ScrollToBottom className="scroll">
                    {feedMess.map((item, index)=> {
                        const diffDatHour = moment(new Date()).diff(
                            moment(item.createdAt),
                            "hours"
                          ); 
                        return (
                            <>
                                {localStorage.getItem("_userId") != item.senderId ? (
                                    <div className='col-md-12 d-flex flex-column'>
                                        <div className='isResiver'>
                                            <p> <div dangerouslySetInnerHTML={{__html: item.message[0].msg}} /> </p>
                                            {item.message[0].btn === "payment" ? (
                                                <div class="comandBtn">
                                                <a class="buttonS" target="_blank" href={item.message[0].link}>Payment</a>
                                                </div>
                                            ): "" } 
                                            {item.message[0].btn === "accept" ? (
                                                <>
                                                    <div class="comandBtn">
                                                        <span class="buttonS" onClick={()=> messageAccept()}>Accept</span>
                                                        <span class="buttonSr" onClick={()=> regectMessage()}>Reject</span>
                                                    </div>
                                                </>
                                            ):("")}
                                            <span className="messTime">
                                              {diffDatHour < 24 ? (
                                                <>
                                                  {moment.utc(item.createdAt).tz(TIMEZONE).format('h:m A')}
                                                </>
                                              ):(
                                                <>
                                                  {moment(item.createdAt).format(
                                                    "DD-MMM-YY"
                                                  )}
                                                </>
                                              )}
                                          </span>
                                        </div>
                                        <span className='usermessName'>{item.user.userCode}</span>
                                        {/* <p className='messDate'>{moment(item.createdAt).format("DD-MMM-YY")}</p> */}
                                    </div>
                                    ):(
                                    <>  
                                        <div className='align-items-end flex-column col-md-12 d-flex justify-content-end text-end pe-4'>
                                            <div className='isSender'>
                                                <p> <div dangerouslySetInnerHTML={{__html: item.message[0].msg}} /> </p>
                                                {item.message[0].btn === "accept" ? (
                                                    <>
                                                        <div class="comandBtn">
                                                            <span class="buttonS" onClick={()=> messageAccept()}>Accept</span>
                                                            <span class="buttonSr" onClick={()=> regectMessage()}>Reject</span>
                                                        </div>
                                                    </>
                                                ):("")}
                                                <span className="messTime">
                                                    {diffDatHour < 24 ? (
                                                        <>
                                                        {moment.utc(item.createdAt).tz(TIMEZONE).format('h:m A')}
                                                        </>
                                                    ):(
                                                        <>
                                                        {moment(item.createdAt).format(
                                                            "DD-MMM-YY"
                                                        )}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                            <span className='usermessName'>{item.user.userCode}</span>
                                            
                                        </div>
                                    </>
                                )}
                            </>
                        )
                    } )}
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