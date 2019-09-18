import React from "react";
import Link from 'next/link';
import CTAButton from "../Atoms/CTAButton";
import styles from "../../styles/index";


type Props = {
}

const Hero = ({}: Props) => (
  <div className="parallax">
        <div className="title">
          <h1>
            התחל עכשיו
        </h1>
          <Link href="/login-with-spotify" prefetch={false}>
            <a>
              <CTAButton>
                התחבר
              </CTAButton>
            </a>
          </Link>
        </div>
    <style jsx>{`


    .parallax {
      ${styles.mixins.heroMinHeight}
      /* The image used */
      background-image: url('/static/home_page_bg.png');
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
