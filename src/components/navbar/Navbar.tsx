// src/Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Heading, Text } from "@chakra-ui/react";
// import English from "../../images/english.png";
// import Japann from "../../images/slovenscina.svg";
import { AiOutlineMail } from "react-icons/ai";
// import { BsTelegram } from "react-icons/bs";
import { useLanguage } from "../../contexts/LanguageContext";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  // const { language } = useLanguage();
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight*0.4) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${showNavbar ? "show" : ""}`}>
      <div>
        <div className="navbarText">
          <Heading as="h2">
            Alpa
          </Heading>
          <Text fontSize="2xl" className="name">
            BLOCKCHAIN & WEB
          </Text>
        </div>
      </div>
      <div className="navbarRight">
        <div className="icons new_font">
          <a href="#" rel="noreferrer">
            <b>H</b>ome&nbsp;
          </a>
          <a href="#more" rel="noreferrer">
            <b>S</b>kill&nbsp;
          </a>
          <a href="#hachathons" rel="noreferrer">
            <b>H</b>ackathon&nbsp;
          </a>
          <a href="#project" rel="noreferrer">
            <b>P</b>roject&nbsp;
          </a>
          <a href="#terminal" rel="noreferrer">
            <b>T</b>erminal&nbsp;
          </a>
          <a href="#contact" rel="noreferrer">
            <b>C</b>ontact
          </a>
        </div>
        {/* {language === "en" ? (
          <a href="/?l=sl">
            <img src={Japann} className="language" alt="Japann" />
          </a>
        ):(
          <a href="/?l=en">
            <img src={English} className="language" alt="English" />
          </a>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
