import type { ReactNode } from 'react'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/navbar'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  )
}
