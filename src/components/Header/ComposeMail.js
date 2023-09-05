import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(undefined);
  const inputTo = useRef();
  const inputSubject = useRef();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const senderEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "";

  const onEditorStateChange = (newEditor) => {
    setEditorState(newEditor);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("hello");

    const enteredTo = inputTo.current.value;
    const enteredSubject = inputSubject.current.value;

    // const mail = {

    //   // content: editorState.getCurrentContent().getPlainText(),
    // };

    const receiveMail = enteredTo;
    const receiverEmail = receiveMail ? receiveMail.replace(/[@.]/g, "") : "";

    //sending to my outbox,

    try {
      const response = await fetch(
        `https://mail-box-client-fc026-default-rtdb.firebaseio.com/inbox/${senderEmail}.json`,

        {
          method: "POST",
          body: JSON.stringify({
            to: enteredTo,
            subject: enteredSubject,
            content: editorState.getCurrentContent().getPlainText(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("Mail Sent Succefully!!!");
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      alert(err);
    }

    //sending to user inbox

    try {
      const response = await fetch(
        `https://my-projects-b70bb-default-rtdb.firebaseio.com/outbox/${receiverEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: enteredTo,
            subject: enteredSubject,
            content: editorState.getCurrentContent().getPlainText(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      alert(error);
    }

    inputTo.current.value = "";
    inputSubject.current.value = "";
    setEditorState(undefined);
  };

  return (
    <Container style={{width:'90%',border:'1px solid black '}}>
      <Form onSubmit={submitHandler}>
        <h2 style={{ textAlign: "center", margin: "1rem" }}>
          Compose Your Mail
        </h2>
        <Form.Group controlId="to" className="mb-3">
          <Form.Label>To :</Form.Label>
          <Form.Control type="email" required ref={inputTo}  style={{width: '90%',
            padding: '5px',
            border: '1px solid #ccc',
            borderradius: '5px'}}/>
        </Form.Group>
        <Form.Group controlId="subject" className="mb-3">
          <Form.Label>Subject :</Form.Label>
          <Form.Control type="text" required ref={inputSubject} style={{width: '90%',
          padding: '5px',
          border: '1px solid #ccc',
          borderradius: '5px'}}/>
        </Form.Group>
        <Form.Group className="mb-3">
         
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
             
            />
          
        </Form.Group>
        <button 
        style={{
          backgroundcolor: '#007bff',
      
          padding: '10px 20px',
          border: 'none',
          borderradius: '5px',
          cursor: 'pointer'
        }} 
        type="submit" >
          
          Send
        </button>
      </Form>
    </Container>
  );
};
export default ComposeMail;