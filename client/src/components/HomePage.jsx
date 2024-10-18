import React from 'react'
import MessagesList from './MessagesList'
import ChatsBlock from './ChatsBlock'

function HomePage() {
  return (
    <>
      <div className='h-screen bg-gray-500 flex justify-between'>
      <div className='w-[30%] bg-green-400'>
    <MessagesList/>    
     </div>
      <div className='flex-1'>
       <ChatsBlock/>
      </div>
    </div>  
    </>
  )
}

export default HomePage