document.addEventListener('DOMContentLoaded', () => {
  const sobre = document.getElementById('sobre');
  const tarjeta = document.getElementById('tarjeta');
  const musica = document.getElementById('musica');
  const botonCerrar = document.getElementById('boton-cerrar');

  // Función para lanzar serpentinas (Confeti)
  function lanzarSerpentinas() {
    // Estallido central
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff0000', '#00bfff', '#32cd32', '#ff69b4']
    });
    // Estallidos laterales
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffd700', '#ff0000', '#00bfff'] });
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#32cd32', '#ff69b4', '#ff8c00'] });
    }, 250);
  }

  // Función para crear globos flotantes
  function lanzarGlobos() {
    const emojisGlobos = ['🎈', '🎈', '🎈', '🎉', '🎊'];
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const globo = document.createElement('div');
        globo.classList.add('globo');
        globo.innerText = emojisGlobos[Math.floor(Math.random() * emojisGlobos.length)];
        
        // Posición horizontal aleatoria
        globo.style.left = Math.random() * 90 + 'vw';
        // Tamaño aleatorio
        globo.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        
        document.body.appendChild(globo);

        // Eliminar el globo después de que termine la animación
        setTimeout(() => { globo.remove(); }, 4000);
      }, i * 150); // Se crean uno tras otro
    }
  }

  sobre.addEventListener('click', () => {
    if (tarjeta.classList.contains('pantalla-completa')) return;
    if (sobre.classList.contains('abierto')) return;

    // 1. Abrir el sobre
    sobre.classList.add('abierto');
    
    // 2. ¡Fiesta! Lanzar confeti y globos
    lanzarSerpentinas();
    lanzarGlobos();

    // 3. Reproducir música
    musica.volume = 0.7;
    musica.play().catch(e => console.log('Audio bloqueado', e));

    // 4. Expandir a pantalla completa después del rebote (1.1s)
    setTimeout(() => {
      document.body.classList.add('modo-lectura');
      tarjeta.classList.add('pantalla-completa');
      botonCerrar.classList.add('visible');
    }, 1000); 
  });

  botonCerrar.addEventListener('click', (e) => {
    e.stopPropagation(); 
    tarjeta.classList.remove('pantalla-completa');
    botonCerrar.classList.remove('visible');
    document.body.classList.remove('modo-lectura');
    
    setTimeout(() => {
      sobre.classList.remove('abierto');
    }, 500); 
  });
});