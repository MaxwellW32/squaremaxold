import React from 'react'
import styles from "./page.module.css"

export default function page() {
    return (
        <div>
            <h2>Tests</h2>

            <div className={styles.outerDiv}>
                <h1>Text h1</h1>
                <h2>Text h2</h2>
                <h1>Text h3</h1>

                <button className='mainButton'>button</button>


                <div className={styles.innerDiv}>
                    <p>Inner Div</p>

                    <h1>Text h1</h1>
                    <h2>Text h2</h2>
                    <h3>Text h3</h3>

                    <button className='mainButton'>button</button>
                </div>
            </div>
        </div>
    )
}
