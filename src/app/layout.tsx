import { Profile } from '@/components/Profile'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import { ReactNode } from 'react'
import { Signin } from '@/components/Signin'
import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}>
      
       <main className="grid grid-cols-2 min-h-screen ">
          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-starts.svg)] bg-cover">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 rounded-full opacity-50 blur-full" />
            <div className="absolute bottom-0 right-2 top-0  w-2 bg-stripes  " />

            {isAuthenticated ? <Profile /> : <Signin />}

            <Hero />

            <Copyright />

          </div>

          <div className="flex max-h-screen overflow-y-scroll flex-col  bg-[url(../assets/bg-starts.svg)] bg-cover">
           {children}
          </div>
        </main>
       
      </body>
    </html>
  )
}
