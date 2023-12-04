import { useState } from "react";

function Login(){

    const [input,setInput]=useState({id:'',pw:''});

    function onChange(){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(){
        //서버로 아이디비번 로그인보내고 리턴값 성공이면 페이지리다이렉트?
        //안되면 input초기화
        console.log(input);
    }

    return (
        <form> 
            <input name="id" value={id} onChange={onChange} placeholder="아이디"></input>
            <input name="pw" value={pw} onChange={onChange} placeholder="비밀번호"></input>
            <button onClick={handleSubmit}>로그인</button>
        </form>
    );
}

export default Login;