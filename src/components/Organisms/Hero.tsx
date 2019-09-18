import React from "react";
import styles from "../../styles/index";
// import Link from 'next/link';
// import CTAButton from "../Atoms/CTAButton";




const Hero = () => (
  <div className="parallax">
    <div className="title">
      <h1>
      Coming
      </h1>
      <h2>
      soon
      </h2>
      {/* <Link href="./playlist/shay_test">
        <a>
          <CTAButton>
              עקוב
          </CTAButton> 
        </a>
      </Link> */}


    </div>
    <style jsx>{`


    .parallax {
      ${styles.mixins.heroMinHeight}
      /* The image used */
      background-image: url('static/home_page_bg.png');
      /* Create the parallax scrolling effect */
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .title {
      font-size: 48px;
      color:white;
      text-align: center;
    }


  `}</style>
  </div>
)
export default Hero
