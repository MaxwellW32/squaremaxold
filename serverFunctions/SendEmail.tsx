"use server"
import { EmailTemplate, userForm } from '@/components/EmailTemplate';
import { Resend } from 'resend';

export const sendEmail = async (seenForm: userForm) => {
    try {
        const resend = new Resend('re_aV1iEwhV_5Nx4riVLzm6z7up7J7DRJTub');

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "info@anthsolutions.com",
            subject: `new customer inquiry from - ${seenForm.name}`,
            react: <EmailTemplate seenForm={seenForm} />,
        });

        console.log(`$sending mail succesfully `);

        return true
    } catch (error) {
        console.log(`$error sending email`, error);
        return false
    }
}