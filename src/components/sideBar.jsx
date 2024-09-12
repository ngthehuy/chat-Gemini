import React from 'react'
import IconPlus from '../assets/plusIcon.png'
import Chat from '../assets/chat.png'
import Remove from '../assets/remove.png'
import Menu from '../assets/menu.png'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, removeChat } from '../store/chatSlice'
import { Link, useNavigate } from 'react-router-dom'
const SideBar = ({onToggle}) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const handleNewChat = () => {
    dispatch(addChat());
    console.log(data);
  }
  const handleRemoveChat = (id) => {
    
    dispatch(removeChat(id));
    navigate("/");
  }
  return (
    <div className='bg-primary-SideBar xl:h-[89%] h-full text-white w-[280px]'>
      <button className='flex ml-auto xl:hidden' onClick={onToggle}><img src={Menu} alt="" className='w-10 h-10 mr-4' /></button>
      <div className='mt-20'>
        <button className='px-4 py-2 flex items-center space-x-4 h-10 bg-gray-600 ml-2' onClick={handleNewChat}> 
            <img className=' h-full' src= {IconPlus} alt="" />
            <p className='text-white text-xl'>Cuộc trò chuyện mới</p>
            </button>
            <div className='mt-6  mx-3'>
                <p className='text-white'>Gần đây:</p>
                <div className='flex flex-col my-4 space-y-6'>
                   {data.map((chat) => (
                     <Link
                     to={`chat/${chat.id}`}
                      className='flex items-center justify-between p-2 bg-gray-800 group' key={chat?.id}>
                     <div className='flex'>
                     <img className='w-6 h-6 mr-4' src={Chat} alt="" />
                     <p className='text-white text-xl'>{chat.title}</p>
                     </div>
                       <div>
                        <button onClick={(e) =>{
                          e.preventDefault;
                          handleRemoveChat(chat.id);
                         
                        }}>
                        <img className='w-4 h-4 hidden group-hover:block' src={Remove} alt="" />
                        </button>
                       
                       </div>
                     
                     </Link>
                   ))}
                   
                  
                </div>
              
            </div>
      </div>
      
    </div>
  )
}

export default SideBar
