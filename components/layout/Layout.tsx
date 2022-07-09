import Link from 'next/link'
import React, { FC } from 'react'

interface LayoutProps {
  categories?: Category[]
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children, categories, left, right }) => {
  return (
    <div>
      <nav className="flex items-center h-14 sticky top-0 z-50 bg-black text-white mb-3 ">
        <div className="flex flex-1 max-w-7xl m-auto px-3 justify-between items-center">
          <Link href="/">
            <span className="cursor-pointer">Logo</span>
          </Link>
          <div className="space-x-5">
            {categories?.map((category) => (
              <span className="uppercase cursor-pointer">{category.name}</span>
            ))}
          </div>
        </div>
      </nav>
      <div className="flex md:px-6">
        <div className="hidden 2xl:flex">{left}</div>
        <main className="p-3 max-w-2xl m-auto">{children}</main>
        <div className="hidden 2xl:flex">{right}</div>
      </div>
    </div>
  )
}

export default Layout
