import { 
  Home, 
  Users, 
  Building, 
  Hammer, 
  BookOpen, 
  Briefcase,
  Calendar,
  Video
} from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Feed Principal', active: true },
  { icon: Users, label: 'Minha Rede' },
  { icon: Building, label: 'Projetos em Andamento' },
  { icon: Hammer, label: 'Serviços Disponíveis' },
  { icon: BookOpen, label: 'Tutoriais e Dicas' },
  { icon: Briefcase, label: 'Oportunidades de Trabalho' },
  { icon: Calendar, label: 'Eventos do Setor' },
  { icon: Video, label: 'Videoaulas' },
]

export function Sidebar() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors ${
              item.active 
                ? 'bg-orange-50 text-orange-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Grupos Ativos */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 mb-4">Meus Grupos</h3>
        <div className="space-y-2">
          {[
            'Engenharia Civil Brasil',
            'Arquitetura e Construção',
            'Mestres de Obra Unidos',
            'Inovações na Construção'
          ].map((group, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 w-full p-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">{group}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}