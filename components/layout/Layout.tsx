import React, { FC } from 'react'

interface LayoutProps {
  categories?: Category[]
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children, categories }) => {
  return (
    <div>
      <nav className="h-14 sticky top-0 z-50 flex items-center bg-black text-white mb-3 px-3 justify-between">
        <span>Logo</span>
        <div className="space-x-5">
          {categories?.map((category) => (
            <span className="uppercase cursor-pointer">{category.name}</span>
          ))}
        </div>
      </nav>
      <main className="p-3">{children}</main>
    </div>
  )
}

export default Layout
