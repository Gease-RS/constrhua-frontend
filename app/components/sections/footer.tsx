"use client"

import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const links = [
        {
            title: "Empresa",
            items: [
                { name: "Sobre Nós", href: "/"},
                { name: "Nossos Projetos", href: "/" },
                { name: "Notícias", href: "/" },
                { name: "Contato", href: "/"}
            ]
        },
        {
            title: "Produtos",
            items: [
                { name: "Pisos e Revestimentos", href: "",},
                { name: "Esquadrias", href: "",},
                { name: "Energia Solar", href: "",},
                { name: "Tintas", href: "",}
            ]
        },
        {
            title: "Legal",
            items: [
                { name: "Termos de Serviço", href: "" },
                { name: "Política de Privacidade", href: "" },
                { name: "Cookies", href: "" }
            ]
        }
    ];

    return (
        <div className="relative bg-logo-secondary px-4 sm:px-10 lg:px-20">
            <div className="grid max-w-screen-xl grid-cols-1 gap-10 mx-auto pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7"> 
                <div className="lg:col-span-2 text-center lg:text-left">
                    <div className="inline-block">
                        <Link href="/" className="relative block w-44 mx-auto lg:mx-0">
                            <Image
                                src="/logo-constrhua-vertical-w.png"
                                alt="Constrhua Logo"
                                width={176}
                                height={60}
                            />
                        </Link>
                    </div>
                    <p className="mb-4 text-white">
                       Produtos para sua construção.
                    </p>
                </div>

                {links.map((section) => (
                    <div key={section.title} className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1"> {/* MUDANÇA AQUI */}
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.items.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-logo-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Coluna das Redes Sociais (ocupa 1 coluna em lg) */}
                <div className="text-center lg:text-left lg:col-span-2"> {/* MUDANÇA AQUI: lg:col-span-1 */}
                    <div className="text-white font-semibold text-lg mb-4">Redes Sociais</div>
                    <div className="flex justify-center lg:justify-start space-x-5 text-logo-primary text-gray-300">
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only hover:text-white">Instagram</span>
                            <span className=" transition-colors hover:text-white">
                                <Instagram />
                            </span>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only hover:text-white">Facebook</span>
                            <span className="transition-colors hover:text-white">
                                <Facebook />
                            </span>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only hover:text-white">Youtube</span>
                            <span className="transition-colors hover:text-white">
                                <YouTube />
                            </span>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only hover:text-white">Flickr</span>
                            <span className="transition-colors hover:text-white">
                                <Flickr />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Parte inferior do rodapé */}
            <div className="py-12 text-sm text-center text-gray-400 dark:text-gray-400">
                Copyright © {new Date().getFullYear()}. Todos os direitos reservados a{" "}
                <span className="text-logo-primary">Constrhua</span> ♥ | Desenvolvido
                por{" "}
                <Link
                    href="https://www.linkedin.com/in/gease/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-logo-primary hover:text-white"
                >
                    Gease Oliveira da Rosa
                </Link>
            </div>
        </div>
    );
}
// Seus componentes de ícone (Facebook, Instagram, YouTube, Flickr) permanecem os mesmos
const Facebook = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
    </svg>
);
const Instagram = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
    </svg>
);

const YouTube = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C18.9 3 12 3 12 3s-6.9 0-9.1.8c-1.2.3-2.1 1.2-2.4 2.4C0 8.4 0 12 0 12s0 3.6.5 5.8c.3 1.2 1.2 2.1 2.4 2.4C5.1 21 12 21 12 21s6.9 0 9.1-.8c1.2-.3 2.1-1.2 2.4-2.4.5-2.2.5-5.8.5-5.8s0-3.6-.5-5.8zM9.6 15.3V8.7L15.8 12l-6.2 3.3z" />
    </svg>
);

const Flickr = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M6.8 6.8c-3.8 0-6.8 3-6.8 6.8s3 6.8 6.8 6.8 6.8-3 6.8-6.8-3-6.8-6.8-6.8zm10.4 0c-3.8 0-6.8 3-6.8 6.8s3 6.8 6.8 6.8 6.8-3 6.8-6.8-3-6.8-6.8-6.8z" />
    </svg>
);