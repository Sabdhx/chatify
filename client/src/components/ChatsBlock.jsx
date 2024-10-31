import axios from 'axios';
import React, { useContext, useState } from 'react';
import { MyContext } from '../context/Context';
import { HiDotsVertical } from "react-icons/hi";
import { BsPaperclip } from "react-icons/bs"; // Icon for file upload
import UploadWidget from '../uploadWIdget/UploadWedgit';
import { MdOutlineAttachFile } from "react-icons/md";



function ChatsBlock(props) {
  const { user } = useContext(MyContext);
  const [input, setInput] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file

  const fetchChats = async () => {
    if (!input && !selectedFile) {
      alert("Please enter a message or upload an image."); // Alert the user
      return; // Exit the function
    }
    try {
      const formData = new FormData();
      formData.append('content', input);
      if (selectedFile) {
        formData.append('file', selectedFile); // Append the selected file
      }
      
      const response = await axios.post(`http://localhost:5000/messages/sendMessage/${props.receiverId}`, {content:input, imageUrl:selectedFile});

      console.log("Response from server:", response.data);
      setInput("");
      setSelectedFile(null); // Reset the selected file
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deletion = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:5000/messages/delete/${id}`);
    console.log(response.data);
    window.location.reload();
  };

  const editMessage = (id, content) => {
    setEditingMessageId(id);
    setEditedContent(content);
    setActiveDropdown(null);
  };

  const saveEditedMessage = async (id) => {
    console.log(selectedFile)
    try {
      const response = await axios.post(`http://localhost:5000/messages/edit/${id}`, { content: editedContent,imageUrl:selectedFile });
      console.log(response.data);
      setEditingMessageId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDropdownToggle = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

 

  return (
    <div className="flex flex-col h-full">
      {props.loading ? (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {props?.chatsArray?.messages?.map((item) => (
            <div
              key={item._id}
              className={`group px-4 py-2 rounded-lg shadow-sm text-white ${item.sender === user.id
                ? "ml-auto bg-blue-500 text-right"
                : "mr-auto bg-gray-500 text-black"
              }`}
              style={{ maxWidth: "70%", width: "fit-content" }}
            >
              <div className={`flex items-center ${item.sender === user.id ? 'flex-row-reverse' : 'flex-row'}`}>
                {editingMessageId === item._id ? (
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                  />
                ) : (
                  <>
                    {item.content && <h1 className="mx-2">{item.content}</h1>}
                    {item.imageUrl && <img src={item.imageUrl} alt="Uploaded" className="size-[40%] rounded-lg" />}
                  </>
                )}

                <span
                  className={`relative opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer ${item.sender === user.id ? 'mr-2' : 'ml-2'}`}
                  onClick={() => handleDropdownToggle(item._id)}
                >
                  <HiDotsVertical />
                  {activeDropdown === item._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md py-2 text-gray-700 transform transition-transform duration-300 ease-in-out scale-95 group-hover:scale-100">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => deletion(item._id)}>Unsend</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => editMessage(item._id, item.content)}>Edit</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">React</button>
                    </div>
                  )}
                </span>
              </div>

              {editingMessageId === item._id && (
                <button
                  className="text-sm text-blue-500 mt-2"
                  onClick={() => saveEditedMessage(item._id)}
                >
                  Save
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      <div className="flex items-center p-2 border-t border-gray-300">
        {/* File Upload Icon */}
           <UploadWidget
           uwConfig={{
             cloudName: "lamadev",
             uploadPreset: "estate",
             multiple: true,
             maxImageFileSize: 2000000,
             folder: "avatars",
             
           }}
           setState={setSelectedFile}
         /> 
        

   
                
        

        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none mr-2 bg-gray-100 focus:bg-white"
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-200"
          onClick={fetchChats}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatsBlock;
