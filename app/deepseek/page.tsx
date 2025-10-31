'use client'

import { useState } from 'react'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
import { Feed } from './components/feed'
import { RightSidebar } from './components/right-sidebar'
import { CreatePostModal } from './components/create-post-modal'

export default function HomePage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onCreatePost={() => setIsCreatePostOpen(true)} />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar Esquerda */}
          <div className="col-span-3">
            <Sidebar />
          </div>
          
          {/* Feed Principal */}
          <div className="col-span-6">
            <Feed />
          </div>
          
          {/* Sidebar Direita */}
          <div className="col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>

      <CreatePostModal 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  )
}