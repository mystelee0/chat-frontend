import { createSlice } from "@reduxjs/toolkit";

const initialState=[
        {
            id:0,
            messages:[
                {sender:'system',contents:'this is test message'},
            ]
        },
    ]


export const chat=createSlice({
    name:'chat',
    initialState,
    reducers:{
        add:(state,action)=>{
            let pid=action.payload.id;
            let idx=state.findIndex(room=>room.id===pid)
            
            if(idx===-1){
                alert('없는 방 id');
            }
            else {
                state[idx].messages.push(action.payload)
            }
        }
    }
})

export const {add}=chat.actions;

export default chat.reducer;