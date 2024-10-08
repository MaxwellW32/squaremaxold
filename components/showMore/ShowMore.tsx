"use client"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export default function ShowMore({ label, content, svgColor }: { label: string, content: JSX.Element, svgColor?: string }) {
    const [showing, showingSet] = useState(false)

    return (
        <div style={{ display: "grid" }} className={styles.mainDiv}>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", cursor: "pointer", padding: "1rem" }} onClick={() => showingSet(prev => !prev)}>
                <p>{label}</p>

                <span className="material-symbols-outlined" style={{ rotate: showing ? "-90deg" : "", transition: "rotate 400ms", color: svgColor ?? "" }}>
                    arrow_drop_down
                </span>
            </div>

            <div style={{ padding: '1rem', display: !showing ? "none" : "", overflow: "hidden" }}>
                <div className={`${showing ? styles.animateIn : ""}`} style={{}}>
                    {content}
                </div>
            </div>
        </div>
    )
}
