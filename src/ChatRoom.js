import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const Box=styled.div`
    border:1px solid black;
`
function ChatRoom(){

    let {id}=useParams();

    let chat=useSelector((state)=>state.chat.find(ob=>ob.id===parseInt(id)))
    
    return <Box>
        {'채팅방id= '+ id}
        {
            chat===undefined?
            <h1>404page</h1>:
            chat.messages.map((v,i)=>{
                return (
                    <p>{v.sender}:{v.contents}</p>
                )
            })
        }
        <button onClick={()=>{console.log(chat)}}>내용</button>
    </Box>
}

export default ChatRoom;