"use client"
import React, { useState, FormEvent } from 'react'
import styles from "./styles.module.css"
import { toast } from 'react-hot-toast'
import { sendEmail } from '@/serverFunctions/SendEmail'
import { userForm, userFormSchema } from '@/components/EmailTemplate'
import TextInput from '../reusables/textInput/TextInput'
import TextAreaInput from '../reusables/textAreaInput/TextAreaInput'
import ShowMore from '../showMore/ShowMore'

export default function ContactForm() {

    const initialForm: userForm = {
        name: "",
        email: "",
        company: "",
        message: "",

        websiteName: "",
        websiteTagline: "",
        siteContent: "",
        socialMediaLinks: "",

        primaryPurpose: "",
        targetAudience: "",
        keyFeatures: "",
        designPreference: "",
        thirdPartyIntegrations: "",
        hostingPreferences: "",
        desiredTimeline: "",
        budget: "",
        additionalComments: "",
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
        websiteName: {
            label: "What is your website name?"
        },
        websiteTagline: {
            label: "What is your website tagline?"
        },
        siteContent: {
            type: "textArea",
            placeHolder: "Please list out the pages you would like (home, services, contact, etc...) and any specific copy for each page. If you aren't sure, no worries we can discuss further."
        },
        primaryPurpose: {
            label: "What is the primary purpose of your website?"
        },
        targetAudience: {
            label: "Who is your target audience?"
        },
        keyFeatures: {
            label: "What key features would you like for your website?",
            type: "textArea"
        },
        designPreference: {
            label: "Do you have any specific design preferences or branding guidelines? (Fonts/Colors)",
            type: "textArea"
        },
        thirdPartyIntegrations: {
            label: "Are there any third-party integrations needed (e.g., CRM systems, payment gateways)?"
        },
        hostingPreferences: {
            label: "Do you have any specific requirements for hosting?"
        },
        desiredTimeline: {
            label: "What is your desired timeline for the project?"
        },
        budget: {
            label: "What is your budget for the website project?"
        },
        additionalComments: {
            label: "Do you have any additional comments or specific requirements for the website?",
            type: "textArea"
        },
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
            await sendEmail(formObj)

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

                <ShowMore label='Website Details' content={
                    <>
                        {Object.entries(formObj).map(eachEntry => {
                            const eachKey = eachEntry[0] as userFormKey

                            if (eachKey === "name" || eachKey === "email" || eachKey === "company" || eachKey === "message") {
                                return null
                            }

                            let label: string = `${eachKey.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, char => char.toUpperCase())}`; //name or intro
                            let placeHolder = `Please Enter ${eachKey.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, char => char.toUpperCase())}`;

                            let type: "input" | "textArea" = "input"
                            let required = false

                            const seenMoreInfo = moreFormInfoObj[eachKey]

                            if (seenMoreInfo !== undefined) {
                                if (seenMoreInfo.label !== undefined) {
                                    label = seenMoreInfo.label
                                }

                                if (seenMoreInfo.placeHolder !== undefined) {
                                    placeHolder = seenMoreInfo.placeHolder
                                }

                                if (seenMoreInfo.type !== undefined) {
                                    type = seenMoreInfo.type
                                }

                                if (seenMoreInfo.required !== undefined) {
                                    required = seenMoreInfo.required
                                }
                            }

                            return (
                                <React.Fragment key={eachKey}>
                                    {type === "input" && (
                                        <TextInput
                                            label={label === undefined ? undefined : `${label} ${!required && "(optional)"}`}
                                            name={eachKey}
                                            value={formObj[eachKey] ?? ""}
                                            placeHolder={placeHolder}
                                            onChange={e => {
                                                formObjSet(prevObj => {
                                                    // @ts-ignore
                                                    prevObj[eachKey] = e.target.value

                                                    return { ...prevObj }
                                                })
                                            }}
                                            onBlur={() => {
                                                checkIfValid(formObj, eachKey, userFormSchema)
                                            }}
                                            errors={formErrors[eachKey]}
                                        />
                                    )}

                                    {type === "textArea" && (
                                        <TextAreaInput
                                            label={label === undefined ? undefined : `${label} ${!required && "(optional)"}`}
                                            name={eachKey}
                                            value={formObj[eachKey] ?? ""}
                                            placeHolder={placeHolder}
                                            onInput={e => {
                                                formObjSet(prevObj => {
                                                    // @ts-ignore
                                                    prevObj[eachKey] = e.target.value

                                                    return { ...prevObj }
                                                })
                                            }}
                                            onBlur={() => { checkIfValid(formObj, eachKey, userFormSchema) }}
                                            errors={formErrors[eachKey]}
                                        />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </>
                    // <>
                    //     <TextInput
                    //         name={"primaryPurpose"}
                    //         value={formObj.primaryPurpose ?? ""}
                    //         label={"What is the primary purpose of your website? (optional)"}
                    //         placeHolder={"Primary Purpose"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.primaryPurpose = e.target.value
                    //                 if (prevObj.primaryPurpose === "") prevObj.primaryPurpose = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "primaryPurpose", userFormSchema) }}
                    //         errors={formErrors["primaryPurpose"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"websiteName"}
                    //         value={formObj.websiteName ?? ""}
                    //         label={"What is your website name?"}
                    //         placeHolder={"Website Name"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.websiteName = e.target.value
                    //                 if (prevObj.websiteName === "") prevObj.websiteName = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "websiteName", userFormSchema) }}
                    //         errors={formErrors["websiteName"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"websiteTagline"}
                    //         value={formObj.websiteTagline ?? ""}
                    //         label={"What is your website tagline? (optional)"}
                    //         placeHolder={"Website Tagline"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.websiteTagline = e.target.value
                    //                 if (prevObj.websiteTagline === "") prevObj.websiteTagline = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "websiteTagline", userFormSchema) }}
                    //         errors={formErrors["websiteTagline"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"targetAudience"}
                    //         value={formObj.targetAudience ?? ""}
                    //         label={"Who is your target audience? (optional)"}
                    //         placeHolder={"Target Audience"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.targetAudience = e.target.value
                    //                 if (prevObj.targetAudience === "") prevObj.targetAudience = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "targetAudience", userFormSchema) }}
                    //         errors={formErrors["targetAudience"] ?? undefined}
                    //     />

                    //     <TextAreaInput
                    //         name={"siteContent"}
                    //         value={formObj.siteContent ?? ""}
                    //         label={"Site Content? (optional)"}
                    //         placeHolder={"Please list out the pages you would like: home, services, contact, etc...) and any specific copy for each page. If you aren't sure, no worries we can discuss further."}
                    //         onInput={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.siteContent = e.target.value
                    //                 if (prevObj.siteContent === "") prevObj.siteContent = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "siteContent", userFormSchema) }}
                    //         errors={formErrors["siteContent"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"socialMediaLinks"}
                    //         value={formObj.socialMediaLinks ?? ""}
                    //         label={"social Media Links (optional)"}
                    //         placeHolder={"Any social media links"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.socialMediaLinks = e.target.value
                    //                 if (prevObj.socialMediaLinks === "") prevObj.socialMediaLinks = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "socialMediaLinks", userFormSchema) }}
                    //         errors={formErrors["socialMediaLinks"] ?? undefined}
                    //     />

                    //     <TextAreaInput
                    //         name={"keyFeatures"}
                    //         value={formObj.keyFeatures ?? ""}
                    //         label={"What key features do you envision for your website? (optional)"}
                    //         placeHolder={"Key Features"}
                    //         onInput={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.keyFeatures = e.target.value
                    //                 if (prevObj.keyFeatures === "") prevObj.keyFeatures = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "keyFeatures", userFormSchema) }}
                    //         errors={formErrors["keyFeatures"] ?? undefined}
                    //     />

                    //     <TextAreaInput
                    //         name={"designPreference"}
                    //         value={formObj.designPreference ?? ""}
                    //         label={"Do you have any specific design preferences or branding guidelines? (Fonts/Colors) (optional)"}
                    //         placeHolder={"Design Preference"}
                    //         onInput={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.designPreference = e.target.value
                    //                 if (prevObj.designPreference === "") prevObj.designPreference = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "designPreference", userFormSchema) }}
                    //         errors={formErrors["designPreference"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"thirdPartyIntegrations"}
                    //         value={formObj.thirdPartyIntegrations ?? ""}
                    //         label={"Are there any third-party integrations needed (e.g., CRM systems, payment gateways)? (optional)"}
                    //         placeHolder={"Third Party Integrations - list if present"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.thirdPartyIntegrations = e.target.value
                    //                 if (prevObj.thirdPartyIntegrations === "") prevObj.thirdPartyIntegrations = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "thirdPartyIntegrations", userFormSchema) }}
                    //         errors={formErrors["thirdPartyIntegrations"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"hostingPreferences"}
                    //         value={formObj.hostingPreferences ?? ""}
                    //         label={"Do you have any specific requirements for hosting? (optional)"}
                    //         placeHolder={"Hosting Preferences"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.hostingPreferences = e.target.value
                    //                 if (prevObj.hostingPreferences === "") prevObj.hostingPreferences = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "hostingPreferences", userFormSchema) }}
                    //         errors={formErrors["hostingPreferences"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"desiredTimeline"}
                    //         value={formObj.desiredTimeline ?? ""}
                    //         label={"What is your desired timeline for the project? (optional)"}
                    //         placeHolder={"Desired Timeline"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.desiredTimeline = e.target.value
                    //                 if (prevObj.desiredTimeline === "") prevObj.desiredTimeline = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "desiredTimeline", userFormSchema) }}
                    //         errors={formErrors["desiredTimeline"] ?? undefined}
                    //     />

                    //     <TextInput
                    //         name={"budget"}
                    //         value={formObj.budget ?? ""}
                    //         label={"What is your budget for the website project? (optional)"}
                    //         placeHolder={"Budget"}
                    //         onChange={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.budget = e.target.value
                    //                 if (prevObj.budget === "") prevObj.budget = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "budget", userFormSchema) }}
                    //         errors={formErrors["budget"] ?? undefined}
                    //     />

                    //     <TextAreaInput
                    //         name={"additionalComments"}
                    //         value={formObj.additionalComments ?? ""}
                    //         label={"Do you have any additional comments or specific requirements for the website? (optional)"}
                    //         placeHolder={"Additional Comments"}
                    //         onInput={e => {
                    //             formObjSet(prevObj => {
                    //                 // @ts-ignore
                    //                 prevObj.additionalComments = e.target.value
                    //                 if (prevObj.additionalComments === "") prevObj.additionalComments = null

                    //                 return { ...prevObj }
                    //             })

                    //         }}
                    //         onBlur={() => { checkIfValid(formObj, "additionalComments", userFormSchema) }}
                    //         errors={formErrors["additionalComments"] ?? undefined}
                    //     />
                    // </>
                } />
            </div>


            <button disabled={!userFormSchema.safeParse(formObj).success} type='submit' style={{ justifySelf: "flex-end", opacity: !userFormSchema.safeParse(formObj).success ? ".6" : "", backgroundColor: "var(--primaryColor)", padding: '1rem 2rem', borderRadius: ".2rem", marginTop: '1rem' }}>Send Message</button>
        </form>
    )
}
