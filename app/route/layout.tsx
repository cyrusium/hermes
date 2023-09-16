import '@globalcss'
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], preload: true, weight: ["400", "500", "600"] })
const montserrat = Montserrat({ subsets: ['latin'], preload: true, weight: ["900"] })

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  )
}