import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth"; 
import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "./UserProvider";  
import Man from "../assets/man.png";
import Woman from "../assets/woman.png";

const Avatar = () => {
  const [loading, setLoading] = useState(true);
  const { avatarSrc, setAvatarSrc } = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log(userData);

            if (userData?.gender) {
              const avatar = userData.gender === "female" ? Woman : Man;
              setAvatarSrc(avatar);
            }
          }
        } catch (error) {
          console.error("Veri çekerken hata oluştu:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      console.log("Kullanıcı oturum açmamış");
      setLoading(false);
    }
  }, [setAvatarSrc]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      <img
        alt="User Avatar"
        src={avatarSrc} 
        style={{
          width: "10%",
          height: "10%",
          objectFit: "cover",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

export default Avatar;
