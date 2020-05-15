import React, { useState, useEffect } from 'react';
import '../styles/chat.css';

const Chat = (props) => {
	
	const [message, setMessage] = useState('');
	const [allMessages, setAllMessages] = useState([]);
	const [error, setError] = useState('');

	const chatMessageRef = React.createRef();

	const handleMessageChange = e => {
		setMessage(e.target.value)
		setError('');
	}
	
	const handleMessageSend = (e) => {
		e.preventDefault()
		if(message.trim()){
			setMessage('')
			let newMessage = {room: props.currentRoom, message, userName:props.userName, time: Date.now()}
			setAllMessages([...allMessages, newMessage])
			console.log(chatMessageRef.current.scrollTop, chatMessageRef.current.scrollHeighta)
			chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
		}else {
			setError('invalid message');
		}
	}

	return (
		<div className='chat-message-wrapper'>
			<span className='t-c'>Hi, {props.userName}, Current Room : {props.currentRoom}</span>
			<div ref={chatMessageRef} className='chat-message-top'>
				<span>top section</span>
				{allMessages.filter(m=>m.room===props.currentRoom).map((m, i)=>(
				<div className='chat-single-message chat-single-message-sender' key={i}>
					<span>{m.message}</span>
					<span> ({(new Date(m.time)).getFullYear()})</span>
				</div>))}
			</div>
			<div className='chat-message-bottom'>
				{error?<span className='tc-error'>{error}</span>:(null)}
				<form onSubmit={handleMessageSend}>
					<input value={message} onChange={handleMessageChange}></input>
					<button>send</button>
				</form>
			</div>
		</div>)
}
export default Chat