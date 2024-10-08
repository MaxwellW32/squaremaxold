import * as React from 'react';
import Z from "zod"

export const userFormSchema = Z.object({
    name: Z.string().min(1),
    email: Z.string().email(),
    message: Z.string().min(1),
    company: Z.string(),

    primaryPurpose: Z.string(),
    websiteName: Z.string(),
    websiteTagline: Z.string(),
    siteContent: Z.string(),
    socialMediaLinks: Z.string(),

    targetAudience: Z.string(),
    keyFeatures: Z.string(),
    designPreference: Z.string(),//edit for fonts and colors
    thirdPartyIntegrations: Z.string(),
    hostingPreferences: Z.string(),
    desiredTimeline: Z.string(),
    budget: Z.string(),
    additionalComments: Z.string(),
})

export type userForm = Z.infer<typeof userFormSchema>

export const EmailTemplate = ({ seenForm }: { seenForm: userForm }) => (
    <div>
        <h1>{seenForm.name} has contacted you! - email: {seenForm.email}</h1>

        {seenForm.company && <h2>Company: {seenForm.company}</h2>}

        <p>Message: {seenForm.message}</p>


        {Object.entries(seenForm).map(([key, value]) => {
            return (
                <p key={key}>{key}: {value}</p>
            )
        })}
    </div>
);
