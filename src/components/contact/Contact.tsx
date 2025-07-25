import React from "react";
import { Button } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { AiFillGithub, AiFillTwitterCircle, AiOutlineArrowRight } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import "./Contact.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { text } from "../../helpers/text";

export type Contact = {
  name: string,
  info: string,
  icon: React.ReactElement,
  url: string,
}

export const contacts: Contact[] = [
  {
    name: "EMAIL:",
    info: "alpa26846@gmail.com",
    icon: <MdOutlineEmail className="contact-icon" />,
    url: "mailto:alpa26846@gmail.com",
  },
  {
    name: "DISCORD:",
    info: "AlpaCoin",
    icon: <FaDiscord className="contact-icon" />,
    url: "https://discord.gg/U5bYk8M9",
  },
  {
    name: "GitHub:",
    info: "@Alpa8820",
    icon: <AiFillGithub className="contact-icon" />,
    url: "https://github.com/Alpa8820",
  },
  {
    name: "LOCATION & ZONE:",
    info: "Japan, UTC+9",
    icon: <IoLocationOutline className="contact-icon" />,
    url: "https://www.google.com.hk/search?q=%E5%BE%B3%E5%B3%B6%E7%9C%8C%E5%BE%B3%E5%B3%B6%E5%B8%82%E6%B2%96%E6%B5%9C%E6%9D%B13%E4%B8%81%E7%9B%AE21%E7%95%AA%E5%9C%B0&oq=%E5%BE%B3%E5%B3%B6%E7%9C%8C%E5%BE%B3%E5%B3%B6%E5%B8%82%E6%B2%96%E6%B5%9C%E6%9D%B13%E4%B8%81%E7%9B%AE21%E7%95%AA%E5%9C%B0&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg70gEHNTMzajBqN6gCALACAA&sourceid=chrome&ie=UTF-8",
  },
];

const Contact = () => {

  const { language } = useLanguage();

  return(
    <div className="bg-contact" id="contact">
      <div className="contact-header">
        <p className="heading">{text[language].contactHeading}</p>
        {/*<p className="text">If you have any questions or want to hire me, please contact me:</p>*/}
      </div>

      <div className="contact-grid">
        {contacts.map((contact: Contact) => {
          return(
            <a key={uuidv4()} href={contact.url} target="_blank" rel="noreferrer">
              <div className="contact-section">
                {contact.icon}
                <div className="contact-text-div">
                  <p className="contact-title">{contact.name}</p>
                  <p className="contact-details">{contact.info}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="button-container">
        <a href="alpa26846@gmail.com">
          <Button size='lg' rightIcon={<AiOutlineArrowRight />} colorScheme="blue" variant='solid' className="contact-btn">
            {text[language].contactButton}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Contact;