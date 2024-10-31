import React, { useContext, useEffect, useState } from 'react';
import ChatsBlock from './ChatsBlock';
import { MyContext } from '../context/Context';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [data, setData] = useState([]);
  const { user } = useContext(MyContext);
  const [filteredChats, setFilteredChats] = useState([]);
  const [reciever, setReciever] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(filteredChats);
  }, []);

  const handleId = async (id) => {
    try {
      setReciever(id);
      console.log("Receiver ID set to:", id);
      setLoading(true);

      const response = await axios.get(`http://localhost:5000/messages/filterChats?senderId=${user.id}&receiverId=${id}`);

      setFilteredChats(response.data || []);
      setLoading(false);
      console.log("Fetched Messages:", response.data.messages);
    } catch (error) {
      console.error("Error fetching filtered chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/allUsers`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-[30%] bg-gray-700 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>
        {
            data.map((item) => (
              <div
                onClick={() => handleId(item._id)}
                key={item._id}
                className="flex justify-around items-center space-x-4 bg-gray-600 p-3 rounded-lg shadow-md mb-2 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
              >
                  <h1 className="text-lg font-medium">{item.name}</h1>
                <img
                  src={item.profilePicture[0]}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
              
              </div>
            ))
          
        }
      </div>

      <div className="flex-1 p-4 bg-gray-800">
        <ChatsBlock chatsArray={filteredChats} loading={loading} receiverId={reciever} />
      </div>
    </div>
  );
}

export default HomePage;
