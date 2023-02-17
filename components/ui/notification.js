import ReactDOM from "react-dom";

import classes from "./notification.module.css";
// here we only need to show notifications from contact page, no need to use context here

//this component will be rendered on contact form component based on requestStatus
function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success; //change to css file for color etc
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`; //change className based on req. status for css file to change color etc

  //creating portal

  //To utilize  _document.js file to actually render this notification.js component of ui folder component  through a portal w/o this the notification is showing correctly because of its styling but it is actually just dumped into this complex html structure somewhere nested in our html element tree ,while its look correctly but its not correct semantically and it can make our page bit more inaccessible,,thats why we have this feature called react portals

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")
  );
}

export default Notification;
