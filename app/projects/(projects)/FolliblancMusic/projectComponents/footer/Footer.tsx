import React from 'react'
import { MenuItem, menuItem } from '../nav/Nav'
import Link from 'next/link'

const footerMenuItems: menuItem[] = [
    {
        link: "",
        title: "press"
    },
    {
        link: "",
        title: "terms"
    },
    {
        link: "",
        title: "shop"
    },
]

export default function Footer() {
    return (
        <footer style={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-between", color: "var(--gray1)", alignItems: 'center', padding: "2rem 1rem" }}>
            <p style={{ fontFamily: "var(--fakeReceipt)", fontSize: "var(--smallFontSize)" }}>@2024</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {footerMenuItems.map((eachMenuItem, eachMenuItemIndex) => {
                    return (
                        <MenuItem key={eachMenuItemIndex} menuItem={eachMenuItem} />
                    )
                })}
            </div>
        </footer >
    )
}
