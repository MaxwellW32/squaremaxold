import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} style={{ overflow: "hidden", width: "clamp(100px, 15vw, 200px)", cursor: "pointer" }}>
            <Image alt='logo' src={require(`@/public/logo.png`).default.src} width={200} height={200} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
        </Link>)
}
