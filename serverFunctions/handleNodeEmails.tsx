"use server"
import Handlebars from "handlebars";
import fs from "fs/promises"
import path from "path"
import nodemailer from "nodemailer"
import { moreFormInfoType, pagesType, specificationsObjType } from "@/types";

require('dotenv').config()

const email = process.env.EMAIL
const pass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: pass,
    },
});

export async function sendNodeEmail(input: {
    sendTo: string,
    replyTo: string,
    subject: string,
    specificationsObj: specificationsObjType,
    moreFormInfo: moreFormInfoType,
    pages: pagesType,
}) {
    const basePath = process.cwd()
    const locationToTempaltes = path.join(basePath, "templates", "simple.html")
    const htmlSource = await fs.readFile(locationToTempaltes, { encoding: "utf-8" })
    const template = Handlebars.compile(htmlSource);

    const info = await transporter.sendMail({
        from: email,
        to: input.sendTo,
        subject: input.subject,
        text: `
            ${Object.entries(input.pages).map(([key, value]) => {
            return (
                `
                    ${value.title} \n

                    ${value.questions.map(eachQuestionId => {
                    return (
                        `
                            ${input.moreFormInfo[eachQuestionId].label}
                            ${input.specificationsObj[eachQuestionId]} \n\n
                        `
                    )
                })}\n
                `
            )
        })}
        `,
        // html: template({
        //     root: (
        //         `
        //         <div>
        //             ${Object.entries(input.pages).map(([key, value]) => {
        //             return (
        //                 `
        //                     <h1>${value.title}</h1>

        //                     ${value.questions.map(eachQuestionId => {
        //                     return (
        //                         `
        //                             <p>${input.moreFormInfo[eachQuestionId].label}</p>
        //                             <p>${input.specificationsObj[eachQuestionId]}</p>
        //                             <b>hi bold test</b>
        //                         `
        //                     )
        //                 })}

        //                     <br/><br/>
        //                     `
        //             )
        //         })}
        //         </div>
        //         `
        //     )
        // }),
        replyTo: input.replyTo
    });

    console.log("Message sent: %s", info.messageId);
}