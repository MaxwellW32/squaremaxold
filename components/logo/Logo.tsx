import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} style={{ overflow: "hidden", width: "clamp(50px, 10vw, 100px)", cursor: "pointer" }}>
            <Image alt='logo' src={require(`@/public/sqm logo.svg`).default.src} width={100} height={100} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
        </Link>)
}
