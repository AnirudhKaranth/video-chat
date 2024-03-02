import {v4 as uuid4} from 'uuid'
import { db } from '~/server/db'

export const generateVerificationToken= async(email: string)=>{
    const token = uuid4()
    const expires = new Date(new Date().getTime()+3600*1000)

    const existingToken = await db.verificationToken.findFirst({
        where:{
            email:email
        }
    })

    if(existingToken){
        await db.verificationToken.delete({
            where:{
                identifier:existingToken.identifier
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires

        }
    })

    return verificationToken
}