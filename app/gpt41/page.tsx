"use client"

import React from 'react'
import { motion } from 'framer-motion'

// shadcn/ui components (assumed available in the project)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu, Plus, Search, Bell } from 'lucide-react'

// Mobile-first social feed page for construction stakeholders
// Next.js 15, Tailwind + shadcn, default export React component

// Mock data types
type User = {
  id: string
  name: string
  role: string
  avatar?: string
}

type Post = {
  id: string
  author: User
  text: string
  images?: string[]
  createdAt: string
  likes: number
  comments: number
}

const mockUsers: User[] = [
  { id: 'u1', name: 'Carlos Silva', role: 'Mestre de Obras', avatar: '' },
  { id: 'u2', name: 'Ana Pereira', role: 'Arquiteta', avatar: '' },
  { id: 'u3', name: 'João Operador', role: 'Operador', avatar: '' },
]

const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[0],
    text: 'Instalamos as fundações hoje. Solo ótimo — seguir com base de concreto amanhã.',
    createdAt: '2025-10-28T09:00:00Z',
    likes: 12,
    comments: 3,
  },
  {
    id: 'p2',
    author: mockUsers[1],
    text: 'Sugestão de layout para iluminação natural na sala de estar — aberto a feedback.',
    createdAt: '2025-10-27T15:34:00Z',
    likes: 34,
    comments: 8,
  },
]

// Utility for relative time (simple)
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return `${days}d`
}

export default function ConstrhuaSocialPage() {
  // state for composer
  const [text, setText] = React.useState('')
  const [feed, setFeed] = React.useState<Post[]>(mockPosts)

  function createPost() {
    if (!text.trim()) return
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: mockUsers[2],
      text: text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    }
    setFeed(prev => [newPost, ...prev])
    setText('')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar - mobile first */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-slate-100">
              <Menu size={18} />
            </button>
            <div className="text-lg font-semibold">Constrhua</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Input placeholder="Buscar profissionais, obras..." className="w-72" />
            </div>
            <button className="p-2 rounded-md hover:bg-slate-100">
              <Bell size={18} />
            </button>
            <Avatar>
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">G</div>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="pt-16 max-w-3xl mx-auto px-4 pb-20">
        {/* Composer card */}
        <Card className="mb-4">
          <CardContent>
            <div className="flex items-start gap-3">
              <div>
                <Avatar>
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm">G</div>
                </Avatar>
              </div>
              <div className="flex-1">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="O que está acontecendo na obra? Compartilhe uma atualização, dúvida ou foto."
                  className="w-full min-h-[56px] resize-none rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                />

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100">
                      <Plus size={14} /> Foto
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100">Anexar</button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100">Etiquetas</button>
                  </div>
                  <div>
                    <Button onClick={createPost} disabled={!text.trim()}>
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <section className="space-y-4">
          {feed.map(post => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div>
                      <Avatar>
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm">{post.author.name[0]}</div>
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{post.author.name}</div>
                          <div className="text-xs text-slate-500">{post.author.role} • {timeAgo(post.createdAt)}</div>
                        </div>

                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 rounded-md hover:bg-slate-100">
                                <Menu size={16} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Salvar</DropdownMenuItem>
                              <DropdownMenuItem>Denunciar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-slate-800 whitespace-pre-line">{post.text}</div>

                      {/* images placeholder */}
                      {post.images && post.images.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {post.images.map((src, i) => (
                            <img key={i} src={src} alt={`post-${i}`} className="rounded-md object-cover h-40 w-full" />
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <button className="px-2 py-1 rounded-md hover:bg-slate-100">Curtir • {post.likes}</button>
                          <button className="px-2 py-1 rounded-md hover:bg-slate-100">Comentar • {post.comments}</button>
                          <button className="px-2 py-1 rounded-md hover:bg-slate-100">Compartilhar</button>
                        </div>
                        <div className="text-xs">0 visualizações</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </section>
      </main>

      {/* Floating bottom bar for mobile actions */}
      <nav className="fixed bottom-4 left-0 right-0 z-50 px-4 sm:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <button className="flex-1 bg-white border border-slate-200 py-2 rounded-md shadow-sm flex items-center justify-center gap-2">
            <Search size={16} />
            Buscar obras
          </button>
          <button className="w-14 h-12 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-lg" aria-label="Criar">
            <Plus size={18} />
          </button>
        </div>
      </nav>

      {/* Desktop right column (hidden on small screens) */}
      <aside className="hidden sm:block fixed right-6 top-20 w-80">
        <div className="space-y-4">
          <Card>
            <CardContent>
              <div className="text-sm font-medium">Filtros rápidos</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100">Proprietários</button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100">Construtores</button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100">Engenharia</button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100">Arquitetura</button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100">Operadores</button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-sm font-medium">Sugestões</div>
              <div className="mt-3 space-y-3">
                {mockUsers.map(u => (
                  <div key={u.id} className="flex items-center gap-3">
                    <Avatar>
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">{u.name[0]}</div>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.role}</div>
                    </div>
                    <div className="ml-auto">
                      <Button size="sm">Seguir</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  )
}
