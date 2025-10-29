'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

function LoadingBarContent() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            trickleSpeed: 200,
            minimum: 0.08,
            easing: 'ease',
            speed: 500,
        })
    }, [])

    useEffect(() => {
        NProgress.done()
    }, [pathname, searchParams])

    return null
}

export default function PageLoadingBar() {
    return (
        <Suspense fallback={null}>
            <LoadingBarContent />
        </Suspense>
    )
}
