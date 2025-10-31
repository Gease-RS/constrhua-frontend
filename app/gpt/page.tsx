"use client"

import React, { useState } from 'react';

// Next.js 15 + shadcn-style single-file page component
// Mobile-first responsive social feed for construction professionals
// - Uses Tailwind utility classes (assumes Tailwind + shadcn are configured)
// - Uses shadcn components style imports (Card, Button, Input, Avatar, etc.)
// - This is a UI/placeholder page that you can wire to your GraphQL/Apollo or REST API

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, ChevronDown, Heart, MessageSquare, Share2, Filter } from 'lucide-react';

// Mock data types
type Role = 'Owner' | 'Builder' | 'Engineer' | 'Architect' | 'Master' | 'Carpenter' | 'Mason' | 'Plasterer';

type Post = {
  id: string;
  author: { name: string; role: Role; avatar?: string };
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: number;
};

const samplePosts: Post[] = [
  {
    id: 'p1',
    author: { name: 'João Silva', role: 'Builder', avatar: '' },
    content: 'Instalando vigas metálicas hoje. Alguém que já fez revisão de ancoragens recomendaria checar quais itens primeiro?',
    images: [],
    createdAt: '2025-10-25T09:30:00Z',
    likes: 12,
    comments: 4,
  },
  {
    id: 'p2',
    author: { name: 'Arq. Marina', role: 'Architect', avatar: '' },
    content: 'Compartilhei um detalhe construtivo para a interface entre laje e forro — curioso para saber opiniões sobre acabamento final.',
    images: [],
    createdAt: '2025-10-24T14:00:00Z',
    likes: 5,
    comments: 2,
  },
];

export default function ConstrhuaSocialPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [composerOpen, setComposerOpen] = useState(false);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [filterRole, setFilterRole] = useState<Role | 'All'>('All');
  const [selectedTab, setSelectedTab] = useState('feed');

  // Mobile-first layout: single column on small screens, two/three columns on md/lg
  const filteredPosts = posts.filter((p) => {
    if (filterRole === 'All') return true;
    return p.author.role === filterRole;
  }).filter((p) => {
    if (!query) return true;
    return p.content.toLowerCase().includes(query.toLowerCase()) || p.author.name.toLowerCase().includes(query.toLowerCase());
  });

  function createPost() {
    if (!text.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: { name: 'Você', role: 'Builder', avatar: '' },
      content: text,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setText('');
    setComposerOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top nav: compact for mobile */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-b-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-100 md:hidden">
            <Filter className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-md bg-indigo-600 text-white font-semibold">C</div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold">Constrhua</h1>
              <p className="text-xs text-muted-foreground">Rede profissional da construção</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="hidden sm:flex items-center gap-2 border rounded-md px-2 py-1">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                aria-label="Pesquisar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="appearance-none outline-none w-40 text-sm bg-transparent"
                placeholder="Buscar por posts ou profissionais"
              />
            </div>
            <Avatar>
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Page content container */}
      <main className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column (on mobile this goes above or hidden) */}
        <aside className="md:col-span-1 hidden md:block">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold">Olá, Gease</h3>
                  <p className="text-xs text-muted-foreground">Construtor · São Paulo</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button variant="ghost">Meu Perfil</Button>
                <Button variant="ghost">Minhas Obras</Button>
                <Button variant="ghost">Favoritos</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold">Filtro por função</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="w-full rounded-md border px-2 py-1 text-sm"
              >
                <option value="All">Todos</option>
                <option>Owner</option>
                <option>Builder</option>
                <option>Engineer</option>
                <option>Architect</option>
                <option>Master</option>
                <option>Carpenter</option>
                <option>Mason</option>
                <option>Plasterer</option>
              </select>
              <Separator />
              <div className="text-xs text-muted-foreground">Dica: filtre por função para buscar conteúdos técnicos ou ofertas de serviços.</div>
            </CardContent>
          </Card>
        </aside>

        {/* Center feed column (mobile-first single column) */}
        <section className="md:col-span-2">
          {/* Tabs (mobile) */}
          <div className="mb-3">
            <Tabs defaultValue="feed" onValueChange={(v) => setSelectedTab(v)}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="jobs">Vagas</TabsTrigger>
                <TabsTrigger value="market">Marketplace</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Composer */}
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>V</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Compartilhe um progresso, dúvida ou pedido de ajuda..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="resize-none h-20"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setComposerOpen((s) => !s)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Anexar
                      </Button>
                    </div>
                    <div>
                      <Button onClick={createPost} size="sm">Publicar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Feed list */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white border rounded-md p-3 shadow-sm">
                <header className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{post.author.name}</div>
                        <div className="text-xs text-muted-foreground">{post.author.role} • {new Date(post.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">•••</div>
                    </div>
                    <p className="mt-2 text-sm">{post.content}</p>
                  </div>
                </header>

                {post.images && post.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {post.images.map((src, i) => (
                      <img key={i} src={src} alt={`post-${i}`} className="w-full h-40 object-cover rounded-md" />
                    ))}
                  </div>
                )}

                <footer className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 hover:text-red-600">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-600">
                      <Share2 className="w-4 h-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </footer>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent>
                  <div className="text-center text-sm text-muted-foreground">Nenhum post encontrado — tente outro filtro ou crie o primeiro post.</div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Right column (desktop extras) */}
        <aside className="hidden lg:block lg:col-span-1">
          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-sm font-semibold">Atalhos</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="ghost">Publicar Vaga</Button>
              <Button variant="ghost">Ofertas de Serviço</Button>
              <Button variant="ghost">Eventos & Cursos</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold">Quem seguir</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">Arq. Marina</div>
                    <div className="text-xs text-muted-foreground">Architect</div>
                  </div>
                </div>
                <Button size="sm">Seguir</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">João Silva</div>
                    <div className="text-xs text-muted-foreground">Builder</div>
                  </div>
                </div>
                <Button size="sm">Seguir</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Mobile bottom bar actions */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,520px)] md:hidden">
        <div className="bg-white border rounded-full p-2 flex items-center justify-around shadow-md">
          <button className="flex flex-col items-center text-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg>
            <span>Feed</span>
          </button>
          <button className="flex flex-col items-center text-xs" onClick={() => setComposerOpen(true)}>
            <Plus className="w-6 h-6" />
            <span>Publicar</span>
          </button>
          <button className="flex flex-col items-center text-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" /></svg>
            <span>Vagas</span>
          </button>
        </div>
      </nav>

      {/* Composer modal for mobile (simple) */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setComposerOpen(false)} />
          <div className="w-full sm:max-w-md bg-white rounded-t-lg sm:rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar>
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="O que você quer compartilhar?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-28"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setComposerOpen(false)}>Cancelar</Button>
              <Button onClick={createPost}>Publicar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
