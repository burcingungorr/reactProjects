import React, { useContext} from "react";

import Floatingbar from "../component/Floatingbar";
import Menu from '../component/menu';
import { ThemeContext } from "../component/createcontext";

const Categories = () => {
  const {theme}=useContext(ThemeContext)

  return (
    <div>
      <div style={{marginTop:"19px"}}>
      <h1 style={{ color: theme === "light" ? "black" : "white", textAlign: 'center' }}>Kategoriler</h1>

                    <Menu/>

      </div>

        <div>
            <Floatingbar/>
        </div>
    </div>
  )
}

export default Categories