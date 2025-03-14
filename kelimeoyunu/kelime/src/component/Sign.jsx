import React, { useState, useContext } from "react";
import { auth, db } from "../config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc,getDoc } from "firebase/firestore";
import {UserContext} from "./UserProvider"; 
import { useFormik } from "formik"; 
import * as Yup from "yup";
import "./Questionsscreen.css";
import { Stepper } from 'react-form-stepper'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Sign = () => {
  const { setUsername } = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState("signin");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [usernameError, setUsernameError] = useState("");

  const steps = ["Hesap Bilgileri", "Kişisel Bilgiler", "Şifre"];

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, "users", user.uid); 
      const userDoc = await getDoc(userDocRef);  
  
      if (userDoc.exists()) {
        setUsername(userDoc.data().name);
        setMessage("Giriş başarılı!");
      } else {
        setMessage("Kullanıcı bulunamadı!");
      }
    } catch (error) {
      console.error("Giriş hatası: ");
      setMessage("Giriş başarısız! ");
    }
  };
  

  const handleRegister = async (values) => {
    try {
      const q = query(collection(db, "users"), where("name", "==", values.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Bu kullanıcı adı zaten alınmış.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: values.name,
        email: user.email,
        age: values.age,
        city: values.city,
        gender: values.gender,
      });

      await updateProfile(user, { displayName: values.name });

      setUsername(values.name);

      setMessage("Kayıt başarılı!");
    } catch (error) {
      console.error("Kayıt hatası: ");
      setMessage("Kayıt başarısız! ");
    }
  };

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçersiz email adresi").required("Zorunlu Alan"),
      password: Yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Zorunlu Alan"),
    }),
    onSubmit: handleLogin,
  });

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      age: 10,
      gender: "",
      city: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçersiz email adresi").required("Zorunlu Alan"),
      password: Yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Zorunlu Alan"),
      name: Yup.string().min(2, "İsim en az 2 karakter olmalıdır").required("Zorunlu Alan"),
      age: Yup.number().min(10, "Yaş en az 10 olmalıdır.").required("Zorunlu Alan"),
      city: Yup.string().required("Zorunlu Alan"),
      gender: Yup.string().required("Zorunlu Alan"),
    }),
    onSubmit: handleRegister,
  });


  const ErrorMessage = ({ touched, error }) => {
    return touched && error ? <p className="error-message">{error}</p> : null;
  };

  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return !formikRegister.errors.email && !formikRegister.errors.name;
      case 1:
        return !formikRegister.errors.age && !formikRegister.errors.city && !formikRegister.errors.gender;
      case 2:
        return !formikRegister.errors.password;
      default:
        return false;
    }
  };

  return (
    <div className="container3">
      <div className="tabs">
        <label className={`tab ${selectedTab === "signin" ? "active" : ""}`} onClick={() => setSelectedTab("signin")}>
          Giriş
        </label>
        <label className={`tab ${selectedTab === "register" ? "active" : ""}`} onClick={() => setSelectedTab("register")}>
          Kayıt
        </label>
      </div>

      {selectedTab === "signin" ? (
        <form onSubmit={formikLogin.handleSubmit} className="page login" style={{marginTop:"100px"}} >
          <input
            type="email"
            name="email"
            placeholder="E-Posta"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            className={formikLogin.touched.email && formikLogin.errors.email ? "error" : ""}
          />
          <ErrorMessage touched={formikLogin.touched.email} error={formikLogin.errors.email} />

          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            className={formikLogin.touched.password && formikLogin.errors.password ? "error" : ""}
          />
          <ErrorMessage touched={formikLogin.touched.password} error={formikLogin.errors.password} />

          <button type="submit" style={{backgroundColor:"#FFC202"}}>Giriş Yap</button>
          {message && <p className="error-message">{message}</p>}
        </form>
      ) : (
        <div style={{marginTop:"30px"}}>
          <Stepper 
            activeStep={activeStep} 
            steps={steps} 
            onStep={(step) => setActiveStep(step)} 
          />

          <form onSubmit={formikRegister.handleSubmit} className="page signup">
            {activeStep === 0 && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="E-Posta"
                  value={formikRegister.values.email}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  className={formikRegister.touched.email && formikRegister.errors.email ? "error" : ""}
                />
                <ErrorMessage touched={formikRegister.touched.email} error={formikRegister.errors.email} />

                <input
                  type="text"
                  name="name"
                  placeholder="Kullanıcı Adı"
                  value={formikRegister.values.name}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  className={formikRegister.touched.name && formikRegister.errors.name ? "error" : ""}
                />
                <ErrorMessage touched={formikRegister.touched.name} error={formikRegister.errors.name} />
                {usernameError && <p className="error-message">{usernameError}</p>}
              </>
            )}

            {activeStep === 1 && (
              <>
                <input
                  type="range"
                  name="age"
                  min="1"
                  max="100"
                  step="1"
                  value={formikRegister.values.age}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  className={formikRegister.touched.age && formikRegister.errors.age ? "error" : ""}
                />
                <span className="age-display" style={{color:"black",display:"flex"}}>Yaş:{formikRegister.values.age}</span>
                <ErrorMessage touched={formikRegister.touched.age} error={formikRegister.errors.age} />

                <input
                  type="text"
                  name="city"
                  placeholder="Şehir"
                  value={formikRegister.values.city}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                />
                <ErrorMessage touched={formikRegister.touched.city} error={formikRegister.errors.city} />

                <select
                  name="gender"
                  value={formikRegister.values.gender}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                >
                  <option value="">Cinsiyet Seçiniz</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                  <option value="other">Diğer</option>
                </select>
                <ErrorMessage touched={formikRegister.touched.gender} error={formikRegister.errors.gender} />
              </>
            )}

            {activeStep === 2 && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  value={formikRegister.values.password}
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                />
                <ErrorMessage touched={formikRegister.touched.password} error={formikRegister.errors.password} />
                <button type="submit"  style={{backgroundColor:"#FFC202"}}>Kayıt Ol</button>
              </>
            )}
          </form>

          <div className="stepper-buttons">
            {activeStep > 0 && (
              <button type="button" onClick={handleBack} disabled={activeStep === 0} style={{marginRight:"40px"}}>
                <ArrowLeft />
              </button>
            )}
            {activeStep < steps.length - 1 && (
              <button type="button" onClick={handleNext} disabled={!isStepValid(activeStep)}>
                <ArrowRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sign;
