"use client"

import { Home, Users, Briefcase, Bell, MessageSquare, Search, Plus, ThumbsUp, MessageCircle, Share2, Bookmark, MoreHorizontal, Building2, HardHat, Hammer, Wrench } from 'lucide-react';
import { useState } from 'react';

export default function ConstructionSocialNetwork() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'João Silva',
      role: 'Engenheiro Civil',
      avatar: '👷',
      time: '2h',
      content: 'Finalizamos mais uma fundação! Projeto residencial de 250m² em Porto Alegre. Equipe impecável! 🏗️',
      image: true,
      likes: 45,
      comments: 12,
      shares: 3
    },
    {
      id: 2,
      author: 'Maria Santos',
      role: 'Arquiteta',
      avatar: '📐',
      time: '4h',
      content: 'Novo projeto aprovado! Casa moderna com 3 suítes e área gourmet. Alguém tem indicação de bom pedreiro na zona sul?',
      image: false,
      likes: 67,
      comments: 28,
      shares: 5
    },
    {
      id: 3,
      author: 'Pedro Oliveira',
      role: 'Mestre de Obras',
      avatar: '🔨',
      time: '6h',
      content: 'Dica do dia: sempre verifique o nivelamento antes de iniciar a alvenaria. Parece básico, mas evita muita dor de cabeça!',
      image: false,
      likes: 123,
      comments: 34,
      shares: 18
    },
    {
      id: 4,
      author: 'Ana Costa',
      role: 'Proprietária',
      avatar: '🏠',
      time: '1d',
      content: 'Construindo meu sonho! Depois de 2 anos economizando, finalmente começamos. Agradecimento especial ao engenheiro Carlos e sua equipe.',
      image: true,
      likes: 89,
      comments: 45,
      shares: 7
    }
  ]);

  const suggestions = [
    { name: 'Carlos Mendes', role: 'Carpinteiro', avatar: '🪚', mutual: 5 },
    { name: 'Luciana Ferreira', role: 'Gesseira', avatar: '🎨', mutual: 3 },
    { name: 'Roberto Lima', role: 'Eletricista', avatar: '⚡', mutual: 8 }
  ];

  const groups = [
    { name: 'Construtores RS', members: '2.5k', icon: '🏗️' },
    { name: 'Arquitetura Moderna', members: '1.8k', icon: '📐' },
    { name: 'Mestres de Obra BR', members: '3.2k', icon: '👷' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-orange-600" />
                <span className="text-xl font-bold text-orange-600">ConstruNet</span>
              </div>
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Buscar profissionais, projetos..." 
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
            </div>
            
            <nav className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Home className="w-6 h-6 text-orange-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-gray-600" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto pt-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 sticky top-20">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">👷</div>
                <h3 className="font-semibold">José da Silva</h3>
                <p className="text-sm text-gray-500">Construtor</p>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conexões</span>
                  <span className="font-semibold text-orange-600">328</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projetos</span>
                  <span className="font-semibold text-orange-600">45</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t space-y-2">
                <button className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 w-full p-2 rounded">
                  <HardHat className="w-4 h-4" />
                  <span>Meus Grupos</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 w-full p-2 rounded">
                  <Bookmark className="w-4 h-4" />
                  <span>Salvos</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">👷</div>
                <input 
                  type="text" 
                  placeholder="Compartilhe uma novidade, dica ou projeto..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
                />
              </div>
              <div className="flex items-center justify-around mt-3 pt-3 border-t">
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-xl">📷</span>
                  <span className="text-sm font-medium">Foto</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <HardHat className="w-5 h-5" />
                  <span className="text-sm font-medium">Projeto</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-xl">💡</span>
                  <span className="text-sm font-medium">Dica</span>
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow mb-4">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{post.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{post.author}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{post.role}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:bg-gray-100 p-2 rounded-full">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="mt-3 text-gray-800">{post.content}</p>
                  
                  {post.image && (
                    <div className="mt-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg h-64 flex items-center justify-center">
                      <Building2 className="w-24 h-24 text-orange-400 opacity-50" />
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-b">
                  <span>{post.likes} curtidas</span>
                  <div className="flex space-x-3">
                    <span>{post.comments} comentários</span>
                    <span>{post.shares} compartilhamentos</span>
                  </div>
                </div>

                <div className="flex items-center justify-around p-2">
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg flex-1 justify-center">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-medium">Curtir</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg flex-1 justify-center">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Comentar</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg flex-1 justify-center">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">Compartilhar</span>
                  </button>
                </div>
              </div>
            ))}
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 mb-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Sugestões de Conexão</h3>
              </div>
              <div className="space-y-3">
                {suggestions.map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{person.avatar}</div>
                      <div>
                        <p className="text-sm font-medium">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.role}</p>
                        <p className="text-xs text-gray-400">{person.mutual} em comum</p>
                      </div>
                    </div>
                    <button className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-700">
                      Conectar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Grupos Recomendados</h3>
              <div className="space-y-3">
                {groups.map((group, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="text-2xl">{group.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.members} membros</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}