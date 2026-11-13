import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function ActividadItem({ numero, titulo, duracion, imagenUrl }) {
  const [completado, setCompletado] = useState(false);
  
  // Usar imagen proporcionada, si no existe usa una genérica
  const bgImage = imagenUrl ? imagenUrl : `https://picsum.photos/seed/${numero}/400/400`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true }}
      onClick={() => setCompletado(!completado)}
      className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden cursor-pointer shadow-xl group bg-slate-800"
    >
      <img 
        src={bgImage} 
        alt={titulo}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${completado ? 'opacity-20 scale-100' : 'opacity-60 group-hover:opacity-40 group-hover:scale-110'}`}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      
      {/* Gradiente oscuro inferior para resaltar el texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/70 to-transparent"></div>

      <div className="absolute bottom-0 w-full p-4 flex flex-col justify-end text-center">
        <h3 className={`text-base sm:text-lg font-bold mb-1 transition-colors ${completado ? 'text-slate-400 line-through decoration-emerald-500' : 'text-cyan-400 group-hover:text-cyan-300'}`}>
          {titulo}
        </h3>
        
        <div className="flex items-center justify-center gap-1">
          {completado && <CheckCircle2 size={14} className="text-emerald-500" />}
          <p className={`text-xs sm:text-sm font-medium ${completado ? 'text-emerald-500' : 'text-slate-300'}`}>
            {completado ? 'Clase Vista' : `Semana ${numero} • ${duracion}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ActividadItem;