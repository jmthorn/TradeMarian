import React from "react";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import User_Image from '../../images/user.png'
import Splash_Image from '../../images/Splash_Image.png'
import Iphone_Animation from '../../images/Iphone_Animation.mp4'
import './splash.css';

const Splash = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const handleSubmit = () => {
    history.push('/sign-up')
  }

  return (
      <>
        <div id="splash-blue">
            <div id="splash-description">
                <h1>Investing for</h1>
                <h1>Everyone</h1>
                <div id="h1-spacer"></div>
                <p>Commission-free investing, plus the tools</p>
                <p>you need to put your money in motion. Sign</p>
                <p>up and get your first stock for free. Certain</p>
                <p>limitations apply.</p>
                <button onClick={handleSubmit}>Sign Up</button>
            </div>
            <div id="image-container">
              <img height="600em" src={Splash_Image} alt="splash_img"></img>
                <video id="video" loop="true" autoPlay="autoplay" muted>
                  <source src={Iphone_Animation} type="video/mp4"></source>
                </video>
            </div>
        </div>
        <div id="splash-white">
          <img height="600em" src={User_Image} alt="user_img"></img>
          <div id="turn">
            <p id="turn1"> It's your turn</p>
            <p>No minimum account balance or special status requirements.</p>
          </div>
        </div>
      </>
  )
};

export default Splash;