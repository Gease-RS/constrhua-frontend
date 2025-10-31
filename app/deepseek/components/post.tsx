import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PostProps {
  post: {
    id: number
    author: {
      name: string
      avatar: string
      specialty: string
    }
    content: string
    media?: string
    likes: number
    comments: number
    shares: number
    timestamp: string
    tags: string[]
  }
}

export function Post({ post }: PostProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Cabeçalho do Post */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(post.author.name)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
              <p className="text-sm text-gray-500">
                {post.author.specialty} • {post.timestamp}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Salvar post</DropdownMenuItem>
              <DropdownMenuItem>Copiar link</DropdownMenuItem>
              <DropdownMenuItem>Denunciar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Conteúdo */}
        <div className="mt-3">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mídia */}
      {post.media && (
        <div className="border-t border-b border-gray-100">
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🏗️</span>
              </div>
              <p className="text-sm">Visualização do projeto</p>
              <p className="text-xs mt-1">Clique para expandir</p>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{post.likes} curtidas</span>
            <span>•</span>
            <span>{post.comments} comentários</span>
            <span>•</span>
            <span>{post.shares} compartilhamentos</span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="p-2">
        <div className="grid grid-cols-4 gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center space-x-2 h-9 hover:bg-gray-50"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Curtir</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center space-x-2 h-9 hover:bg-gray-50"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Comentar</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center space-x-2 h-9 hover:bg-gray-50"
          >
            <Share className="w-4 h-4" />
            <span className="text-sm font-medium">Compartilhar</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center space-x-2 h-9 hover:bg-gray-50"
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm font-medium">Salvar</span>
          </Button>
        </div>
      </div>

      {/* Área de comentário (opcional) */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Escreva um comentário..." 
              className="w-full bg-transparent border-none focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}