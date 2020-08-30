import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from "./components/Message";
import db from './components/firebase';
import firebase from "firebase";
import FlipMove from "react-flip-move";

import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function AppChat() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState( [ ] );
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
    .orderBy("timestamp", "desc") ///დალაგება დროის მიხედვით
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  }, [] );

  useEffect(() => {
    // const name = prompt("Please enter Your Name");
    setUsername(prompt("Please enter Your Name"));
  }, [] );

  const sendMessage = ( event ) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
  }

  return (
    <div className="App">
      <h1>Hallo chat app</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__fromControl">
          <InputLabel> Enter a Message </InputLabel>
          <Input 
            className="app_input"
            value={input} 
            onChange={event => setInput(event.target.value)} 
            placeholder="Enter Your Message ..."
          />
          <IconButton 
            className="app_iconButton"
            disabled={!input} 
            variant="contained"
            onClick={sendMessage}
            color="primary"
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({message, id}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default AppChat;
