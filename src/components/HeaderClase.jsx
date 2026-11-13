import React from 'react';
import { ShieldCheck, BookOpen } from 'lucide-react';

function HeaderClase() {
  return (
    <header className="bg-slate-950 border-b border-cyan-900 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center gap-2 text-emerald-400 mb-4">
          <ShieldCheck size={24} />
          <span className="font-bold tracking-widest uppercase text-sm">Tercero Básico</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Ciudadanía Digital y <span className="text-cyan-400">Ciberseguridad</span>
        </h1>
        
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Aprende a proteger tu identidad en línea, identificar fraudes digitales y navegar de forma segura.
        </p>
        
        <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-full border border-slate-700 shadow-md">
          <BookOpen size={18} className="text-cyan-400" />
          <span className="font-medium">Unidad 1</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderClase;