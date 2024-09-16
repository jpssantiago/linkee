import { Loader2 } from "lucide-react"

import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type LoadingButtonProps = ButtonProps & {
    isLoading: boolean
}

export function LoadingButton({ isLoading, ...rest }: LoadingButtonProps) {
    return (
        <Button {...rest} className={cn("flex items-center gap-2", rest.className)} disabled={isLoading || rest.disabled}>
            {isLoading && (
                <Loader2 className="transition-all animate-spin size-5" />
            )}

            {rest.children}
        </Button>
    )
}