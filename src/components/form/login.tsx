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

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string()
})


export function SignInForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  const router=useRouter()
  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>)=> {
    
    
    const userdata = await signIn("credentials",{
      redirect: false,
      email: values.email,
      password: values.password,
      
    })
    if(!userdata?.ok){
      toast("Try again")

    }else{
      router.push('/')
    }
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-48 h-72">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormLabel>email</FormLabel>
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
              <FormLabel>password</FormLabel>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <div>
        Hello
        <button type="button" onClick={async ()=> await signOut()}>logout</button>
    </div>
          </>
  )
}
