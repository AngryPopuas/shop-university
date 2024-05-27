import z from 'zod'


export const LogginAccountFormSchema = z.object({
    email: z.string().email('Почта указана не верно'),
    password: z.string()
        .min(8, 'Пароль должен быть длинее 8 символов')
        .max(32, 'Пароль не может быть длинее 32 символов')
})


export const CreateAccountFormSchema = z.object({
    name: z.string()
        .min(3, 'Имя должно быть длинее 3 символов')
        .max(16, 'Имя не может быть длинее 16 символов'),
    email: z.string().email('Почта указана не верно'),
    password: z.string()
        .min(8, 'Пароль должен быть длинее 8 символов')
        .max(32, 'Пароль не может быть длинее 32 символов')
});