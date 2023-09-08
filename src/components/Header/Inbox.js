import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Inbox = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const email = userEmail.replace(/[@.]/g, "");
  
  // Initialize mails as an empty object
  const [mails, setEmails] = useState({});

 

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-fc026-default-rtdb.firebaseio.com/inbox/${email}.json`
        );
        if (response.ok) {
          const data = await response.json();
          setEmails(data || {}); // Ensure data is an object or initialize as an empty object
        } else {
          throw new Error("Something Went Wrong");
        }
      } catch (err) {
        alert("Something went Wrong");
      }
    };
    fetchMails();
  }, [email]);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://mail-box-client-fc026-default-rtdb.firebaseio.com/inbox/${email}/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted mail from the frontend state
        const updatedMails = { ...mails };
        delete updatedMails[id];
        setEmails(updatedMails);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <h1>INBOX</h1>
      <ListGroup>
        {Object.keys(mails).map((key) => (
          <ListGroup.Item
            key={key}
            className="m-2"
            style={{
              backgroundColor: "#a563",
              border: "1px solid #ccc",
            }}
          >
            {mails[key].userEmail ? `From: ${mails[key].from}` : 'From: N/A'}-
            {mails[key].subject ? `Subject: ${mails[key].subject}` : 'Subject: N/A'}-
            {mails[key].content ? `Content: ${mails[key].content}` : 'Content: N/A'}-
            <button onClick={() => deleteHandler(key)}>
              Delete
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
