import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Inbox = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);

  const email = userEmail.replace(/[@.]/g, "");
  const [mails, setEmails] = useState([]);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
            `https://mail-box-client-fc026-default-rtdb.firebaseio.com/inbox/${email}.json`
        );
        if (response.ok) {
          const data = await response.json();
          setEmails(data);
        } else {
          throw new Error("Something Went Wrong");
        }
      } catch (err) {
        alert("Something went Wrong");
      }
    };
    fetchMails();
  }, [email]);

  

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
          {mails[key].from ? `From: ${(mails[key].from)}` : 'From: N/A'}<br />
          {mails[key].subject ? `Subject: ${mails[key].subject}` : 'Subject: N/A'}<br />
          {mails[key].content ? `Content: ${mails[key].content}` : 'Content: N/A'}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;