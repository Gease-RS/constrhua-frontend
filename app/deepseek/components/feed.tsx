import { Post } from "./post"

const posts = [
  {
    id: 1,
    author: {
      name: 'Carlos Silva - Eng. Civil',
      avatar: '/avatars/eng-carlos.jpg',
      specialty: 'Engenheiro Civil Sênior'
    },
    content: 'Compartilhando um método inovador para cálculo de carga estrutural que reduziu em 15% o tempo dos meus projetos. Alguém mais já testou algo similar?',
    media: '/posts/structural-calculation.jpg',
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: '2 horas atrás',
    tags: ['engenharia', 'cálculo estrutural', 'inovação']
  },
  {
    id: 2,
    author: {
      name: 'Maria Santos - Arquiteta',
      avatar: '/avatars/arq-maria.jpg',
      specialty: 'Arquiteta Residencial'
    },
    content: 'Projeto finalizado! Casa contemporânea com foco em sustentabilidade. Utilizamos tijolo ecológico e sistema de reaproveitamento de água.',
    media: '/posts/modern-house.jpg',
    likes: 45,
    comments: 12,
    shares: 7,
    timestamp: '5 horas atrás',
    tags: ['arquitetura', 'sustentabilidade', 'projeto finalizado']
  },
  {
    id: 3,
    author: {
      name: 'João Oliveira - Mestre de Obras',
      avatar: '/avatars/mestre-joao.jpg',
      specialty: 'Mestre de Obras'
    },
    content: 'Dica do dia: Para assentar cerâmica grande, use argamassa colante e verifique o empenamento antes da aplicação. Evita dor de cabeça depois!',
    likes: 32,
    comments: 5,
    shares: 4,
    timestamp: '1 dia atrás',
    tags: ['dicas', 'cerâmica', 'acabamento']
  },
  {
    id: 4,
    author: {
      name: 'Ana Costa - Gesseira',
      avatar: '/avatars/gesseira-ana.jpg',
      specialty: 'Especialista em Drywall'
    },
    content: 'Trabalho recente em sanca de gesso com iluminação embutida. Dica: sempre deixe espaço para ventilação dos spots LED para evitar superaquecimento.',
    media: '/posts/gesso-work.jpg',
    likes: 28,
    comments: 6,
    shares: 2,
    timestamp: '3 horas atrás',
    tags: ['gesso', 'drywall', 'iluminação', 'dica']
  }
]

export function Feed() {
  return (
    <div className="space-y-6">
      {/* Card de Criar Post */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
            VO
          </div>
          <button className="flex-1 text-left p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
            Compartilhe uma dica, projeto ou dúvida...
          </button>
        </div>
        
        <div className="flex justify-between mt-4 px-4">
          {[
            { icon: '📷', label: 'Foto', color: 'text-green-600' },
            { icon: '🎥', label: 'Vídeo', color: 'text-blue-600' },
            { icon: '📊', label: 'Projeto', color: 'text-orange-600' },
            { icon: '❓', label: 'Dúvida', color: 'text-purple-600' }
          ].map((item, index) => (
            <button 
              key={index} 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-50"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Posts */}
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}