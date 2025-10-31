import { useState } from 'react'
import { X, Image, FileText, Video, MapPin, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [audience, setAudience] = useState('public')

  const postTypes = [
    { icon: Image, label: 'Foto/Projeto', color: 'text-green-600' },
    { icon: Video, label: 'Vídeo/Obra', color: 'text-blue-600' },
    { icon: FileText, label: 'Documento', color: 'text-orange-600' },
    { icon: MapPin, label: 'Localização', color: 'text-red-600' },
  ]

  const audienceOptions = [
    { value: 'public', label: 'Público', icon: Globe },
    { value: 'connections', label: 'Conectados', icon: Users },
    { value: 'group', label: 'Grupo específico', icon: Users },
  ]

  const getAudienceLabel = (value: string) => {
    return audienceOptions.find(opt => opt.value === value)?.label || 'Público'
  }

  const getAudienceIcon = (value: string) => {
    const option = audienceOptions.find(opt => opt.value === value)
    return option ? <option.icon className="w-4 h-4" /> : <Globe className="w-4 h-4" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <DialogTitle className="text-lg font-semibold m-0">Criar Publicação</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {/* Perfil do usuário e seleção de audiência */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                VO
              </div>
              <div>
                <h4 className="font-semibold">Seu Nome</h4>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                      {getAudienceIcon(audience)}
                      <span>{getAudienceLabel(audience)}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {audienceOptions.map((option) => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setAudience(option.value)}
                        className="flex items-center space-x-2"
                      >
                        <option.icon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Área de texto */}
          <Textarea
            placeholder="Compartilhe suas experiências, projetos, dicas ou dúvidas com a comunidade da construção civil..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] border-none text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />

          {/* Tags sugeridas */}
          <div className="flex flex-wrap gap-2">
            {['#dica', '#projeto', '#duvida', '#obra', '#material'].map((tag) => (
              <button
                key={tag}
                onClick={() => setContent(prev => prev + ` ${tag}`)}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Tipos de postagem */}
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-3">Adicionar à publicação</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {postTypes.map((type, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <type.icon className={`w-6 h-6 ${type.color}`} />
                  <span className="text-sm text-center">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Botão de publicar */}
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            disabled={!content.trim()}
          >
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}