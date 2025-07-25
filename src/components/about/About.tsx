import React from "react";
import { Heading, Text, Button } from "@chakra-ui/react";
import { AiFillGithub, AiFillTwitterCircle, AiOutlineArrowRight, AiOutlineMail } from "react-icons/ai";
import { BsTelegram, BsChevronDown } from "react-icons/bs";
import "./About.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { text } from "../../helpers/text";
import { FaDiscord } from "react-icons/fa";

const About = () => {

  // const [isVisible, setIsVisible] = useState<boolean>(true);

  const { language } = useLanguage();

  // const hide = () => setIsVisible(false);

  const getFontSize = () => {
    const width = window.innerWidth;
    if (width < 450) return "5rem";
    if (width < 1250) return "6rem";
    return "8rem";
  };

  /*const getAlertSize = () => {
    const width = window.innerWidth;
    if(width < 1275) return "md";
    return "lg";
  };

  const Alert = () => {
    if(isVisible) {
      return(
        <div className="alert">
          <Heading as="h3" size={getAlertSize()}>
            💻{"   "}<a href="mailto:alpa26846@gmail.com" className="contact-link">Hire Me!</a>
            <span className="follow-me-link">🐦{"   "}</span><a href="https://twitter.com/Alpa8820" className="contact-link">Follow Me!</a>
          </Heading>
          <CloseButton size='lg' className="close-btn" onClick={() => hide()} />
        </div>
      );
    }else{
      return null;
    }
  };*/

  return (
    <>
      <div className="bg" id="about">
        <div className="about-wrapper">
          <div className="about-text">
            <div className="about-title">
              <Heading as='h1' fontSize={getFontSize()} size='4xl'>
                <span className="name">Hi! 👋I am Alpa</span>
              </Heading>
            </div>
            <div className="about-text-desc">
              <Text fontSize='3xl'>{text[language].aboutSkilled} <span className="name">BLOCKCHAIN & WEB DEVELOPER</span> {text[language].aboutText}</Text>
            </div>

            <div className="icons">
              <a href="https://github.com/Alpa8820" target="_blank" rel="noreferrer">
                <AiFillGithub className="icon" />
              </a>
              <a href="https://discord.gg/U5bYk8M9" target="_blank" rel="noreferrer">
                <FaDiscord className="icon" />
              </a>
              <a href="https://t.me/Alpa8820" target="_blank" rel="noreferrer">
                <BsTelegram className="icon" />
              </a>
              <a href="alpa26846@gmail.com" target="_blank" rel="noreferrer">
                <AiOutlineMail className="icon" />
              </a>
            </div>

            <a href="mailto:alpa26846@gmail.com">
              <Button size='lg' rightIcon={<AiOutlineArrowRight />} colorScheme="blue" variant='solid'>
                {text[language].contactButton}
              </Button>
            </a>
          </div>
          <div className="about-avatar">
          </div>
        </div>
        <div className="icon-wrapper">
          <div className="bottom-icon">
            <a href="#more">
              <BsChevronDown />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;