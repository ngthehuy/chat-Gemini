import React, { useEffect, useState } from 'react'
import ImgTemp from '../assets/temp.jpeg'
import Menu from '../assets/menu.png'
import ImgStar from '../assets/star.png'
import SideBar from '../components/sideBar';
import { useParams } from 'react-router-dom';
import Gemini from'../gemini'
import { addMessage, setTitleChat } from '../store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
const ChatDetail = () => {
  const [menu,setMenu] = useState(false);
  const [dataDetail,SetDatadetail] = useState([]);
  const [dataMessage,SetdataMessage] = useState([]);
  const[inputChat,setInputChat] = useState("");
  const dispatch = useDispatch()
  const {id} = useParams();
  const {data} = useSelector((state) => state.chat)
  useEffect(() => {
  if(data.length > 0){
  const chat = data.find(chat => chat.id === id);
  if(chat){
 SetDatadetail(chat)
  SetdataMessage(chat.messages);

  }
  }
  },[data,id]);
  const handleChatDetail  = async () =>{
    if(id){
      const chatText = await Gemini(inputChat,dataMessage)
      if(dataDetail.title == 'chat'){
        const promptName = `từ câu hỏi của người dùng ${inputChat}hãy đặt tên cho tiêu đề nhưng độ dài không quá 10 ký tự. Không trả lời hay gợi ý mà hãy cho 1 tiêu đề cho đoạn chat `;
        const newTitle = await Gemini(promptName);
        dispatch(setTitleChat({newTitle, chatId:id}));
      }
      if(chatText){
        const dataMessage = {
          idChat: id,
          userMess: inputChat,
          botMess:chatText
        }
        dispatch(addMessage(dataMessage))
      }
      setInputChat('');
    }
  }
  return (
    <div className='text-white h-full  xl:w-[80%] w-full mt-2 relative'>
      <div className='flex flex-row space-x-2 '>
      <button className=' xl:hidden pl-4' onClick={() => {setMenu(!menu)}}>
        <img src={Menu} alt="" className='w-8 h-8' />
        </button>
      <h1 className='text-xl uppercase font-bold '>Gemini</h1>
      </div>
      {menu && (
        <div className='absolute h-full top-0 left-0 xl:hidden'>
          <SideBar onToggle ={() => {setMenu(!menu)}}/>
        </div>
      )}
        <div className='max-w-[80%] w-full mx-32 mt-32 flex flex-col space-y-16'>
      {id ? (
         <div className='flex flex-col space-y-6 xl:h-[400px] lg:h-[200px] overflow-x-hidden overflow-y-auto'>
         {Array.isArray(dataMessage) &&dataMessage.map((item) => ( 
          <div className="flex flex-row space-x-4" key={item.id}>
          {
            item.isBot ? 
            (
              <>
               <img src={ImgStar} alt='star' className='w-8 h-8'/>
               <p dangerouslySetInnerHTML={{__html: item.text}}/>
              </>
           
           )
            
          :( 
            <>
            <p className='text-xl'>User</p>
            <p>{item.text}</p>
            </>
            
          )
          }
          
        </div>
      ))}
       
        </div>
      ) : (
 <div className='flex flex-col space-y-5'>
        <div className='space-y-4'>
          <h2 className='bg-gradient-to-r from-blue-500 via-green-400 to-indigo-500 text-3xl font-bold inline-block text-transparent bg-clip-text'>
            Xin chào
            </h2>
          <p className='text-3xl '>Hôm nay tôi có thể giúp gì cho bạn</p>
        </div>
        <div className='flex flex-row space-x-4 mt-10'>
      <div className='w-[200px] h-[200px] bg-primary-SideBar flex items-center justify-center rounded-lg px-2'>
        <p className='text-lg'>Lên lịch học</p>
      </div>
      <div className='w-[200px] h-[200px] bg-primary-SideBar flex items-center justify-center rounded-lg px-2'>
      <p className='text-lg'>Bài tập thể dục tại nhà</p>
      </div>
      <div className='w-[200px] h-[200px] bg-primary-SideBar flex items-center justify-center rounded-lg px-2'>
      <p className='text-lg'>Cách học tiếng anh hiệu quả</p>
      </div>
      <div className='w-[200px] h-[200px] bg-primary-SideBar flex flex-col items-center justify-center rounded-lg px-2'>
      <p className='text-lg'>Tạo hình với AI</p>
      <img className='w-[70%] h-[70%]' src={ImgTemp} alt="" />
      </div>
      </div>
      </div>
     
       
     
   )}
    
    <div className='flex flex-row space-x-4 mt-50'>
        <input  className='w-[90%] bg-primary-default px-2'
        value={inputChat} 
        type="text" placeholder='Bạn hãy nhập yêu cầu vào đây' 
        onChange={e =>setInputChat(e.target.value)}/>
        <button className='text-white text-lg bg-green-500 rounded-lg p-4  ' onClick={handleChatDetail}>Gửi</button>
      </div>
     </div>
    </div>
    
  )
}

export default ChatDetail
