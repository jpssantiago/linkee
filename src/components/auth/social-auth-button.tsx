import { ReactNode } from "react"

import { Button, ButtonProps } from "@/components/ui/button"

type SocialAuthButtonProps = ButtonProps & {
    children: ReactNode
}

export function SocialAuthButton({ children, ...rest }: SocialAuthButtonProps) {
    return (
        <Button {...rest} variant="secondary" className="flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 w-full text-black">
            {children}
        </Button>
    )
}