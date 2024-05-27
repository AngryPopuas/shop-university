'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogginAccountFormSchema } from "@/schemas/user";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import z from 'zod'
import axios, { AxiosError } from "axios";
import Link from "next/link";


const LogginProfileForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof LogginAccountFormSchema>>({
        resolver: zodResolver(LogginAccountFormSchema)
    });

    const onSubmit = async (data: z.infer<typeof LogginAccountFormSchema>) => {
        setIsLoading(true)
        axios.post<{ message: string }>('http://localhost:3000/api/login', { email: data.email, password: data.password })
            .then((res) => {
                toast({ title: res.data.message, description: `Статус код: ${res.status}` })
            })
            .catch((err: AxiosError<{ message: string }>) => {
                toast({ variant: "destructive", title: err.response?.data.message, description: `Статус код: ${err.response?.status}` })
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5 max-w-[500px] p-5 border border-input rounded-md">
                <h2>Войдите в аккаунт</h2>
                <p>Укажите ваши данные...</p>
                <Input disabled={isLoading}{...register('email')} placeholder="Почта" name="email" type="email" />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <Input disabled={isLoading}{...register('password')} placeholder="Пароль" name="password" type="password" />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                <Button disabled={isLoading}>Создать</Button>
                <Link href={'register'} className="mx-auto"><span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Нет аккаунта?</span></Link>
            </div>
        </form>
    )
}

export default LogginProfileForm
