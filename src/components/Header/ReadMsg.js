import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./ReadMsg.module.css";

const ReadMsg = () => {
  //get the emaild from the url parameteres

  const { id } = useParams();

  //get the list of emails from the redux store

  const mails = useSelector((state) => state.mail.mails);

  //get the users email from localstorage and modify it to remove speclial charcter

  const myEmail = localStorage.getItem("email").replace(/['@','.']/g, "");

  //filter the list of emails to find the email with the speacid id

  const singleMail = mails.filter((item) => item.id === id);

  //get the message content from the email with speacid id

  const message = singleMail[0].message;

  console.log(mails, "Single-message");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-fc026-default-rtdb.firebaseio.com/inbox/${myEmail}/${id}.json`,

          {
            method: "PATCH",
            body: JSON.stringify({
              dot: false,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className={classes.message}>{message}</div>
    </Fragment>
  );
};

export default ReadMsg;