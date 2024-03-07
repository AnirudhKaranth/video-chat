"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input"; // relative file path manga
import { FcGoogle } from "react-icons/fc";
import { api } from "~/trpc/react";
import {toast} from 'sonner'
import { useRouter } from "next/navigation";
import Home, {SessionType} from '../../app/page'
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().min(2).max(50),
  password: z.string(),
});

export function SignUpForm({ session }: { session: SessionType | null }) {
  
  const [errorMsg,setErrorMsg] = useState <string | undefined>("");
  const [successMsg,setSuccessMsg] = useState <string | undefined>("");

  const router=useRouter()
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const signUP =  api.user.signup.useMutation({
    onError:(error)=>{
      console.log("first")
      setSuccessMsg("")
      setErrorMsg("Invalid credentials")
    },
    onSuccess:(data)=>{
      setErrorMsg("")
      setSuccessMsg("Sign up successful")
      router.push("/auth/login")
    }
  }) 

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    await signUP.mutateAsync({
      name:values.username, email:values.email, password:values.password
    }).catch((error)=>{
      console.log(error)
    })

    setErrorMsg("")
    setSuccessMsg("")

  }

  return (
    <div className="flex flex-col border-2 border-gray-100 bg-white rounded-md p-7 shadow-sm">
        <div className="w-full flex items-center justify-center mb-3">
            <p className="text-2xl">Sign Up</p>
        </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center gap-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormError message={errorMsg}/>
          <FormSuccess message={successMsg}/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    {/* <div className="mt-4 w-full flex items-center justify-center" >
    <FcGoogle fontSize={25}/>
    </div> */}
    <div className="mt-4 w-full flex items-center justify-center">
    <button type="button" className="text-sm text-gray-500 hover:text-gray-600" onClick={async ()=> router.push("/auth/login")}>Already have an account? Login</button>

    </div>
    </div>
  );
}
