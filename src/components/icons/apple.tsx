import Image from "next/image"

import apple from "@/assets/apple.png"

export function AppleIcon() {
    return (
        <Image
            src={apple}
            width={16}
            height={16}
            alt="Apple"
            className="-mt-0.5"
        />
    )
}