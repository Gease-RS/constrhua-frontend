"use client"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false })
  )

  const banners = [
    {
      id: 1,
      title: "Plataforma Constrhua",
      description: "Em breve você poderá acompanhar a evolução da sua construção pela nossa plataforma.",
      image: "/banner/constrhua1.jpg",
      link: "/#about"
    },
    {
      id: 2,
      title: "Produtos Premium",
      description: "Estamos construindo parcerias com fornecedores de produtos de premium para sua construção.",
      image: "/banner/constrhua2.jpg",
      link: "/#products"
    },
    {
      id: 3,
      title: "Fotografia Aérea",
      description: "Registre a evolução da sua construção com imagens de Drone.",
      image: "/banner/constrhua4.jpeg",
      link: "#"
    }
  ]

  return (
    <div className="w-full bg-gray-100">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="text-white absolute inset-0 bg-black/30 flex items-center justify-center p-4"> {/* Removido flex-col e items-center */}
                  <div className="flex flex-col items-start text-left max-w-2xl w-full"> {/* Adicionado um novo div para o bloco de texto */}
                    <h2 className="bg-logo-primary py-2 px-4 text-2xl md:text-4xl font-bold mb-2 rounded-md">
                      {banner.title}
                    </h2>
                    <p className="bg-logo-secondary py-2 px-4 text-lg md:text-xl mb-4 rounded-md">
                      {banner.description}
                    </p>
                    <Button asChild variant="outline" className="border-white text-logo-primary">
                      <Link href={banner.link}>Saiba Mais</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </div>
  )
}