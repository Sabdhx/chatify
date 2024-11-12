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
        `http://localhost:5000/messages/filterChats?senderId=${user.id}&receiverId=${id}`,
        { chatId: filteredChats._id }
      );

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
        const personalChats = await axios.get(`http://localhost:5000/users/allUsers`);
        const groupChats = await axios.get("http://localhost:5000/messages/getAllGc");

        // Set group chats and personal chats
        setGroupChats(groupChats.data);
        setData(personalChats.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const shuffleChats = () => {
      // Step 1: Combine the arrays
      const combinedChats = [...groupChats, ...data];

      // Step 2: Shuffle the combined array
      const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr;
      };

      // Step 3: Shuffle the combined array
      const shuffled = shuffleArray(combinedChats);
      setShuffledChats(shuffled); // Set the shuffled chats
    };

    // Only shuffle when data or groupChats change
    if (data.length > 0 && groupChats.length > 0) {
      shuffleChats();
    }
  }, [data, groupChats]);

  return (
    <div className="h-screen flex">
      <div className="w-[30%] bg-gray-700 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>

        {/* Map over shuffledChats */}
        {shuffledChats.length > 0 ? (
          shuffledChats.map((item) => (
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
                <div className="w-12 h-12 rounded-full bg-gray-400"></div> // Placeholder if no picture
              )}
            </div>
          ))
        ) : (
          <div className="text-lg text-gray-500 text-center">Loading chats...</div>
        )}
      </div>

      <div className="flex-1 p-4 bg-gray-800">
        <ChatsBlock chatsArray={filteredChats} loading={loading} receiverId={reciever} />
      </div>
    </div>
  );
}

export default HomePage;
