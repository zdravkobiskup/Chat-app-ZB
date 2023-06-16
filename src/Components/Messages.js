import React from "react";
import '../App.css';
import ScrollableFeed from 'react-scrollable-feed';
class Messages extends React.Component {
  
    renderMessage(message,index) {
      const {memberMe} = this.props;
      
          
      const messageFromMe = message.user.username === memberMe;
      const className = messageFromMe ?  "Messages-message currentMember" : "Messages-message";
      
        
      return (
            <div key={index}>
            <li className={className}>
              <div className="Message-content">
                <div className="username">
                  {message.user.username }
                </div>
                <div className="text">
                  {message.message}
                </div>
              </div>
            </li>
            </div>
      );
    }

    render() {
      const {messages} = this.props;
      return (
        <ScrollableFeed>
          <ul className="Messages-list">
            {messages.map((m,index) => this.renderMessage(m,index) )}
          </ul>
        </ScrollableFeed>
      );
    }
}
export default Messages;