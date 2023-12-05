import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Box=styled.div`

`
function Rooms(){

    let chat=useSelector((state)=>state.chat)
    return <Box>
        {
            chat.map((v,i)=>{
                return <p><Link to={`/rooms/${v.id}`}>{v.id}번방</Link></p>
            })
        }
    </Box>
}

export default Rooms;