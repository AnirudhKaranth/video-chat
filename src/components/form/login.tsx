"use client"
import Image from 'next/image';
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
// import { toast } from "sonner"
import { useState } from "react"
import { FormError } from "../ui/form-error"
import { FormSuccess } from "../ui/form-success"
import  {SessionType} from '../../app/page'


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
    <div className="flex flex-col border-double border-4 border-gray-500 bg-gray-800 rounded-3xl p-7 shadow-sm z-10 bg-opacity-50 ">
      {/* <Image 
    src="/snapedit_1712040610628.png"
    width={100}
    height={100}
    className=" flex justify-center z-0"
    alt="Background Image"
  /> */}
    <div className="w-full flex items-center justify-center z-10">
            <p className="text-3xl text-white font-bold z-10">Login</p>
        </div>
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-60 h-72  flex flex-col items-center justify-center gap-2 z-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                <Input 
                placeholder="Email" 
                {...field}
                className="border border-gray-500 rounded-xl p-5" 
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
                className="border border-gray-500 rounded-xl p-5"
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
          />
          <FormError message={errorMsg}/>
          <FormSuccess message={successMsg}/>
        <Button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-700/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit</Button>
      </form>
    </Form>
    <div className="mt-4 w-full flex items-center justify-center z-10">
        <button type="button" className="text-base text-white hover:text-blue-300 z-10" onClick={async ()=> router.push("/auth/signup")}>Don't have an account? SignUp</button>

    </div>
  </div>
  )
}