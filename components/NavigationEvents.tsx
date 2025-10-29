'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'

export default function NavigationEvents() {
  useEffect(() => {
    // Link tıklamalarını dinle
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')
      
      // Eğer internal link ise ve yeni sekmede açılmıyorsa
      if (href && href.startsWith('/') && !event.ctrlKey && !event.metaKey) {
        NProgress.start()
      }
    }

    // Tüm linkleri dinle
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      link.addEventListener('click', handleAnchorClick as EventListener)
    })

    // Browser back/forward butonları için
    const handlePopState = () => {
      NProgress.start()
      setTimeout(() => NProgress.done(), 500)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleAnchorClick as EventListener)
      })
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}
