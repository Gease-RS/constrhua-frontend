import React from 'react'
import ProductsPage from './products'
import { Banner } from './components/banner'
import { Footer } from './components/sections/footer'
import Navbar from './components/sections/navbar'

export default function page() {
  return (
    <div>
      <Navbar />
        <Banner />
        <ProductsPage />
        <Footer />
    </div>
  )
}
