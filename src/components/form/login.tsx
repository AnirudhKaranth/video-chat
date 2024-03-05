"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"// relative file path manga
import {signIn, signOut} from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { FormError } from "../ui/form-error"
import { FormSuccess } from "../ui/form-success"
import {SessionType} from '../../app/page'


const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string()
})


export function SignInForm({ session }: { session: SessionType | null }) {
  const [errorMsg,setErrorMsg] = useState <string | undefined>("");
  const [successMsg,setSuccessMsg] = useState <string | undefined>("");

  const router=useRouter()
  
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>)=> {
    
   
    const userdata = await signIn("credentials",{
      redirect: false,
      email: values.email,
      password: values.password,
      
    })
    if(!userdata?.ok){
      setSuccessMsg("")
      setErrorMsg("Invalid credentials")

    }else{
      setErrorMsg("")
      setSuccessMsg("Login successful")
      router.push('/')
    }
  }

  return (
    <div className="flex flex-col border-2 border-gray-50 bg-white rounded-md p-7 shadow-sm ">
    <div className="w-full flex items-center justify-center ">
            <p className="text-2xl">Login</p>
        </div>
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-60 h-72 flex flex-col items-center justify-center gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                <Input 
                placeholder="email" 
                {...field} 
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                <Input 
                type="password"
                placeholder="Password" 
                {...field} 
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
          />
          <FormError message={errorMsg}/>
          <FormSuccess message={successMsg}/>
        <Button type="submit" className="mt-2">Submit</Button>
      </form>
    </Form>
    <div className="mt-4 w-full flex items-center justify-center">
        <button type="button" className="text-sm text-gray-500 hover:text-gray-600" onClick={async ()=> router.push("/auth/signup")}>Don't have an account? signUp</button>

    </div>
          </div>
  )
}
