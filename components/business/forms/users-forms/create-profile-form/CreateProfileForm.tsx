'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAccountFormSchema } from "@/schemas/user";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from 'zod'
import axios, { AxiosError } from "axios";
import Link from "next/link";


const CreateProfileForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof CreateAccountFormSchema>>({
        resolver: zodResolver(CreateAccountFormSchema)
    });

    const onSubmit = async (data: z.infer<typeof CreateAccountFormSchema>) => {
        setIsLoading(true)
        axios.post<{ message: string }>('http://localhost:3000/api/register', { name: data.name, email: data.email, password: data.password })
            .then((res) => {
                toast({ title: res.data.message, description: `Статус код: ${res.status}` })
                setTimeout(() => { router.push('/home')}, 500)
            })
            .catch((err: AxiosError<{ message: string }>) => {
                toast({ variant: "destructive", title: err.response?.data.message, description: `Статус код: ${err.response?.status}` })
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5 max-w-[500px] p-5 border border-input rounded-md">
                <h2>Создайте аккаунт</h2>
                <p>Укажите ваши данные...</p>
                <Input disabled={isLoading} {...register('name')} placeholder="Имя" name="name" type="text" />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                <Input disabled={isLoading}{...register('email')} placeholder="Почта" name="email" type="email" />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <Input disabled={isLoading}{...register('password')} placeholder="Пароль" name="password" type="password" />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                <Button disabled={isLoading}>Создать</Button>
                <Link href={'login'} className="mx-auto"><span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Уже есть аккаунт?</span></Link>
            </div>
        </form>
    )
}

export default CreateProfileForm
