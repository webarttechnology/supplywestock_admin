import React from 'react'

const Messagefedd = ({handalerChanges, formData, userDetails,feedMess,messageSend}) => {


  return (
    <>
        <div className='headerTitle'>
            <h4>{userDetails[0].firstName} {userDetails[0].lastName}, {userDetails[1].firstName} {userDetails[1].lastName}, {userDetails[2].firstName} {userDetails[2].lastName}</h4>
        </div>
        <div className='messfeed'>
            {feedMess.map((item, index)=>(
                <>
                    {localStorage.getItem("_userId") != item.sender ? (
                        <div className='isResiver'>
                            <p>{item.message[0].msg}</p>
                        </div>
                    ):(
                        <div className='isSender'>
                            <p> {item.message[0].msg} </p>
                        </div>
                    )}
                </>
            ))}
        </div>
        <div className='messinput'>
            <div id="subscription_area">
                <div class="container">
                    <div class="row">
                    <div class="col-sm-12">
                        <div class="subscribe_now">
                            <form class="subscribe_form">
                                <div class="input-group">
                                <input type="text" class="form-control" name="message"
                                    onChange={handalerChanges}
                                    value={formData.message}
                                    placeholder="Type messages here..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-default sendButton" onClick={messageSend} type="button">Send</button>
                                </span>
                                </div>
                            </form>
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