export function RightSidebar() {
  return (
    <div className="space-y-4 sticky top-20">
      {/* Anúncios */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Patrocinados</h3>
        <div className="space-y-3">
          {[
            {
              title: 'Materiais de Construção - Até 30% OFF',
              desc: 'Tintas, cimento, ferragens',
              image: '/ads/material-construcao.jpg'
            },
            {
              title: 'Curso de Gestão de Obras',
              desc: 'Capacitação para mestres',
              image: '/ads/curso-gestao.jpg'
            }
          ].map((ad, index) => (
            <div key={index} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-sm text-gray-900">{ad.title}</h4>
                <p className="text-xs text-gray-500">{ad.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profissionais Sugeridos */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Profissionais Sugeridos</h3>
        <div className="space-y-3">
          {[
            { name: 'Ana Costa', specialty: 'Eng. Estrutural', projects: '12' },
            { name: 'Pedro Alves', specialty: 'Mestre de Obras', projects: '28' },
            { name: 'Luisa Mendes', specialty: 'Arquiteta', projects: '19' }
          ].map((pro, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-sm">{pro.name}</h4>
                  <p className="text-xs text-gray-500">{pro.specialty}</p>
                </div>
              </div>
              <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600">
                Conectar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Eventos Próximos */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Eventos do Setor</h3>
        <div className="space-y-2">
          {[
            { title: 'Feira da Construção 2024', date: '15 Mar', location: 'São Paulo' },
            { title: 'Workshop: Novas NRs', date: '22 Mar', location: 'Online' }
          ].map((event, index) => (
            <div key={index} className="p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center text-orange-600 font-semibold">
                  {event.date.split(' ')[0]}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}