import { Skeleton } from "@/components/ui/skeleton"

const ProductListPreviewSkeleton = () => {
    return (
        <div className='grid grid-cols-4 gap-y-5 w-full'>
            {new Array(12).fill(0, 0, 12).map((item, index: number) => {
                return (
                    <div key={index} className='flex flex-col justify-between items-center rounded-md transition-all bg-transparent p-[5px] space-y-[10px] w-[270px]'>
                        <Skeleton className="w-[250px] h-[250px] rounded-md" />
                        <Skeleton className="w-[250px] h-[15px]" />
                        <Skeleton className="w-[250px] h-[15px]" />
                        <Skeleton className="w-[250px] h-[15px]" />
                    </div>
                )
            })}
        </div>
    )
}

export default ProductListPreviewSkeleton