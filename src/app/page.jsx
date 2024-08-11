
export default function HomePage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-8xl text-slate-200">Bienvenidos a <mark className="rounded-md">Evento Foto</mark></h1>
        <p className="text-2xl text-slate-500">En este sitio podras compartir imagenes en tiempo real o de tu galeria.</p>
        <div className="flex justify-center items-center gap-3">
          <a className="bg-orange-300 h-14 w-44 flex justify-center items-center rounded-md text-lg text-black" href='/view-photo' >Ver las imagenes</a>
          <a className="bg-blue-300 h-14 w-36 flex justify-center items-center rounded-md text-lg text-black" href='/qr' target="_blank" >Escanear QR</a>
        </div>
      </section>
    </main>
  );
}
