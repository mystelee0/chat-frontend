import SockJS from 'sockjs-client';
import { Client} from '@stomp/stompjs';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const client = new Client({
    //sockjs를 사용
    webSocketFactory:()=>new SockJS('http://localhost:8080/portfolio'), 
    // 디버그 로그 출력
    debug: function (str) {
      console.log(str); 
    },
  });
  
  //실행
  client.activate();

    client.onConnect=()=>{
      const subscription = client.subscribe('/topic/1', (message) => {
        console.log('message : ', message.body);
      });
    }


  //보낼 메세지
  let data={
    sender : "tom",
    contents: "hello"
  };

  //미완성 chat에 메세지를 담고 map을 통해서 렌더링 해볼 계획
  const [chat,setchat]=useState([]);
  return (
    <div className="App">
      <button onClick={()=>{client.publish({
        destination:'/app/greetings',
        body:JSON.stringify(data),
        //skipContentLengthHeader: true 
        })}}>send</button>
        
    </div>
  );
}

export default App;
