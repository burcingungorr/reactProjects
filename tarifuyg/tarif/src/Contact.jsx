import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./other.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png";

export default function Contact() {
  return (
    <div> 
   <div className="menu" style={{ position: "absolute", top: "0", left: "0",display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "10px" }}>

<div className="dropdown" style={{ margin: "0 0 0 0" }}>
  <button style={{ margin: "0" }} className="dropbtn">
    Tarifler
  </button>
  <div style={{ margin: "0" }} className="dropdown-content">
    <Link to="Allrecipe">Tüm Tarifler</Link>
    <Link to="/Favorites">Favoriler</Link>
    <Link to="/WriteRecipe">Tarif Yaz</Link>
  </div>
</div>

<div className="dropdown" style={{ margin: "0 0 0 0" }}>
  <button style={{ margin: "0" }} className="dropbtn">Hakkımızda</button>
  <div className="dropdown-content">
    <Link to="/What">Nedir ?</Link>
    <Link to="/Contact">İletişim</Link>
  </div>
</div>

</div>



      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '0 50px',
        marginTop:"50px"
      }}>
        <img
          src={logo}
          alt="İletişim Görseli"
          style={{ height: 450, width: 450, marginRight: "40px" }}
        />

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '500px',
          height: '450px',
          padding: '25px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
        }}>
          <h2>Bize Ne Sormak İstersiniz?</h2>
          <h3 style={{ margin: 10 }}>İletişime Geçin</h3>

          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="name-input" sx={{ fontSize: '1.2rem' }}>
              İsim
            </InputLabel>
            <Input
              id="name-input"
              sx={{ fontSize: '1.2rem', padding: '10px' }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: 'black', fontSize: '2rem' }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="email-input" sx={{ fontSize: '1.2rem' }}>
              Email
            </InputLabel>
            <Input
              id="email-input"
              sx={{ fontSize: '1.2rem', padding: '10px' }}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'black', fontSize: '2rem' }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="description-input" sx={{ fontSize: '1.2rem' }}>
              Açıklama
            </InputLabel>
            <Input
              id="description-input"
              sx={{ fontSize: '1.2rem', padding: '10px' }}
              startAdornment={
                <InputAdornment position="start">
                  <DescriptionIcon sx={{ color: 'black', fontSize: '2rem' }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="contained"
            endIcon={<SendIcon sx={{ fontSize: '2rem' }} />}
            sx={{
              backgroundColor: 'orange',
              fontSize: '1.2rem',
              padding: '10px 20px',
              '&:hover': { backgroundColor: 'green' },
            }}
          >
            Gönder
          </Button>
        </Box>

        <div className="contactitle" style={{ textAlign: 'right', marginLeft: "150px" }}>
          <h2>Bize Ulaşın</h2>
          <h5>0212 xxx xxx xxxx</h5>
          <h5>tarifbul@gmail.com</h5>

          <div className="sosyalbutonlar">
            <a href="#" target="_blank" className="facebook">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>

            <a href="#" target="_blank" className="instagram">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>

            <a href="#" target="_blank" className="youtube">
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div></div>
  );
}
