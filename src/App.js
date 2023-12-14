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
  

  let [url,setUrl]=useState('')
  let [client,setClient]=useState();
  useEffect(() => {
    const client = new Client({
      //sockjs를 사용
      //webSocketFactory: () => new SockJS('http://localhost:8080/portfolio'),
  
      //websocket사용
      webSocketFactory:()=>new WebSocket('ws://localhost:8080/portfolio'),
      // 디버그 로그 출력
      debug: function (str) {
        console.log(str);
      },
      
    });

    //클라이언트 state에 저장
    setClient(client);
    //실행
    client.activate();

    //구독과 메시지 발생 시 callback
    client.onConnect = () => {
      const subscription = client.subscribe('/chat/1', (data) => {

        //binary 데이터 처리
        if(data.headers['content-type']==='application/octet-stream'){
          //data.binarybody에는 Uint8Array형식의 데이터가 들어있다.
          let blob=new Blob([data.binaryBody]);
          console.log(data.binaryBody);
          console.log(data.binaryBody.buffer);
          let url=URL.createObjectURL(blob);
          setUrl(url);
        }
        //text 처리
        else {
          let message = JSON.parse(data.body)
          dispatch(add(message));
        }
        
      });
    }

  }, [])

  
  const dispatch = useDispatch();

  return (
    <div className="App">
      <img src={url} style={{width:'300px'}} alt='받아온 이미지'></img>
      <Routes>
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/:id' element={<ChatRoom client={client}/>} />

      </Routes>

      <Link to='/rooms'>rooms</Link>
    </div>
  );
}

export default App;
