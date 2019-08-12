import React from "react";
import Link from 'next/link';
import CTAButton from "../Atoms/CTAButton";
import styles from "../../styles/index";
import Image, {Layout} from '../Atoms/Image';




const Hero = () => (
  <div className="container">
    <div className="backgrounds">

      <Image
        src={'url(\'static/home_page_bg.png\')'}
        alt={'alt image'}
        height="80vmax"
        layout={Layout.responsive}
      />
    </div>
    <div className="parallax">
      <div className="title">
        <h1>
          התחל עכשיו
        </h1>
        <Link href="./playlist/shay_test">
          <a>
            <CTAButton>
                עקוב
            </CTAButton> 
          </a>
        </Link>


      </div>
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
    @keyframes g {
      0% {
          opacity: 0;
          transform: translate3d(5vmax,2vmax,0) scale(1.1)
      }

      5% {
          opacity: 1
      }

      33% {
          opacity: 1
      }

      38% {
          opacity: 0;
          transform: translate3d(0,-2vmax,0) scale(1)
      }
    }

    @keyframes h {
      0% {
          opacity: 0;
          transform: translate3d(-2vmax,0,0) scale(1)
      }

      5% {
          opacity: 1
      }

      33% {
          opacity: 1
      }

      38% {
          opacity: 0;
          transform: translate3d(2vmax,-2vmax,0) scale(1.1)
      }
    }

    @keyframes i {
      0% {
          opacity: 0;
          transform: translate3d(0,2vmax,0) scale(1)
      }

      5% {
          opacity: 1
      }

      33% {
          opacity: 1
      }

      38% {
          opacity: 0;
          transform: translateY(-2vmax) scale(1.1)
      }
    }


  `}</style>
  </div>

)
export default Hero
