import React, { useState } from 'react';
import HeaderClase from './components/HeaderClase';
import EvaluacionForm from './components/EvaluacionForm';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Tarjeta con efecto 3D (Flip Card)
function TarjetaClase({ numero, titulo, duracion, imagenUrl }) {
  const [volteada, setVolteada] = useState(false);
  
  return (
    <div 
      onClick={() => setVolteada(!volteada)}
      className="w-full h-56 cursor-pointer relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: volteada ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* --- LADO FRONTAL --- */}
        <div 
          style={{ backfaceVisibility: "hidden" }} 
          className="absolute w-full h-full bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-cyan-500 transition-colors"
        >
          <img 
            src={imagenUrl} 
            alt={titulo} 
            className="w-full h-32 object-cover" 
          />
          <div className="p-3 text-center">
            <h3 className="font-bold text-white mb-1">
              {titulo}
            </h3>
            <span className="text-cyan-400 text-sm font-medium">
              Semana {numero} • {duracion}
            </span>
          </div>
        </div>

        {/* --- LADO TRASERO --- */}
        <div 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} 
          className="absolute w-full h-full bg-slate-800 rounded-xl p-4 shadow-lg border border-cyan-500 flex flex-col justify-center items-center text-center"
        >
          <h3 className="font-bold text-white mb-2">Área de Actividades</h3>
          <p className="text-slate-300 text-sm mb-4">
            Próximamente: Enlaces a cuestionarios y dinámicas.
          </p>
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold">
            <CheckCircle2 size={16} />
            <span>Módulo Listo</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 pb-20">
      <HeaderClase />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8 border-b border-slate-700 pb-4">
          <h2 className="text-3xl font-bold text-white">Contenido del Bimestre</h2>
          <p className="text-slate-400 mt-2">Haz clic en las tarjetas para ver las actividades</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <TarjetaClase 
            numero="1" 
            titulo="Identidad Digital" 
            duracion="45 min" 
            imagenUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEIxZZcFHL8a0E7u7fj4Me5j0ZUtPBhmvvV6aRdu-C5w&s=10" 
          />
          <TarjetaClase 
            numero="2" 
            titulo="Riesgos del Phishing" 
            duracion="45 min" 
            imagenUrl="https://www.lisot.com/wp-content/uploads/2021/06/que-es-phising.jpg" 
          />
          <TarjetaClase 
            numero="3" 
            titulo="Cifrado y Passwords" 
            duracion="45 min" 
            imagenUrl="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/7JZ4O5OX6RFQLHC5NEM2DUQXMA.jpg" 
          />
          <TarjetaClase 
            numero="4" 
            titulo="Privacidad en Redes" 
            duracion="45 min" 
            imagenUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXrCChTOx7N15qnVTyB16ivpeSLvQaOGZDA9VHCq8S2EMDH_mFAkVwOs&s=10" 
          />
        </div>
        
        <div className="mt-16">
          <EvaluacionForm />
        </div>
      </main>

      <footer className="text-center py-8 mt-12 border-t border-slate-800 text-slate-400 text-sm">
        <p>Plan de Clase Digital • Programación de Aplicaciones Web • Universidad Rafael Landívar</p>
        <p className="mt-1 font-medium text-slate-300">Desarrollado por Edin Wilfredo Zacarías Sierra Cahueque</p>
        <p className="mt-1">© 2026 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;