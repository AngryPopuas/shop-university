'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAccountFormSchema } from "@/schemas/user";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import z from 'zod'
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import { ProductSchema } from "@/schemas/product";


const CreateProductForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        getValues,
    } = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema)
    });

    const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
        setIsLoading(true)

        axios.post<{ message: string }>('http://localhost:3000/api/products', data)
            .then((res) => {
                toast({ title: res.data.message, description: `Статус код: ${res.status}` })
            })
            .catch((err: AxiosError<{ message: string }>) => {
                toast({ variant: "destructive", title: err.response?.data.message, description: `Статус код: ${err.response?.status}` })
            })
            .finally(() => setIsLoading(false))
    }
    console.log(errors)
    console.log(getValues('imagesUrl'))
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5 max-w-[500px] p-5 border border-input rounded-md">
                <h2>Создайте продукт</h2>
                <p>Укажите данные продукта...</p>
                <Input disabled={isLoading} {...register('title')} placeholder="Название товара" name="title" type="text" />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                <Input disabled={isLoading}{...register('description')} placeholder="Описание товара" name="description" type="text" />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                <Input disabled={isLoading}  {...register("price", { valueAsNumber: true, })} placeholder="Цена" name="price" type="text" />
                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        const imagesArray = getValues('imagesUrl')
                        setValue('imagesUrl', [...imagesArray || [], ...res.map(file => file.url)])
                    }}
                    onUploadError={(error: Error) => {
                        setError('imagesUrl', { message: 'Не удалось загрузить картинку' })
                    }}
                />
                {errors.imagesUrl && <span className="text-red-500">{errors.imagesUrl.message}</span>}
                <Button disabled={isLoading}>Создать</Button>
            </div>
        </form>
    )
}

export default CreateProductForm
