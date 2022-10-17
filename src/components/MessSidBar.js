import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import * as API from "../Api/index";
const MessSidBar = ({userList, chatShowIng}) => {
  console.log("userList", userList);
  return (
    <>
        <div className='sidBarMess'>
            <ul>
                {userList.map((item , index)=>(
                    <li onClick={() => chatShowIng(item._id, item.enquiry, item.users)}>
                        {item.users.length === 2 ? (
                            <>
                                {item.users[0].firstName} {item.users[0].lastName}, {item.users[1].firstName} {item.users[1].lastName}
                            </>
                        ):(
                            <>
                               {item.users[0].firstName} {item.users[0].lastName}, {item.users[1].firstName} {item.users[1].lastName}, {item.users[2].firstName} {item.users[2].lastName}
                            </>
                        )}  
                    </li>
                    
                ))}
            </ul>
        </div>
    </>
  )
}

export default MessSidBar