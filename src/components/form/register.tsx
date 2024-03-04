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


const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().min(2).max(50),
  password: z.string(),
});

export function SignUpForm() {

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
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success("Successfully registered")
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

  }

  return (
    <div className="flex flex-col border-2 border-gray-100 rounded-md p-7">
        <div className="w-full flex items-center justify-center">
            <p>Sign Up</p>
        </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem>
              <FormLabel>UserName</FormLabel>
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
              <FormLabel>email</FormLabel>
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <div className="mt-4 w-full flex items-center justify-center" >
    <FcGoogle fontSize={25}/>
    </div>
    </div>
  );
}
