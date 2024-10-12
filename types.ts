import Z from "zod"

export const specificationsFormSchema = Z.object({
    "aa": Z.string().min(1),
    "ab": Z.string().min(1),
    "ac": Z.string().min(1),
    "ad": Z.string().min(1),
    "ae": Z.string(),
    "af": Z.string(),
    "ag": Z.string().min(1),
    "ah": Z.string().min(1),
    "ai": Z.string(),
    "aj": Z.string().min(1),
    "ak": Z.string(),
    "al": Z.string().min(1),
    "am": Z.string(),
    "an": Z.string().min(1),
    "ao": Z.string(),
    "ap": Z.string(),
    "aq": Z.string(),
    "ar": Z.string().min(1),
    "as": Z.string(),
    "at": Z.string().min(1),
    "au": Z.string().min(1)
})


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
    }
}