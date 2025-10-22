import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "./common/react-query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Constrhua | Produtos para sua Construção",
  description: "Constrhua é uma plataforma que busca oferecer soluções para construções de casas, prédios, industrias... Estamos em busca de produtos de alta qualidade para oferecer a nossos clientes e em breve você poderá fazer o acompanhamento da sua construção.",
  openGraph: {
    title: 'Constrhua | Produtos e Soluções Completas para sua Construção',
    description: 'Encontre os melhores produtos para sua construção. Constrhua te ajuda a construir o futuro!',
    url: 'https://www.constrhua.com.br/',
    siteName: 'Constrhua',
    images: [
      {
        url: 'https://www.constrhua.com.br/share-constrhua.jpg',
        width: 1200,
        height: 630,
        alt: 'Constrhua',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.constrhua.com.br/share-constrhua.jpg'],
    title: 'Constrhua | Soluções Completas para Construção',
    description: 'Constrhua é uma plataforma que busca oferecer soluções para construções de casas, prédios, industrias... Estamos em busca de produtos de alta qualidade para oferecer a nossos clientes e em breve você poderá fazer o acompanhamento da sua construção.',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Envolva todo o conteúdo com o ReactQueryProvider */}
        <ReactQueryProvider>
          {/* Se estiver migrando, o ApolloWrapper poderia ficar aqui dentro também */}
          {/* <ApolloWrapper> */}
            <main className="flex-1">
              {children}
            </main>
          {/* </ApolloWrapper> */}
        </ReactQueryProvider>
      </body>
    </html>
  )
}