/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "./terminal.css";
import { text } from "../../helpers/text";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@chakra-ui/react";

type TypewriterProps = {
  text: string;
  delay: number;
  func: (output: string) => void;
  Spinner?: boolean;
  spinTime?: number;
};

const Typewriter = ({ text, delay, func, Spinner, spinTime }: TypewriterProps) => {
  const startTime = new Date();
  let Output = "";
  let index = 0;
  text = Spinner ? "⠋⠙⠹⠸⠼⠴⠦⠧⠇" : text;

  const intervalId: any = setInterval(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        return clearInterval(intervalId);
      }
    });

    const endTime = new Date();
    if (index < text.length) {
      Output += text[index];
      index += 1;

      if (Spinner) {
        func(text[index]);
        setTimeout(function () {
          func(text[index + 1]);
        }, 700);
        if (index === 8) {
          if (endTime.getTime() - startTime.getTime() < (spinTime || 0)) {
            index = 0;
          } else {
            clearInterval(intervalId);
          }
        }
      } else {
        func(Output);
      }
    } else {
      return clearInterval(intervalId);
    }
  }, delay);
};

const Terminal: React.FC = () => {

  const { language } = useLanguage();

  const [Text1, setText1] = useState<string>("");
  const [Text2, setText2] = useState<string>("");
  const [Text3, setText3] = useState<string>("");
  const [Text4, setText4] = useState<string>("");
  const [start, setStart] = useState(false);
  const cursor = "▮";
  let previousCommand: string;

  const [prevusedCommand, setprevusedCommand] = useState<string[]>([]);

  const SkipIntro = () => {
    let id = setTimeout(() => { }, 0) as unknown as number;
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0) as unknown as number;
    while (id--) {
      clearInterval(id);
    }
    setText1("ssh geust@takumi.dev");
    setText3("Access Granted!");
  };

  useEffect(() => {
    if(start) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          if (!Text3.includes("Access")) {
            let id = setTimeout(() => { }, 0) as unknown as number;
            while (id--) {
              clearTimeout(id);
            }

            id = setInterval(() => { }, 0) as unknown as number;
            while (id--) {
              clearInterval(id);
            }
            setText1("ssh geust@takumi.dev");
            setText2("geust@takumi.dev's password:");
            setText3("Access Granted!");
          }
          const CommandArea = document.getElementById("command") as HTMLInputElement;
          if (CommandArea) {
            previousCommand = CommandArea.value;
            if(previousCommand.length>0) {
              setprevusedCommand(prevArray => [...prevArray, "guest@takumi.dev:~$ " + previousCommand]);
              /*if (CommandArea.value === "github") {
                window.open("https://github.com/0xTakumi", "_blank");
              }
              else if (CommandArea.value === "twitter") {
                window.open("https://Takumi.dev", "_blank");
              }
              else if (CommandArea.value === "telegram") {
                window.open("https://github.com/0xTakumi/portfolio", "_blank");
              }
              else if (CommandArea.value === "discord") {
                window.open("https://github.com/0xTakumi/portfolio", "_blank");
              }
              else if (CommandArea.value === "email") {
                window.open("https://github.com/0xTakumi/portfolio", "_blank");
              }*/
              CommandArea.value = "";
            }
          }
        }
      });

      Typewriter({ text: "ssh geust@takumi.dev", delay: 100, func: setText1 });

      setTimeout(() => {
        setText2("geust@takumi.dev's password:▮");
      }, 3000);

      setTimeout(() => {
        Typewriter({ text: "", delay: 100, func: setText4, Spinner: true, spinTime: 2500 });
      }, 4300);

      setTimeout(() => {
        setText3("Connecting to geust@takumi.dev...");
      }, 4300);

      setTimeout(() => {
        setText2("geust@takumi.dev's password:");
        setText3("> Access granted.");
      }, 7300);
    }
  }, [start]);

  return (
    <div className="bg-skills" id="terminal">
      <p className="heading">{text[language].terminalHeading}</p>
      <p className="text">{text[language].terminalDescription}</p>
      <div className="terminal">
        {start ? (
          <div className='console'>
            <span className='userPrefix'>user@localhost:~$
              <span style={{ color: "white", marginLeft: "8px" }}>{Text1}{Text1.length === 20 ? "" : cursor}</span>
            </span>

            {Text3.includes("Access") ? "" : <span id='skipButton' onClick={SkipIntro}>Press Enter or Click Here to Skip</span>}
            {Text2}
            <span> {Text4} <span style={{ color: Text3.includes("Access") ? ("yellow") : "" }} >{Text3}</span></span>
            <br />
            {Text3.includes("Access") ? (
              <pre>
                {`                _______                  _             _ 
               |__   __|                (_)           | |
                  | | ___ _ __ _ __ ___  _ _ __   __ _| |
                  | |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
                  | |  __/ |  | | | | | | | | | | (_| | |
                  |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
                                                  
      `}
              </pre>
            ) : null}

            {Text3.includes("Access") ? <span>Welcome! This is my portfolio website.</span> : ""}
            {Text3.includes("Access") ? <span>What is this? It's an interactive terminal you can use to learn more about me and my work.</span> : ""}<br />
            {Text3.includes("Access") ? <span><span style={{ color: "skyblue" }}>Available Commands:</span></span> : ""}
            {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>General: </span> about, hackathons, projects, all links, clear</span> : ""}
            {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>Links:</span> github, email, discord, telegram, twitter</span> : ""}

            <br></br>
            {Text3.includes("Access") ? <span>Thank you for visiting!◝(ᵔᵕᵔ)◜</span> : ""}
            <br></br>
            <ul className='previousCommands' id='console23'>
              {prevusedCommand.map((item, index) => {
                if (item.match(new RegExp(`\\b${"discord"}\\b`, "g"))) {
                  return (
                    <div  className="mcq-wrapper">
                      <li className="userPrefix" key={index}>{item}</li>
                      <ul id="mcq" className="mcq">
                        <li key={index} className="mcq-option">My Discord: <a href="https://discord.com/users/775249998379614238" rel="noreferrer" target="_blank">Takumi.dev ↗</a></li>
                      </ul>
                      <br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"github"}\\b`, "g"))) {
                  return (
                    <div  className="mcq-wrapper">
                      <li className="userPrefix" key={index}>{item}</li>
                      <ul id="mcq" className="mcq">
                        <li key={index} className="mcq-option">My Github: <a href="https://github.com/0xTakumi" rel="noreferrer" target="_blank">@0xTakumi ↗</a></li>
                      </ul>
                      <br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"email"}\\b`, "g"))) {
                  return (
                    <div  className="mcq-wrapper">
                      <li className="userPrefix" key={index}>{item}</li>
                      <ul id="mcq" className="mcq">
                        <li key={index} className="mcq-option">My Email: <a href="mailto:alpa26846@gmail.com" rel="noreferrer" target="_blank">alpa26846@gmail.com ↗</a></li>
                      </ul>
                      <br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"twitter"}\\b`, "g"))) {
                  return (
                    <div  className="mcq-wrapper">
                      <li className="userPrefix" key={index}>{item}</li>
                      <ul id="mcq" className="mcq">
                        <li key={index} className="mcq-option">My Twitter: <a href="https://twitter.com/0xTakumi" rel="noreferrer" target="_blank">@0xTakumi  ↗</a></li>
                      </ul>
                      <br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"telegram"}\\b`, "g"))) {
                  return (
                    <div  className="mcq-wrapper">
                      <li className="userPrefix" key={index}>{item}</li>
                      <ul id="mcq" className="mcq">
                        <li key={index} className="mcq-option">My Telegram: <a href="https://t.me/TakumiWeb3" rel="noreferrer" target="_blank">@TakumiWeb3  ↗</a></li>
                      </ul>
                      <br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"all links"}\\b`, "g"))) {
                  return (
                    <div><li className="userPrefix" key={index}>{item}</li>
                      <label htmlFor="mcq">Click on link to open it:</label>
                      <div className="mcq-wrapper"><br></br>
                        <ul id="mcq" className="mcq">
                          <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi" target='_blank' rel="noreferrer">My Github: @0xTakumi ↗</a></li>
                          <li className="mcq-option" tabIndex={1}><a href="mailto:alpa26846@gmail.com" target='_blank' rel="noreferrer">My Email: alpa26846@gmail.com↗</a></li>
                          <li className="mcq-option" tabIndex={2}><a href="https://twitter.com/0xTakumi" target='_blank' rel="noreferrer">My Twitter: @0xTakumi ↗</a></li>
                          <li className="mcq-option" tabIndex={3}><a href="https://t.me/TakumiWeb3" target='_blank' rel="noreferrer">My Telegram: @TakumiWeb3 ↗</a></li>
                          <li className="mcq-option" tabIndex={4}><a href="https://discord.com/users/775249998379614238" target='_blank' rel="noreferrer">My Discord: Takumi.dev ↗</a></li>
                        </ul>
                      </div><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"hackathons"}\\b`, "g"))) {
                  return (
                    <div>
                      <li className="userPrefix" key={index}>{item}</li>
                      <label htmlFor="mcq">Hackathons:</label>
                      <div className="mcq-wrapper"><br></br>
                        <ul id="mcq" className="mcq">
                          <li className="mcq-option" tabIndex={0}><a href="https://moralis.io/filecoin-hackathon/" target='_blank' rel="noreferrer">1. Morelis & Filecoin: Cardix ↗</a></li>
                          <li className="mcq-option" tabIndex={1}><a href="https://moralis.io/google-hackathon/" target='_blank' rel="noreferrer">2. Moralis & Google: BananaPay ↗</a></li>
                          <li className="mcq-option" tabIndex={2}><a href="https://chainlinkfall2022.devpost.com/" target='_blank' rel="noreferrer">3. Chainlink Fall 2022: BananaPay ↗</a></li>
                        </ul>
                      </div><br />
                        To view more info about hackathon use <b>hackathon number</b> (eg. hackathon 1)<br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"view cardix"}\\b`, "g")) || item.match(new RegExp(`\\b${"hackathon 1"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Moralis & Filecoin: Cardix
                      <br></br><br></br>
                    Create your own personalized Gift Cards as NFTs and lock some cryptos into them. Surprise your friends and family! To not forget any important events users can also schedule gift card transfers. Applications has a template store - a gift card library that can be sent with just a few clicks.
                      <br></br><br></br>
                      <li className="mcq-option" tabIndex={0}><a href="https://moralis.io/filecoin-hackathon/" target='_blank' rel="noreferrer">Hackathon Website ↗</a></li>  
                      <li className="mcq-option" tabIndex={0}><a href="https://cardix.Takumi.dev" target='_blank' rel="noreferrer">Cardix Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"view cardix"}\\b`, "g")) || item.match(new RegExp(`\\b${"hackathon 2"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Moralis & Google: BananaPay
                      <br></br><br></br>
                    Complete copy of Stripe, but for cryptocurrencies. The most customizable solution for receiving automated recurring payments in cryptocurrencies. APIs, webhooks, plugins, BananaPay has it all.<br></br><br></br>
                      <li className="mcq-option" tabIndex={0}><a href="https://moralis.io/google-hackathon/" target='_blank' rel="noreferrer">Hackathon Website ↗</a></li>  
                      <li className="mcq-option" tabIndex={0}><a href="https://bananapay.Takumi.dev" target='_blank' rel="noreferrer">BananaPay Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"view cardix"}\\b`, "g")) || item.match(new RegExp(`\\b${"hackathon 3"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Chainlink Fall 2022: BananaPay
                      <br></br><br></br>
                    Complete copy of Stripe, but for cryptocurrencies. The most customizable solution for receiving automated recurring payments in cryptocurrencies. APIs, webhooks, plugins, BananaPay has it all.<br></br><br></br>
                      <li className="mcq-option" tabIndex={0}><a href="https://chainlinkfall2022.devpost.com/" target='_blank' rel="noreferrer">Hackathon Website ↗</a></li>  
                      <li className="mcq-option" tabIndex={0}><a href="https://bananapay.Takumi.dev" target='_blank' rel="noreferrer">BananaPay Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"projects"}\\b`, "g"))) {
                  return (
                    <div>
                      <li className="userPrefix" key={index}>{item}</li>
                      <label htmlFor="mcq">Projects:</label>
                      <div className="mcq-wrapper"><br></br>
                        <ul id="mcq" className="mcq">
                          <li className="mcq-option" tabIndex={0}><a href="https://cardix.Takumi.dev/" target='_blank' rel="noreferrer">1. Cardix ↗</a></li>
                          <li className="mcq-option" tabIndex={1}><a href="https://bananapay.Takumi.dev/" target='_blank' rel="noreferrer">2. BananaPay ↗</a></li>
                          <li className="mcq-option" tabIndex={2}><a href="https://bullfolio.Takumi.dev/" target='_blank' rel="noreferrer">3. BullFolio ↗</a></li>
                          <li className="mcq-option" tabIndex={3}><a href="https://github.com/web3ui/web3uikit" target='_blank' rel="noreferrer">4. Web3UIKit ↗</a></li>
                          <li className="mcq-option" tabIndex={4}><a href="https://Takumi.dev" target='_blank' rel="noreferrer">5. Portfolio ↗</a></li>
                          <li className="mcq-option" tabIndex={5}><a href="https://projects.Takumi.dev/whiteboard" target='_blank' rel="noreferrer">6. Collaborative Whiteboard ↗</a></li>
                          <li className="mcq-option" tabIndex={6}><a href="https://projects.Takumi.dev/simple-chat" target='_blank' rel="noreferrer">7. Token-Gated Chat ↗</a></li>
                          <li className="mcq-option" tabIndex={7}><a href="https://projects.Takumi.dev/coin-flip" target='_blank' rel="noreferrer">8. CoinFlip ↗</a></li>
                          <li className="mcq-option" tabIndex={8}><a href="https://projects.Takumi.dev/diamond-hands" target='_blank' rel="noreferrer">9. Diamond Hands ↗</a></li>
                          <li className="mcq-option" tabIndex={9}><a href="https://projects.Takumi.dev/crypto-tracker" target='_blank' rel="noreferrer">10. Crypto Tracker ↗</a></li>
                          <li className="mcq-option" tabIndex={10}><a href="https://github.com/0xTakumi/mobile-wallet" target='_blank' rel="noreferrer">11. Mobile Wallet ↗</a></li>
                          <li className="mcq-option" tabIndex={11}><a href="https://bananapay-v1.tijna.dev" target='_blank' rel="noreferrer">12. BananaPayV1 ↗</a></li>
                        </ul>
                      </div><br />
                        To view more info about a project use <b>project number</b> (eg. project 1)<br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 1"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Cardix
                      <br></br><br></br>
                    Create your own personalized Gift Cards as NFTs and lock some cryptos into them. Surprise your friends and family! To not forget any important events users can also schedule gift card transfers. Applications has a template store - a gift card library that can be sent with just a few clicks.
                      <br /><br />  
                    Techstack: React, TypeScript, Chainlink, Solidity, CSS
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://cardix.Takumi.dev" target='_blank' rel="noreferrer">Cardix Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 2"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    BananaPay
                      <br></br><br></br>
                    Complete copy of Stripe, but for cryptocurrencies. The most customizable solution for receiving automated recurring payments in cryptocurrencies. APIs, webhooks, plugins, BananaPay has it all.<br></br><br></br>
                      <br /><br />  
                    Techstack: React, TypeScript, Chainlink, Solidity, CSS, Firebase
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://bananapay.Takumi.dev" target='_blank' rel="noreferrer">BananaPay Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 3"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    BullFolio
                      <br></br><br></br>
                    Crypto portfolio tracker that allows users to create strategies and alerts based on technical analysis. Users can create custom strategies on any pair (USD or BTC) and get notified when something happens.
                      <br /><br />  
                    Techstack: React, TypeScript, Solidity, CSS, Firebase
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://bullfolio.Takumi.dev" target='_blank' rel="noreferrer">BullFolio Website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 4"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Web3UIKit
                      <br></br><br></br>
                    Open-source react library with beautiful and lightweight UI components for web3 developers. I was one of the contributors for this project. Unfortunately this project is no longer maintained.
                      <br /><br />  
                    Techstack: React, TypeScript, CSS
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/web3ui/web3uikit" target='_blank' rel="noreferrer">Web3UIKit ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 5"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Portfolio
                      <br></br><br></br>
                    My personal portfolio website, showing my blockchain projects and achievements.
                      <br /><br />  
                    Techstack: React, TypeScript, CSS
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://Takumi.dev" target='_blank' rel="noreferrer">Portfolio (this website) ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 6"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Collaborative Whiteboard
                      <br></br><br></br>
                    An online collaborative whiteboard app, with private and public rooms for people to chat and draw in real-time. They can also mint NFTs!
                      <br /><br />  
                    Techstack: React, TypeScript, CSS, NodeJS, Socket.io
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/collaborative-canvas" target='_blank' rel="noreferrer">Collaborative Whiteboard Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 7"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Token-Gated Chat
                      <br></br><br></br>
                    Chat groups with limitations based on users token balances ("token-gated"). The project was build in a Moralis 7-day challenge.
                      <br /><br />  
                    Techstack: HTML, JavaScript, CSS
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/simple-crypto-chat" target='_blank' rel="noreferrer">Token-Gated Chat Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 8"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Coin Flip
                      <br></br><br></br>
                    Multiplayer Coin Flip game using smart contracts and chainlink VRF to determine a winner in decentralized way. Users can bet in a coin flip games where winner takes it all.
                      <br /><br />  
                    Techstack: React, Solidity, Chainlink, TypeScript, Hardhat
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/coin-flip" target='_blank' rel="noreferrer">Coin Flip Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 9"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Diamond Hands
                      <br></br><br></br>
                    Funny blockchain game that prevents you to panic sell your cryptos by locking them in smart contract.
                      <br /><br />  
                    Techstack: React, Solidity, TypeScript, Hardhat
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/diamond-hands" target='_blank' rel="noreferrer">Diamond Hands Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 10"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Crypto Tracker
                      <br></br><br></br>
                      Users can see all statistics about top 250 cryptos and create their own personal portfolio.
                      <br /><br />  
                    Techstack: React, CSS, JavaScript
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/crypto-tracker" target='_blank' rel="noreferrer">Crypto Tracker Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 11"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    Mobile Wallet
                      <br></br><br></br>
                      Shows on-chain stats off user's address. User can add personal contacts for easy assets transfer. And view real time gas prices.
                      <br /><br />  
                    Techstack: ReactNative, CSS, JavaScript
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://github.com/0xTakumi/mobile-wallet" target='_blank' rel="noreferrer">Mobile Wallet Github ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"project 12"}\\b`, "g"))) {
                  return (
                    <div className='aboutme'><br></br>
                    BananaPayV1
                      <br></br><br></br>
                    A payment system for receiving recurring payments in cryptocurrencies. (first version)
                      <br /><br />  
                    Techstack: React, TypeScript, Solidity, Chainlink, Hardhat, CSS
                      <br /><br />
                      <li className="mcq-option" tabIndex={0}><a href="https://bananapay-v1.Takumi.dev/" target='_blank' rel="noreferrer">BananaPayV1 website ↗</a></li><br />
                    </div>
                  );
                }
                else if (item.match(new RegExp(`\\b${"clear"}\\b`, "g"))) {
                  setprevusedCommand([]);
                  return "";
                }
                else if (item.match(new RegExp(`\\b${"about"}\\b`, "g"))) {
                  return (
                    <div>
                      <li className="userPrefix" key={index}>{item}</li>
                      <div className='aboutme'><br></br>
                      Hi, nice to meet you. I'm Takumi, blockchain and web developer from Japan.
                        <br></br><br></br>
                          I started programming when I was 13 and have been programming ever since. I received my Master's degree in Computer Science from Mapua University from March 2012 to June 2017. I started working as a developer at Tech Solution in August 2017, and that's when I got interested in cryptocurrencies. I have a great passion for the blockchain industry and believe that it has the potential to change the world for the better. After learning how blockchain and cryptocurrencies work, I started learning related technologies and participating in hackathons. I won three hackathons in less than a year. I also participated in the development of an open source Web3 UI library (Web3UIKit). I am currently focusing on personal projects.
                        <br></br><br></br>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <li className="userPrefix" key={index}>{item}</li>
                    bash: {item.replace("guest@takumi.dev:~$", "")}: command not found<br /><br />
                    </div>
                  );
                }
              })}
            </ul>
            {Text3.includes("Access") ? <span className='commands'><span className='userPrefix'>guest@takumi.dev:~$</span> <input type="text" id="command" name="command" autoFocus></input></span> : ""}
          </div>
        ):(
          <Button size='lg' onClick={() => setStart(true)} colorScheme="blue" variant='solid' className="terminal-btn">
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default Terminal;