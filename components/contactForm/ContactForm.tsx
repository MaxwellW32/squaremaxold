"use client"
import React, { useState, FormEvent } from 'react'
import styles from "./styles.module.css"
import { toast } from 'react-hot-toast'
import TextInput from '../reusables/textInput/TextInput'
import TextAreaInput from '../reusables/textAreaInput/TextAreaInput'
import ShowMore from '../showMore/ShowMore'
import { sendNodeEmail } from '@/serverFunctions/handleNodeEmails'
import { userForm, userFormSchema } from '@/types'

export default function ContactForm() {

    const initialForm: userForm = {
        name: "",
        email: "",
        company: "",
        message: "",
    }
    const [formObj, formObjSet] = useState<userForm>({ ...initialForm })

    type userFormKey = keyof userForm

    type moreFormInfo = Partial<{
        [key in userFormKey]: {
            label?: string,
            placeHolder?: string,
            type?: "input" | "textArea",
            required?: boolean
        }
    }>

    const [moreFormInfoObj,] = useState<moreFormInfo>({

    })

    const [formErrors, formErrorsSet] = useState<Partial<{
        [key in userFormKey]: string
    }>>({})

    function checkIfValid(seenFormObj: userForm, seenName: keyof userForm, schema: any) {
        const testSchema = schema.pick({ [seenName]: true }).safeParse(seenFormObj);

        if (testSchema.success) {//worked
            formErrorsSet(prevObj => {
                const newObj = { ...prevObj }
                delete newObj[seenName]

                return newObj
            })

        } else {
            formErrorsSet(prevObj => {
                const newObj = { ...prevObj }

                let errorMessage = ""

                JSON.parse(testSchema.error.message).forEach((eachErrorObj: any) => {
                    errorMessage += ` ${eachErrorObj.message}`
                })

                newObj[seenName] = errorMessage

                return newObj
            })
        }
    }

    const handleSubmit = async () => {
        try {
            if (!userFormSchema.safeParse(formObj).success) return toast.error("Form not valid")
            await sendNodeEmail({
                sendTo: "squaremaxtech@gmail.com",
                replyTo: formObj.email,
                subject: `Customer Contact from ${formObj.name}`,
                message: formObj.message
            })

            toast.success("Sent!")
            formObjSet({ ...initialForm })
        } catch (error) {
            toast.error("Couldn't send")
            console.log(`$seomething else happened`, error);
        }
    }

    return (
        <form action={handleSubmit} className={styles.formDiv} style={{ display: "grid", alignContent: "flex-start" }}>
            <div style={{ textAlign: "center", display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                <h1>Request Free Consultation</h1>

                <p>Get in touch and discover how we can help. We will be in touch with you as soon as possible.</p>
            </div>

            <div className={styles.formColCont} style={{ display: "grid", gap: "1rem" }}>
                <TextInput
                    name={"name"}
                    value={formObj.name}
                    placeHolder='Your Name'
                    onChange={e => {
                        formObjSet(prevObj => {
                            // @ts-ignore
                            prevObj.name = e.target.value

                            return { ...prevObj }
                        })
                    }}
                    onBlur={() => {
                        checkIfValid(formObj, "name", userFormSchema)
                    }}
                    errors={formErrors["name"]}
                />

                <TextInput
                    name='email'
                    value={formObj.email}
                    placeHolder='Your Email'
                    onChange={e => {
                        formObjSet(prevObj => {
                            // @ts-ignore
                            prevObj.email = e.target.value

                            return { ...prevObj }
                        })
                    }}
                    onBlur={() => {
                        checkIfValid(formObj, "email", userFormSchema)
                    }}
                    errors={formErrors["email"]}
                />

                <TextInput
                    name={"company"}
                    value={formObj.company ?? ""}
                    placeHolder={"Your Company Name"}
                    onChange={e => {
                        formObjSet(prevObj => {
                            // @ts-ignore
                            prevObj.company = e.target.value

                            return { ...prevObj }
                        })
                    }}
                    onBlur={() => { checkIfValid(formObj, "company", userFormSchema) }}
                    errors={formErrors["company"]}
                />

                <TextAreaInput
                    name={"message"}
                    value={formObj.message}
                    placeHolder={"Your Message"}
                    onInput={e => {
                        formObjSet(prevObj => {
                            // @ts-ignore
                            prevObj.message = e.target.value

                            return { ...prevObj }
                        })
                    }}
                    onBlur={() => { checkIfValid(formObj, "message", userFormSchema) }}
                    errors={formErrors["message"]}
                />
            </div>


            <button disabled={!userFormSchema.safeParse(formObj).success} type='submit' style={{ justifySelf: "flex-end", opacity: !userFormSchema.safeParse(formObj).success ? ".6" : "", backgroundColor: "var(--primaryColor)", padding: '1rem 2rem', borderRadius: ".2rem", marginTop: '1rem' }}>Send Message</button>
        </form>
    )
}
