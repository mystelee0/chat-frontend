import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const Box = styled.div`
    border:1px solid black;
`
function ChatRoom({ client }) {

    let { id } = useParams();
    let chat = useSelector((state) => state.chat.find(ob => ob.id === parseInt(id)))
    const inputRef = useRef();
    //input type file의 ref
    const ref = useRef()
    const [value, setValue] = useState('');

    //입력한 텍스트의 state변경
    const onChange = (e) => {
        setValue(e.target.value);
    }

    //엔터눌렀을때 전송함수 호출
    const onKeyUp = (e) => {
        if (e.keyCode === 13)
            send();

    }
    //전송
    const send = () => {
        if (value === 'ddd') {
            alert('입력해주세요');
            return;
        }
        else {
            //메시지 형식
            let body = {
                'id': parseInt(id),
                'sender': 'user1',
                'contents': value,
            }
            //메시지 보내기

            client.publish({
                destination: "/app/greetings",
                //binaryBody:binaryData,
                //headers:{'content-type':'application/octet-stream'},
                body: JSON.stringify(body),
            })
            inputRef.current.value = '';
            inputRef.current.focus();
        }

    }
    //바이너리 보내기
    const sendbinary = () => {
        let file = ref.current.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event) => {
            let arrayBuffer = event.target.result;
            let uint8Array = new Uint8Array(arrayBuffer);
            //let chunk =splitUint8Array(uint8Array,8103);
            //console.log(chunk);
            client.publish({
                destination: "/app/binary",
                binaryBody: uint8Array,
                headers: { 'content-type': 'application/octet-stream' },
            })
        };

    }
    //uint8array크기를 작게 나누는 함수 -> 현재사용안함
    function splitUint8Array(uint8Array, chunkSize) {
        const chunks = [];
        let offset = 0;

        while (offset < uint8Array.length) {
            const chunk = uint8Array.slice(offset, offset + chunkSize);
            chunks.push(chunk);
            offset += chunkSize;
        }

        return chunks;
    }

    return <Box>
        {'채팅방id= ' + id}
        {
            chat === undefined ?
                <h1>404page</h1> :
                chat.messages.map((v, i) => {
                    return (
                        <p>{v.sender}:{v.contents}</p>
                    )
                })
        }
        <button onClick={() => {
            ref.current.click();
        }}>이미지</button>
        <input type="file" ref={ref}></input>
        <input ref={inputRef} onChange={onChange} onKeyUp={onKeyUp}></input>
        <button onClick={send}>보내기</button>
        <button onClick={sendbinary}>binary보내기</button>
    </Box>
}

export default ChatRoom;