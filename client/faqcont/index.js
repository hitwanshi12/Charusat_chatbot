import React, { useState ,useRef, useEffect} from 'react';
import user from '../images/user.png';
import { Layout, Menu, Input, Button, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './index.css';
import logo from '../images/logo.jpg'
const { Header, Sider, Content } = Layout;

function FaqCont() {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messageContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

const handleSendMessage = async () => {
  if (question.trim() === '') return; // Don't send empty messages

  // Create a new message object for the user's question
  const userMessage = { text: question, isUser: true };
const questions=userMessage.text;
setQuestion('');
  // Add the user's message to the chatMessages array
  setChatMessages([...chatMessages, userMessage]);

  try {
    const response = await fetch('http://localhost:5000/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions }),
    });
    setQuestion('');
    const data = await response.json();

    // Create a new message object for the bot's response
    const botMessage = { text: data.answer, isUser: false };

    // Append the bot's message to the chatMessages array
    setChatMessages((prevMessages) => [...prevMessages, botMessage]);
  } catch (error) {
    console.error('Error:', error);
  }

  
};
const clearChat=()=>
{
  setChatMessages([]);
}
useEffect(() => {
  // Scroll to the bottom of the message container
  if (messageContainerRef.current) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
}, [chatMessages]);

  return (
    <Layout style={{ minHeight: '100vh',backgroundColor:'white' }}>
      <Sider width={200} theme="light">
        <Button onClick={clearChat} className='clearChat'>Clear chat</Button>
      </Sider>
      <Layout>
        <Header className="navbar"  style={{backgroundColor:'white',height:'90px'}}>
          <div className="logo">
            <img src={logo} style={{height:'65px'}} className='logo'></img>
          </div>
        </Header>
        <Content className="container">
          <div className='title'>Hello! </div>
          <div className='content'>Just type your question, and I'll do my best to assist you.</div>
          {/* <List
            className="chat-messages"
            dataSource={chatMessages}
            renderItem={(message) => (
              <List.Item>
                {message.text && typeof message.text === 'object' ? (
          JSON.stringify(message.text) // Convert the object to a string
        ) : (
          message.text // Render the text if it's a string or a stringified object
        )}
              </List.Item>
            )}
          /> */}
          <div className='chat-messages' ref={messageContainerRef}>
            {
              chatMessages.map((msg)=>
              {
                return (
                  <div className='msg'>
                    {msg.isUser && (
    <div className='userLogo'>
      <img src={user} style={{ height: '25px' }} alt='User Logo' />
    </div>
  )}
                 <div className={msg.isUser ? 'user' : 'bot'}>
                  {msg.text}
                  </div>
                  </div>
                  )
              })
            }
          </div>
          <div className="input-container"> 
            <Input
              placeholder="Type your question..."
              value={question}
              onChange={handleInputChange}
              onPressEnter={handleSendMessage}
              addonAfter={
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                />
              }
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default FaqCont;
