import React from 'react'
import styles from '../../styles'

type Props = {
    children?: string | null; 
}
const CTAButton = (props:Props) => {
    return (
        <div>
            <button>
                {props.children}
            </button>
            <style jsx>{`
            button{
                background-color:${styles.colors.SpotifyGreen};
                color: ${styles.colors.SpotifyWhite};
                padding: 12px 26px;
                border-radius: 40px;
                border: 0;
                font-size: 1.4rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 300;
                transition: transform .8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                ${styles.mixins["box-shadow-sm"]}
              }
            button :hover {
                transform: scale(1.05);
                ${styles.mixins["spotify-color-gradient"]}
            }
            button :active {
                transform: scale(1);
                transition: transform .1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            }
            `}</style>
        </div>
    )
}
export default CTAButton