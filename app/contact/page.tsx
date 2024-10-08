import React from 'react'
import styles from "./page.module.css"
import ContactForm from '@/components/contactForm/ContactForm'

export default function Page() {
    return (
        <main>
            <section>
                <ContactForm />
            </section>
        </main>
    )
}
