"use client"
import React, { useState } from 'react'
import styles from "./page.module.css"
import SpecificationsTextInput from '@/components/reusables/specificationsTextInput/SpecificationsInput'
import SpecificationsTextAreaInput from '@/components/reusables/specificationsTextAreaInput/SpecificationsTextAreaInput'
import { toast } from 'react-hot-toast'
import { sendNodeEmail } from '@/serverFunctions/handleNodeEmails'
import { clientSpecificationKeys, moreFormInfoType, pagesType, specificationsFormSchema, specificationsObjType } from '@/types'

//make object that stores info
//use specific ids for questions / presentations
//design a multi page interface - requred / optional questions
//send info to email 

//ensure required working zod

export default function Page() {
    const [initialSpecificationsObj, initialSpecificationsObjSet] = useState<specificationsObjType>({
        "aa": "",
        "ab": "",
        "ac": "",
        "ad": "",
        "ae": "",
        "af": "",
        "ag": "",
        "ah": "",
        "ai": "",
        "aj": "",
        "ak": "",
        "al": "",
        "am": "",
        "an": "",
        "ao": "",
        "ap": "",
        "aq": "",
        "ar": "",
        "as": "",
        "at": "",
        "au": ""
    })
    const [specificationsObj, specificationsObjSet] = useState<specificationsObjType>({ ...initialSpecificationsObj })

    const [moreFormInfo,] = useState<moreFormInfoType>({
        "aa": {
            label: "What is your business/organization's name?",
            placeHolder: "Enter business name: ",
            required: true
        },
        "ab": {
            label: "Can you describe your business and the products or services you offer?",
            placeHolder: "What are you interested in?: ",
            inputType: "textarea",
            required: true

        },
        "ac": {
            label: "Who is your target audience?",
            placeHolder: "Target: ",
            inputType: "textarea",
            required: true
        },
        "ad": {
            label: "What are your core goals for this website? (e.g., increase sales, raise awareness) ",
            placeHolder: "Goals: ",
            inputType: "textarea",
            required: true
        },
        "ae": {
            label: "What sets your business apart from competitors?",
            placeHolder: "Reason: ",
            inputType: "textarea"
        },
        "af": {
            label: "Do you already have a website? If so, what do you like or dislike about it?",
            placeHolder: "Likes: ",
            inputType: "textarea"
        },
        "ag": {
            label: "What is the main action you want visitors to take on your site? (e.g., make a purchase, sign up, contact you)",
            placeHolder: "Main Interaction?: ",
            inputType: "textarea",
            required: true
        },
        "ah": {
            label: "What features do you need? (e.g., e-commerce, booking system, blog, galleries, forms)",
            placeHolder: "Features: ",
            inputType: "textarea",
            required: true
        },
        "ai": {
            label: "Do you need integration with third-party services or software (e.g., payment gateways, CRM)?",
            placeHolder: "Integrations: ",
            inputType: "textarea"
        },
        "aj": {
            label: "Do you have branding guidelines (logo, colors, typography) to follow?",
            placeHolder: "Branding: ",
            inputType: "textarea",
            required: true
        },
        "ak": {
            label: "Are there websites you admire? What do you like about them?",
            placeHolder: "Provide Links if you like: ",
            inputType: "textarea"
        },
        "al": {
            label: "What look and feel are you aiming for? (e.g., professional, playful)",
            placeHolder: "Feel: ",
            inputType: "textarea",
            required: true
        },
        "am": {
            label: "Do you need a mobile-first or responsive design?",
            placeHolder: "Layout: ",
            inputType: "textarea"
        },
        "an": {
            label: "Will you provide the content (text, images, videos) or need assistance?",
            placeHolder: "Content provider: ",
            inputType: "textarea",
            required: true
        },
        "ao": {
            label: "How many pages will the site have?",
            placeHolder: "3 - 5 ",
            inputType: "textarea"
        },
        "ap": {
            label: "Do you need any custom forms (e.g., contact form, surveys)?",
            placeHolder: "Preference: ",
            inputType: "textarea"
        },
        "aq": {
            label: "Will there be user accounts / logins?",
            placeHolder: "Preference: ",
            inputType: "textarea"
        },
        "ar": {
            label: "What is your ideal launch date for the website?",
            placeHolder: "Date: ",
            inputType: "textarea",
            required: true
        },
        "as": {
            label: "Are there any deadlines the website must meet?",
            placeHolder: "Preference: ",
            inputType: "textarea"
        },
        "at": {
            label: "What is your budget range for this project?",
            placeHolder: "Budget?: ",
            required: true
        },
        "au": {
            label: "What is your Email?",
            placeHolder: "Please enter an email we can respond to: ",
            required: true
        }
    })

    const [formErrors, formErrorsSet] = useState<Partial<{
        [key in clientSpecificationKeys]: string
    }>>({})

    const [currentPageIndex, currentPageIndexSet] = useState(0)
    const [pages,] = useState<pagesType>({
        0: {
            title: "Business Overview",
            questions: ["aa", "au", "ab", "ac", "ad", "ae"],
        },
        1: {
            title: "Project Scope & Goals",
            questions: ["af", "ag", "ah", "ai"],
        },
        2: {
            title: "Design Preferences",
            questions: ["aj", "ak", "al", "am"],
        },
        3: {
            title: "Content & Functionality",
            questions: ["an", "ao", "ap", "aq"],
        },
        4: {
            title: "Timeline & Budget",
            questions: ["ar", "as", "at"],
        }
    })

    function checkIfValid(seenFormObj: specificationsObjType, seenName: keyof specificationsObjType, schema: any) {
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

    function returnInput(id: clientSpecificationKeys) {
        //inputs
        if (moreFormInfo[id].inputType === undefined || moreFormInfo[id].inputType === "input") {
            return (
                <SpecificationsTextInput
                    name={id}
                    value={`${specificationsObj[id]}`}
                    type={moreFormInfo[id].type}
                    label={moreFormInfo[id].label}
                    placeHolder={moreFormInfo[id].placeHolder}
                    onChange={(e) => {
                        specificationsObjSet(prevSpecifications => {
                            const newSpecifications = { ...prevSpecifications }
                            if (moreFormInfo[id].type === undefined || moreFormInfo[id].type === "text") {
                                //@ts-ignore
                                newSpecifications[id] = e.target.value

                            } else if (moreFormInfo[id].type === "number") {
                                //@ts-ignore
                                const parsedNum = parseFloat(e.target.value)

                                //@ts-ignore
                                newSpecifications[id] = isNaN(parsedNum) ? 0 : parsedNum
                            }

                            return newSpecifications
                        })
                    }}
                    onBlur={() => { checkIfValid(specificationsObj, id, specificationsFormSchema) }}
                    errors={formErrors[id]}
                />
            )
        } else if (moreFormInfo[id].inputType === "textarea") {
            return (
                <SpecificationsTextAreaInput
                    name={id}
                    value={`${specificationsObj[id]}`}
                    label={moreFormInfo[id].label}
                    placeHolder={moreFormInfo[id].placeHolder}
                    onInput={(e) => {
                        specificationsObjSet(prevSpecifications => {
                            const newSpecifications = { ...prevSpecifications }
                            if (moreFormInfo[id].type === undefined || moreFormInfo[id].type === "text") {
                                //@ts-ignore
                                newSpecifications[id] = e.target.value

                            } else if (moreFormInfo[id].type === "number") {
                                //@ts-ignore
                                const parsedNum = parseFloat(e.target.value)

                                //@ts-ignore
                                newSpecifications[id] = isNaN(parsedNum) ? 0 : parsedNum
                            }

                            return newSpecifications
                        })
                    }}
                    onBlur={() => { checkIfValid(specificationsObj, id, specificationsFormSchema) }}
                    errors={formErrors[id]}
                />
            )
        }
    }

    async function handleSubmit(readyToSubmit?: boolean) {
        if (readyToSubmit === undefined || readyToSubmit === false) return

        try {
            if (!specificationsFormSchema.safeParse(specificationsObj).success) return toast.error("Form not valid")

            await sendNodeEmail({
                sendTo: "squaremaxtech@gmail.com",
                replyTo: specificationsObj["au"],
                subject: `Customer Specifications for ${specificationsObj["aa"]}`,
                specificationsObj: specificationsObj,
                moreFormInfo: moreFormInfo,
                pages: pages,
            })

            toast.success("Sent!")
            // specificationsObjSet({ ...initialSpecificationsObj })

        } catch (error) {
            toast.error("Couldn't send")
            console.log(`$seomething else happened`, error);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.formCont}>
                {/* form navigation buttons */}
                <div style={{ borderBottom: "1px solid #000", borderLeft: "1px solid #000", display: "flex", width: "min-content", justifySelf: "center" }}>
                    {Object.entries(pages).map(([key, value], pageButtonIndex) => {
                        return (
                            <button key={key} className={styles.formPageButton} style={{ backgroundColor: pageButtonIndex === currentPageIndex ? "blue" : "", color: pageButtonIndex === currentPageIndex ? "#fff" : "" }}
                                onClick={() => {
                                    currentPageIndexSet(pageButtonIndex)
                                }}
                            >{pageButtonIndex + 1}</button>
                        )
                    })}
                </div>

                <form className={styles.form} action={(e) => { handleSubmit() }}>
                    {Object.entries(pages).map(([key, value], eachPageIndex) => {
                        const requiredQuestions: clientSpecificationKeys[] = []
                        const optionalQuestions: clientSpecificationKeys[] = []

                        value.questions.filter(eachId => {
                            if (moreFormInfo[eachId].required) {
                                requiredQuestions.push(eachId)
                            } else {
                                optionalQuestions.push(eachId)
                            }
                        })

                        return (
                            <div key={key} className={styles.formPage} style={{ display: eachPageIndex !== currentPageIndex ? "none" : "" }}>
                                {value.title !== undefined && (
                                    <h2>{value.title}</h2>
                                )}

                                {/* required inputs */}
                                {requiredQuestions.length > 0 && (
                                    <div className={`${styles.formPage} ${styles.requiredInputsCont}`}>
                                        {requiredQuestions.map((eachId, eachIdIndex) => {
                                            return (
                                                <React.Fragment key={eachIdIndex}>{returnInput(eachId)}</React.Fragment>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* optional inputs */}
                                {optionalQuestions.map((eachId, eachIdIndex) => {
                                    return (
                                        <React.Fragment key={eachIdIndex}>{returnInput(eachId)}</React.Fragment>
                                    )
                                })}

                                {currentPageIndex === Object.entries(pages).length - 1 && (
                                    <button
                                        onClick={() => {
                                            handleSubmit(true)
                                        }}
                                    >Submit</button>
                                )}
                            </div>
                        )
                    })}
                </form>
            </div>
        </main>
    )
}
