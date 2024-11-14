import React, { useContext, useEffect, useState } from 'react';
import ChatsBlock from './ChatsBlock';
import { MyContext } from '../context/Context';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [data, setData] = useState([]); // Personal Chats
  const { user } = useContext(MyContext);
  const [filteredChats, setFilteredChats] = useState([]);
  const [reciever, setReciever] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groupChats, setGroupChats] = useState([]); // Group Chats
  const [shuffledChats, setShuffledChats] = useState([]); // Final shuffled chats
  const [groupInfo , setGroupInfo] = useState(null)
  const navigate = useNavigate();

  const handleNotification = async () => {
    const response = await axios("http://localhost:5000/messages/notify", {});
    console.log(response);
  };

  const handleId = async (id) => {
    try {
      setReciever(id);
      console.log("Receiver ID set to:", id);
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/messages/filterChats?senderId=${user.id}&receiverId=${id}`
       
      );

      setFilteredChats(response.data || []);
      setLoading(false);
      console.log("Fetched Messages:", response);
    } catch (error) {
      console.error("Error fetching filtered chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personalChats = await axios.get(`http://localhost:5000/users/allUsers`);
        const groupChats = await axios.get("http://localhost:5000/groupChats/getAllGc");

        // Set group chats and personal chats
        setGroupChats(groupChats.data);
        setData(personalChats.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



   const handleGroupChatsId=async(id)=>{
    
    setReciever(id._id);
    setLoading(true);
    const groupChats = await axios.get(`http://localhost:5000/groupChats/filterGroup?id=${id._id}`);
    setFilteredChats(groupChats.data)
        console.log(groupChats)
        setLoading(false);
   } 


  return (
    <div className="h-screen flex">
      <div className="flex w-[30%] flex-col bg-gray-700 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>

        {/* Map over data */}
        {data.length > 0 ? (
          data.map((item) => (
            <div
              onClick={() => handleId(item._id)}
              key={item._id}
              className="flex justify-around items-center space-x-4 bg-gray-600 p-3 rounded-lg shadow-md mb-2 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
            >
              <h1 className="text-lg font-medium">{item.name}</h1>
              {item.profilePicture && item.profilePicture[0] ? (
                <img
                  src={item.profilePicture[0]}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-lg text-gray-500 text-center">Loading chats...</div>
        )}



<h2 className="text-2xl font-bold mb-4 text-center">Group Chats</h2>

{/* Map over data */}
{groupChats.length > 0 ? (
  groupChats.map((item) => (
    <div
      onClick={() => handleGroupChatsId(item)}
      key={item._id}
      className="flex justify-around items-center space-x-4 bg-gray-600 p-3 rounded-lg shadow-md mb-2 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
    >
      <h1 className="text-lg font-medium">{item.name}</h1>
      {item.profilePicture && item.profilePicture[0] ? (
        <img
          src={item.profilePicture[0]}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-400"></div>
      )}
    </div>
  ))
) : (
  <div className="text-lg text-gray-500 text-center">Loading chats...</div>
)}
      </div>

      <div className="flex-1 p-4 bg-gray-800 overflow-y-auto">
        <ChatsBlock chatsArray={filteredChats} loading={loading} receiverId={reciever} groupInformation= {groupInfo} />
      </div>
    </div>
  );
}

export default HomePage;
