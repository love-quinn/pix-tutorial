import Image from "next/image";
import React from "react";

import Header from "./components/Header";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
                <div className="w-full max-w-md overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
                    <div className="relative h-96">
                        <Image
                            src="/nike-shoe.jpg"
                            alt="Nike Air Max Dn"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="p-6">
                        <h1 className="mb-2 text-2xl font-bold text-white">
                            Tênis Nike Air Max Dn Masculino
                        </h1>
                        <p className="mb-4 text-sm text-gray-400">
                            Diga olá para a próxima geração da tecnologia Air. O
                            Air Max Dn apresenta nosso sistema de unidade
                            Dynamic Air de tubos de dupla pressão, criando uma
                            sensação reativa a cada passo. Isso resulta em um
                            design futurista que é confortável o suficiente para
                            ser usado do dia à noite. Vá em frente – sinta o
                            irreal.
                        </p>
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-3xl font-bold text-green-500">
                                R$249.99
                            </span>
                            <div className="flex space-x-2">
                                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                                    Tamanho: 38
                                </span>
                                <span className="rounded-full bg-gray-600 px-3 py-1 text-sm text-white">
                                    Cor: Branco
                                </span>
                            </div>
                        </div>
                        <button className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-green-600 py-3 text-white transition-colors duration-300 hover:bg-green-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>Comprar agora com PIX</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
