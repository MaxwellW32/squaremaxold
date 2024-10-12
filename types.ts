import Z from "zod"

export const specificationsFormSchema = Z.object({
    "aa": Z.string().min(1, { message: "Business name is required." }),
    "ab": Z.string().min(1, { message: "A business description is required." }),
    "ac": Z.string().min(1, { message: "Target audience description is required." }),
    "ad": Z.string().min(1, { message: "Please specify your core goals for the website." }),
    "ae": Z.string(),
    "af": Z.string(),
    "ag": Z.string().min(1, { message: "The main action is required." }),
    "ah": Z.string().min(1, { message: "Please list the features you need for the website." }),
    "ai": Z.string(),
    "aj": Z.string().min(1, { message: "Branding guidelines check is required." }),
    "ak": Z.string(),
    "al": Z.string().min(1, { message: "Please describe the look and feel you're aiming for." }),
    "am": Z.string(),
    "an": Z.string().min(1, { message: "Please specify if you'll provide the content or need assistance." }),
    "ao": Z.string(),
    "ap": Z.string(),
    "aq": Z.string(),
    "ar": Z.string().min(1, { message: "Please provide an ideal launch date for the website." }),
    "as": Z.string(),
    "at": Z.string().min(1, { message: "Budget range is required." }),
    "au": Z.string().min(1, { message: "Email is required." })
});


export type specificationsObjType = Z.infer<typeof specificationsFormSchema>

export type clientSpecificationKeys = keyof specificationsObjType

export type moreFormInfoType = {
    [key in clientSpecificationKeys]: {
        label?: string,
        placeHolder?: string,
        type?: string,
        required?: boolean
        inputType?: "input" | "textarea"
    }
}

export type pagesType = {
    [key: number]: {
        title?: string,
        questions: clientSpecificationKeys[],
        extraInfo?: JSX.Element,
        hideQuestions?: boolean
    }
}




export const userFormSchema = Z.object({
    name: Z.string().min(1),
    email: Z.string().email(),
    message: Z.string().min(1),
    company: Z.string(),
})

export type userForm = Z.infer<typeof userFormSchema>