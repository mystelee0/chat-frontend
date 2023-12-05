import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

//components
import Rooms from './Rooms';
import ChatRoom from './ChatRoom';
import { useDispatch } from 'react-redux';
import { add } from './redux/chatRepo';

function App() {
  const client = new Client({
    //sockjs를 사용
    webSocketFactory: () => new SockJS('http://localhost:8080/portfolio'),
    // 디버그 로그 출력
    debug: function (str) {
      console.log(str);
    },
  });

  
  useEffect(() => {
    //실행
    client.activate();

    //구독과 메시지 발생 시 callback
    client.onConnect = () => {
      const subscription = client.subscribe('/chat/1', (data) => {
        let message = JSON.parse(data.body)
        console.log(message.sender, " : ", message.contents);
        dispatch(add(message));
      });
    }

  }, [])


  const dispatch = useDispatch();

  //보낼 메세지
  let data = {
    sender: "tom",
    contents: "hello"
  };

  return (
    <div className="App">
      <button onClick={() => {
        client.publish({
          destination: '/app/greetings',
          body: JSON.stringify(data),
          //skipContentLengthHeader: true 
        })
      }}>send</button>

      <Routes>
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/:id' element={<ChatRoom />} />

      </Routes>

      <Link to='/rooms'>rooms</Link>
    </div>
  );
}

export default App;
