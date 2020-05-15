import React, { useState, useEffect } from 'react';
import Chat from './chat';
import io from 'socket.io-client';
import RandomUserNames from '../utils/randomUserNames';
import CommonFuntions from '../utils/commonFunctions';

const Home = () => {
	const socket = io('http://localhost:5000');
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState('India');
	const [userName, setUserName] = useState('');
	
	useEffect(()=>{
		setUserName(prompt('Name?', RandomUserNames[CommonFuntions.getRandomNumberBtw(RandomUserNames.length)]))
		socket.on('connect', ()=>{
			socket.emit('getRooms').on('roomList', rooms=>setRooms(rooms));
		})
	}, [])
	
	const handleOnRoomClick = roomName => setRoom(roomName)
	
	return (
		<div className='App'>
			<h1 className='t-c'>Rooms</h1>
			<div className='room-card-wapper'>
			{rooms.length?(rooms.map(v=>(
				<div onClick={()=>handleOnRoomClick(v.name)} className={`room-card ${room === v.name?'room-card-active':''}`} key={v._id}>
					<span>{v.name}</span>
				</div>)
			)):(<p>No Rooms Available, Please Check after some time.</p>)}
			</div>
			<Chat userName={userName} currentRoom={room}/>
		</div>
	);
}
 
export default Home;