import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="relative h-96">
          <Image
            src="/nike-shoe.jpg"
            alt="Nike Air Jordan"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Tênis Nike Air Max Dn Masculino</h1>
          <p className="text-gray-400 mb-4 text-sm">
            Diga olá para a próxima geração da tecnologia Air. O Air Max Dn apresenta nosso sistema de unidade Dynamic Air de tubos de dupla pressão, criando uma sensação reativa a cada passo. Isso resulta em um design futurista que é confortável o suficiente para ser usado do dia à noite. Vá em frente – sinta o irreal.
          </p>
          <div className="flex justify-between items-center mb-6">
            <span className="text-3xl font-bold text-green-500">R$249.99</span>
            <div className="flex space-x-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Tamanho: 38</span>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">Cor: Preto</span>
            </div>
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Comprar agora com PIX</span>
          </button>
        </div>
      </div>
    </div>
  );
}
