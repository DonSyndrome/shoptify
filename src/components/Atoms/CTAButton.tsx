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
                padding: 10px 20px;
                border-radius: 40px;
                border: 0;
                font-size: 1.6rem;
                font-weight: 100;
                transition: transform .1s;

                ${styles.mixins.dropShadow}
              }
            button :hover {
                transform: translateY(-3px);
            }
            `}</style>
        </div>
    )
}
export default CTAButton