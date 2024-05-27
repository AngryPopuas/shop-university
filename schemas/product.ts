import z from 'zod'


export const ProductSchema = z.object({
    title: z.string().min(1, 'Название обязательно').max(32, 'Название не может быть длинее 32 символов'),
    description: z.string().min(1, 'Описание обязательно').max(256, 'Описание не может быть длинее 256 символов'),
    price: z.number({message: 'Цена обязательна'}).min(0, 'Продукт не может иметь нулевую стоимость').max(1_000_000, "Продукт не может стоить больше 1 000 000 ₽"),
    imagesUrl: z.array(z.string(), {message: 'Картинка обязательна'})
})
