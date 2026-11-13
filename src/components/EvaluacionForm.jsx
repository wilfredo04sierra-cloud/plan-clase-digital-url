import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, BookOpen, RefreshCw } from 'lucide-react';

const TEMAS = [
  "Semana 1: Identidad Digital",
  "Semana 2: Riesgos del Phishing",
  "Semana 3: Cifrado y Passwords",
  "Semana 4: Privacidad en Redes"
];

function EvaluacionForm() {
  const [nombre, setNombre] = useState('');
  const [temaSeleccionado, setTemaSeleccionado] = useState(TEMAS[0]);
  const [comentario, setComentario] = useState('');
  const [estado, setEstado] = useState('esperando');
  const [aportes, setAportes] = useState([]);
  const [cargandoForo, setCargandoForo] = useState(true);
  const [filtroTema, setFiltroTema] = useState('Todos');

  const urlNocoDB = import.meta.env.VITE_NOCODB_URL;
  const tokenNocoDB = import.meta.env.VITE_NOCODB_TOKEN;

  // Función para leer los comentarios guardados en NocoDB y mostrarlos en el foro
  const cargarAportes = async () => {
    setCargandoForo(true);
    try {
      const respuesta = await fetch(urlNocoDB, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'xc-token': tokenNocoDB
        }
      });
      if (respuesta.ok) {
        const data = await respuesta.json();
        const listaRegistros = data.records || data.list || [];
        setAportes([...listaRegistros].reverse());
      }
    } catch (error) {
      console.error("Error al cargar el foro:", error);
    } finally {
      setCargandoForo(false);
    }
  };

  useEffect(() => {
    cargarAportes();
  }, []);

  const enviarDatos = async (e) => {
    e.preventDefault();
    setEstado('enviando');

    try {
      // Guardamos el tema elegido junto con el comentario en la misma columna "Comentario"
      const comentarioConTema = `[${temaSeleccionado}] ${comentario}`;

      const payload = {
        "Nombre": nombre,
        "Comentario": comentarioConTema
      };

      const respuesta = await fetch(urlNocoDB, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'xc-token': tokenNocoDB
        },
        body: JSON.stringify([{ fields: payload }]) 
      });

      if (!respuesta.ok) throw new Error('Error al enviar a NocoDB');
      
      setEstado('exito');
      setComentario('');
      cargarAportes(); // Actualiza la lista del foro al instante
      
    } catch (error) {
      console.error(error);
      setEstado('error');
    }
  };

  // Filtra los mensajes según la pestaña del tema que el alumno o profesor elija ver
  const aportesFiltrados = aportes.filter((item) => {
    const campos = item.fields || item;
    const texto = campos.Comentario || '';
    if (filtroTema === 'Todos') return true;
    return texto.includes(`[${filtroTema}]`);
  });

  return (
    <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-xl">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-cyan-400" size={28} />
          <h2 className="text-2xl font-bold text-white">Foro Interactivo del Bimestre</h2>
        </div>
        <button 
          onClick={cargarAportes}
          className="flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={14} className={cargandoForo ? "animate-spin text-cyan-400" : ""} />
          Actualizar Foro
        </button>
      </div>
      
      <p className="text-slate-400 mb-8">
        Selecciona el tema de la clase, comparte tu opinión, responde a la actividad o deja tu duda para debatir con la clase.
      </p>

      {/* Formulario para publicar en el foro */}
      {estado === 'exito' ? (
        <div className="bg-emerald-900/30 border border-emerald-500/30 p-6 rounded-xl text-center mb-10">
          <CheckCircle2 className="text-emerald-400 mx-auto mb-3" size={48} />
          <h3 className="text-xl font-bold text-emerald-400 mb-2">¡Tu aporte fue publicado en el foro!</h3>
          <button 
            onClick={() => setEstado('esperando')}
            className="mt-3 text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Publicar otro comentario
          </button>
        </div>
      ) : (
        <form onSubmit={enviarDatos} className="space-y-4 mb-12 bg-slate-900/60 p-6 rounded-xl border border-slate-700/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Tu Nombre o Alias</label>
              <input 
                type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Ej. Alumno / HackerCazador99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Contenido del Bimestre (Tema)</label>
              <select 
                value={temaSeleccionado} 
                onChange={(e) => setTemaSeleccionado(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              >
                {TEMAS.map((tema, index) => (
                  <option key={index} value={tema}>{tema}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Tu Participación o Duda</label>
            <textarea 
              required value={comentario} onChange={(e) => setComentario(e.target.value)} rows="3"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Escribe aquí tu reflexión sobre esta clase o comparte un caso..."
            ></textarea>
          </div>

          <button 
            type="submit" disabled={estado === 'enviando'}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            {estado === 'enviando' ? 'Publicando...' : <><Send size={18} /> Publicar en el Foro</>}
          </button>
        </form>
      )}

      {/* Muro de participaciones de los alumnos */}
      <div className="border-t border-slate-700 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen size={20} className="text-emerald-400" />
            Participaciones de la Clase ({aportesFiltrados.length})
          </h3>

          {/* Botones para filtrar por cada clase */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroTema('Todos')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filtroTema === 'Todos' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Todos
            </button>
            {TEMAS.map((tema, i) => (
              <button
                key={i}
                onClick={() => setFiltroTema(tema)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filtroTema === tema ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                Semana {i + 1}
              </button>
            ))}
          </div>
        </div>

        {cargandoForo ? (
          <p className="text-slate-400 text-center py-6">Cargando participaciones desde NocoDB...</p>
        ) : aportesFiltrados.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-8 text-center text-slate-400">
            Aún no hay participaciones en este tema. ¡Sé el primero en comentar!
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {aportesFiltrados.map((item, idx) => {
              const campos = item.fields || item;
              const autor = campos.Nombre || 'Estudiante';
              const textoCompleto = campos.Comentario || '';
              
              // Separa la etiqueta [Tema] del mensaje para mostrarla como insignia
              const match = textoCompleto.match(/^\[(.*?)\]\s*(.*)$/);
              const etiquetaTema = match ? match[1] : 'General';
              const mensajeLimpio = match ? match[2] : textoCompleto;

              return (
                <div key={item.id || idx} className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-cyan-900/50 text-cyan-400 p-1.5 rounded-full">
                        <User size={14} />
                      </div>
                      <span className="font-bold text-white text-sm">{autor}</span>
                    </div>
                    <span className="text-xs bg-slate-800 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">
                      {etiquetaTema}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm pl-8">{mensajeLimpio}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default EvaluacionForm;