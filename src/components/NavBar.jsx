import React, { useState } from 'react';
import { Home, Layers, PlaySquare, Download, Search } from 'lucide-react';

function NavBar() {
  const [activo, setActivo] = useState('Contenido'); // Para marcar cuál está seleccionado

  const NavItem = ({ icono: Icono, etiqueta }) => {
    const isActivo = activo === etiqueta;
    return (
      <button 
        onClick={() => setActivo(etiqueta)}
        className="flex flex-col items-center justify-center gap-1 w-16"
      >
        <div className={`p-2 rounded-full transition-all ${isActivo ? 'bg-slate-700/80 text-cyan-400' : 'text-slate-300 hover:text-white'}`}>
          <Icono size={isActivo ? 28 : 24} strokeWidth={isActivo ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-medium ${isActivo ? 'text-white' : 'text-slate-400'}`}>
          {etiqueta}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1a1c1e] border border-slate-700/50 rounded-full px-4 py-2 flex items-center gap-2 sm:gap-4 shadow-2xl backdrop-blur-md">
        <NavItem icono={Home} etiqueta="Inicio" />
        <NavItem icono={Layers} etiqueta="Tempor..." />
        <NavItem icono={PlaySquare} etiqueta="Conteni..." />
        <NavItem icono={Download} etiqueta="Descarg..." />
        <NavItem icono={Search} etiqueta="Buscar" />
      </div>
    </div>
  );
}

export default NavBar;