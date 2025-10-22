import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"


/**
  <CardFooter>
    <Button asChild className="w-full bg-logo-secondary hover-logo-primary">
      <Link href={`/products/${product.id}`}>Ver Detalhes</Link>
    </Button>
  </CardFooter>
 */

export default function ProductsPage() {
  const categories = [
    "Todos",
    "Pedras e Revestimentos",
    "Esquadrias",
    "Energia Solar",
    "Tintas e Acabamentos",
    "Iluminação",
    "Ferramentas"
  ]

  const products = [
    { id: 1, name: "Michelangelo Napoleon", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/michelangelo-napoleon.png" },
    { id: 2, name: "Michelangelo Argento", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/michelangelo-argento.png" },
    { id: 3, name: "Quartzo Kensho", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzo-kensho.png" },
    { id: 4, name: "Quartzito Da Vinci", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzito-da-vinci.png" },
    { id: 5, name: "Quartzito Dakar", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzito-dakar.png" },
    { id: 6, name: "Quartzito Kouros Escovado", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzito-kouros-escovado.png" },
    { id: 7, name: "Quartzito Krystallus", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzito-krystallus.png" },
    { id: 8, name: "Quartzito Noka", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzito-noka.png" },
    { id: 9, name: "Quartzo Branco", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzo-branco.png" },
    { id: 10, name: "Quartzo Diamond Sando", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzo-diamond-sand.png" },
    { id: 11, name: "Quartzo Marengo", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzo-marengo.png" },
    { id: 12, name: "Quartzo Ocher", category: "Pisos e Revestimentos", brand: "Piagran", image: "/products/quartzo-ocher.png" },
  ]

  return (
    <>
      <main className="py-8 mx-auto lg:mx-24 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Produtos Parceiros</h1>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input placeholder="Pesquisar produtos..." className="w-full md:w-64" />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Todas categorias" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-white shadow-md rounded-lg overflow-hidden"> {/* Exemplo de um CARD com fundo branco e sombra */}
                  <div className="relative h-48 w-full rounded-t-lg overflow-hidden"> {/* Container da imagem */}
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      // Este div de fallback TEM o background cinza, pois ele só aparece se a imagem não existir
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500">Imagem não disponível</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
                <p className="text-sm text-gray-500 mt-2">{product.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}