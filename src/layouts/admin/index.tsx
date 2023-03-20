import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAppContext } from 'contexts'
import { useEffect, useState } from 'react'
import Drawer from './drawer'
import AppBar from './appbar'
import useAuth from 'hooks/useAuth'
import { Loader } from 'components/core'
type Props = {
  title?: string
  children: JSX.Element
  className?: string
}
export default function AdminLayout({
  title = 'Welcome To Admin Panel',
  children = <></>,
  className = 'bg-gradient-to-r from-slate-50 via-stone-50 to-zinc-50',
}: Props) {
  const { user, isUserLoading } = useAuth()
  const { push } = useRouter()
  useEffect(() => {
    ;(() => {
      console.log(isUserLoading, user?._id, user?.role)
      if (isUserLoading) return
      if (!user?._id) return push('/login')
      if (!user?.role) return push('/login')
    })()
  }, [user, isUserLoading])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <main
        className={`min-h-screen ${className} ${
          isOpen
            ? 'ml-[calc(100vw-calc(100vw-260px))] w-[calc(100vw-260px)]'
            : 'ml-[calc(100vw-calc(100vw-72px))] w-[calc(100vw-72px)]'
        }`}
      >
        <AppBar />
        <Loader visible={isUserLoading || (!isUserLoading && !user?._id)} />
        {children}
      </main>
    </>
  )
}
