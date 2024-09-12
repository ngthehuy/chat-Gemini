import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4, v4} from 'uuid';
import { marked, Marked } from "marked";
import DOMPurify from 'dompurify';
const initData = {
    data: [],
}
   
const chatSlice = createSlice({
    name: 'chat',
    initialState: initData,
    reducers:{
        addChat:(state) => {
           state.data.push({
            id:uuidv4(),
            title:'chat',
            messages:[]
           })
        },
        addMessage:(state,action) => {
            const {idChat,title,userMess,botMess} = action.payload;
            const chat = state.data.find((chat) => chat.id === idChat);
            
            if(chat){
                const messagesFormat = marked.parse(botMess);
                const safeChat = DOMPurify.sanitize(messagesFormat);
                const newMessage = [
                    ...chat.messages,
                    {
                        id:uuidv4(),
                        text: userMess,
                        isBot:false
                    },
                    {
                        id:uuidv4(),
                        text: safeChat,
                        isBot:true
                    }
                ]
                chat.messages = newMessage;
                state.data = [...state.data];
            }
        },
        removeChat:(state,action) => {
           state.data =  state.data.filter((chat) => chat.id !== action.payload)
        },
        setTitleChat:(state,action) => {
            const {newTitle,chatId} = action.payload;
            const chat = state.data.find((chat) => chat.id === chatId )
            if(chat){
                chat.title = newTitle;
            }
        }
    }
})
export const {addChat,removeChat, addMessage,setTitleChat} = chatSlice.actions
export default chatSlice.reducer;