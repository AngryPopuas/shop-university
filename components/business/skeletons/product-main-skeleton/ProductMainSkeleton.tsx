import { Skeleton } from "@/components/ui/skeleton"

const ProductMainSkeleton = () => {
    return (
        <div className="w-fill flex lg:flex-row flex-col justify-between lg:space-x-20 lg:items-stretch items-center lg:space-y-0 space-y-5">
            <div>
                <Skeleton className="w-[500px] h-[500px] rounded-md" />
            </div>
            <div className="flex flex-col rounded-md space-y-[35px] w-full">
                <Skeleton className="w-1/2 h-[25px] rounded-md" />
                <Skeleton className="w-1/2 h-[25px] rounded-md" />
                <Skeleton className="w-1/2 h-[25px] rounded-md" />
                <Skeleton className="w-full h-[44px] rounded-md" />
            </div>
        </div>
    )
}

export default ProductMainSkeleton