// components/Hero.tsx
import React from 'react';

const hero = ({ userName }: { userName: string }) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-4 p-4 flex">
      {/* Bagian kiri: Kata kata sambutan dan lanjutan */}
      <div className="flex-1">
        {/* Kata kata sambutan */}
        <div className="mt-16">
          <h2 className="text-6xl font-bold">
            Selamat Datang <span className="font-bold">{userName}</span>
          </h2>
          <h2 className="text-6xl font-bold mt-8 mb-8">
            Di Perpustakaan Digital
          </h2>
        </div>
        
        {/* Kata Kata Lanjutan */}
        <div className="mt-8">
          <h2 className="text-2xl tracking-wide leading-relaxed">
            Jelajahi koleksi buku, jurnal, dan literatur dari seluruh dunia.
          </h2>
          <h2 className="text-2xl tracking-wide leading-relaxed">
            Akses mudah kapan saja, di mana saja.
          </h2>
          <h2 className="text-2xl tracking-wide leading-relaxed">
            Temukan pengetahuan tanpa batas di ujung jari Anda.
          </h2>
        </div>
      </div>
      
      {/* Bagian kanan: Gambar besar */}
      <div className="flex-1 flex justify-center items-center">
        <img src="/hero_image.svg" alt="Gambar Perpustakaan" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default hero;
