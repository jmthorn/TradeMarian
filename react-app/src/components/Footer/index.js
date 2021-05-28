import React from "react";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Github_logo from '../../images/25231.png'
import LinkedIn_logo from '../../images/linkedin-1.png'
import './footer.css';

const Footer = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)


  return (
      <>
        <div id="footer-container">
            <div id="names-container">
                <div className="name-container">
                    <div>Jessica Thornton</div>
                    <div className="socials-container">
                        <a href="https://github.com/jmthorn" className="github_logo">
                            <img src={Github_logo} alt="logo"/>
                        </a>
                        <a href="https://www.linkedin.com/in/jessica-thornton-00615989/" className="github_logo">
                            <img src={LinkedIn_logo} alt="logo"/>
                        </a> 
                    </div>
                </div>
                <div className="name-container">
                    <div>Caroline Mendez</div>
                    <div className="socials-container">
                        <a href="https://github.com/CaroMen" className="github_logo">
                            <img src={Github_logo} alt="logo"/>
                        </a>
                        <a href="https://www.linkedin.com/in/caroline-mendez-41a181134/" className="github_logo">
                            <img src={LinkedIn_logo} alt="logo"/>
                        </a> 
                    </div>
                </div>
                <div className="name-container">
                    <div>Tran Le</div>
                    <div className="socials-container">
                        <a href="https://github.com/trnle" className="github_logo">
                            <img src={Github_logo} alt="logo"/>
                        </a>
                        <a href="https://www.linkedin.com/in/trnle/" className="github_logo">
                            <img src={LinkedIn_logo} alt="logo"/>
                        </a> 
                    </div>
                </div>
                <div className="name-container">
                    <div>Laura Zaliac</div>
                    <div className="socials-container">
                        <a href="https://github.com/lkzailac" className="github_logo">
                            <img src={Github_logo} alt="logo"/>
                        </a>
                        <a href="https://www.linkedin.com/in/laura-zailac/" className="github_logo">
                            <img src={LinkedIn_logo} alt="logo"/>
                        </a> 
                    </div>
                </div>
            </div>
            <div id="copyright">
                ©2021 TradeMarian. All rights reserved.
            </div>
        </div>
      </>
  )
};

export default Footer;