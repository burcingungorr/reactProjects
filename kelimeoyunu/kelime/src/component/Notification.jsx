import * as React from "react";
import { Notification as KendoNotification, NotificationGroup } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import "../component/Questionsscreen.css"; 

const CustomNotification = ({ message, visible, onClose, type = "error" }) => {
    return (
        <NotificationGroup className="notification-container">
          <Fade>
            {visible && (
              <KendoNotification
                className={`custom-notification notification-${type}`}
                closable={true}
                onClose={onClose}
              >
                <span>{message}</span>
                <button className="notification-close" onClick={onClose}>×</button>
              </KendoNotification>
            )}
          </Fade>
        </NotificationGroup>
      );
      
};

export default CustomNotification;