import React, { useContext } from "react";
import Header from "../component/Header";
import Sign from "../component/Sign";
import { UserContext } from "../component/UserProvider";
import Table from "../component/Table";
import { Logoutbtn } from "../component/Logoutbtn";
import Notificationspanel from "../component/Notificationspanel";
import Avatar from "../component/Avatar";

const Profil = () => {
  const { username, userId } = useContext(UserContext); 

  return (
    <div>
      <Header />

      {username ? (
        <div style={{ textAlign: "center", marginTop: "29px" }}>
          <p>Hoşgeldin <strong>{username}</strong>!</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", width: "100%" }}>
            <div style={{ position: "absolute", right: "10px" }}>
              <Notificationspanel />
            </div>
          </div>
          <Avatar userId={userId} />
          <Table />
          <Logoutbtn />
        </div>
      ) : (
        <Sign />
      )}
    </div>
  );
};

export default Profil;
