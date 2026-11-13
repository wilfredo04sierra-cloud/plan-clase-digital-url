import React, { useState } from 'react';
import HeaderClase from './components/HeaderClase';
import EvaluacionForm from './components/EvaluacionForm';
import { CheckCircle2 } from 'lucide-react';

// Tarjeta simplificada y robusta integrada directamente
function TarjetaClase({ numero, titulo, duracion, imagenUrl }) {
  const [visto, setVisto] = useState(false);
  
  return (
    <div 
      onClick={() => setVisto(!visto)}
      className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg border border-slate-700 hover:border-cyan-500 transition-all"
    >
      <img 
        src={imagenUrl} 
        alt={titulo} 
        className={`w-full h-40 object-cover transition-opacity ${visto ? 'opacity-30' : 'opacity-90'}`} 
      />
      <div className="p-4 text-center">
        <h3 className={`font-bold mb-2 ${visto ? 'text-slate-400 line-through' : 'text-white'}`}>
          {titulo}
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm">
          {visto && <CheckCircle2 size={16} className="text-emerald-500" />}
          <span className={visto ? 'text-emerald-500' : 'text-cyan-400'}>
            {visto ? 'Clase Completada' : `Semana ${numero} • ${duracion}`}
          </span>
        </div>
      </div>
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
          <p className="text-slate-400 mt-2">Haz clic en las clases para marcarlas como vistas</p>
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
        <p>Plan de Clase Digital • Programación de Aplicaciones Web • Universidad Rafael Landivar</p>
        <p className="mt-1 font-medium text-slate-300">Desarrollado por Edin Wilfredo Zacarías Sierra Cahueque</p>
        <p className="mt-1">© 2026 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;