import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

function UserListPage() {
    const navigate = useNavigate();  // Initialize useNavigate hook
    const [user, setUser] = useState(null);
    const [idss, setIdss] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const users = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users/allUsersIncludingMe");
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        users();
   

    }, []);

    const handleChoosing = async (index) => {

        setIdss(prevState => {
            if (prevState.includes(index)) {
                return prevState;
            }
            const updatedState = [...prevState, index];
            console.log(updatedState)
            return updatedState;
        });
    };

    const sendRequest = async () => {
        const response = await axios.post("http://localhost:5000/groupChats/GroupChat", { idss, input });
        console.log(response);
    };

   

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
            {/* Back Button */}
            <button
                onClick={()=>navigate("/home")}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6"
            >
                Back
            </button>

            <div className="w-full max-w-7xl px-6">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                    Users List
                </h1>

                {user ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                                {item?.profilePicture && item.profilePicture[0] ? (
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.profilePicture[0]}
                                            className=" object-cover w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center text-white font-bold text-xl"
                                            alt="Profile"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-500">No Profile Picture</div>
                                )}

                                <h2 className="text-xl font-semibold text-gray-800 mt-4">{item.name}</h2>
                                <p className="text-gray-600">{item.email}</p>
                                <button
                                    onClick={() => handleChoosing(item._id)}
                                    className="px-6 py-1 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out my-3"
                                >
                                    Choose
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-lg text-gray-500 text-center">
                        <p>Loading users...</p>
                    </div>
                )}
            </div>

            {idss.length > 1 ? (
                <>
                    <div className="flex flex-col items-center space-y-4 my-4">
                        <input
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                            className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter something..."
                        />
                        <button
                            onClick={sendRequest}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create GC
                        </button>
                    </div>
                </>
            ) : (
                <div className="my-3 text-center text-lg font-medium text-red-500">
                    Select at least two people to make a GC
                </div>
            )}
        </div>
    );
}

export default UserListPage;
