import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as API from "../Api/index";
const MessSidBar = ({ userList, chatShowIng }) => {
  console.log("userList", userList);
  return (
    <>
      <div className="sidBarMess">
        <ul>
          {userList === null
            ? userList.map((item, index) => (
                <li
                  onClick={() =>
                    chatShowIng(item._id, item.enquiry, item.users)
                  }
                >
                  {item.users.length === 2 ? (
                    <>
                      {item.users[0].userCode}, {item.users[1].userCode}
                    </>
                  ) : (
                    <>
                      {item.users[0].userCode}, {item.users[1].userCode},{" "}
                      {item.users[2].userCode}
                    </>
                  )}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};

export default MessSidBar;
