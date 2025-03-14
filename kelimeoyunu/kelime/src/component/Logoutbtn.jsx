import React, { useState, useContext } from "react";
import { auth } from '../config'; 
import CustomNotification from "./Notification";
import { UserContext } from "../component/UserProvider"; 

export const Logoutbtn = () => {
    const { setUsername } = useContext(UserContext);
    const [notification, setNotification] = useState(false);
    const [userUID, setUserUID] = useState(('userUID') || null);
    const [userEmail, setUserEmail] = useState(('userEmail') || null);

    const handleLogout = async () => {
        try {
            await auth.signOut(); 
            setUsername("");
            setUserUID(""); 
            setUserEmail(""); 
       
            setNotification(true); 
            setTimeout(() => {
                setNotification(false);
            }, 3000);
        } catch (error) {
            console.error("Çıkış yapılırken bir hata oluştu:", error.message); 
        }
    };

    return (
        <div>
            <div>
                <CustomNotification 
                    message="Çıkış yapıldı!" 
                    visible={notification} 
                    onClose={() => setNotification(false)} 
                />
            </div>
           
            <button
                onClick={handleLogout}
                style={{ marginTop: "50px", padding: "10px 20px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
                ÇIKIŞ
            </button>
        </div>
    );
};
