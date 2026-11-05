import './styles/main.less';

document.addEventListener('DOMContentLoaded', () => {

  const botonMenu = document.getElementById('botonMenu');
  const menuPrincipal = document.getElementById('menuPrincipal');

  if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener('click', () => {
      const menuAbierto = menuPrincipal.classList.toggle('menu-abierto');
      botonMenu.classList.toggle('activo', menuAbierto);
      botonMenu.setAttribute('aria-expanded', menuAbierto.toString());
      botonMenu.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
    });

    menuPrincipal.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', () => {
        menuPrincipal.classList.remove('menu-abierto');
        botonMenu.classList.remove('activo');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  const rolDinamico = document.getElementById('rolDinamico');
  const roles = ['Desarrollo web', 'Sistemas embebidos', 'Bases de datos'];
  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (rolDinamico && !prefiereMenosMovimiento) {
    let indiceRol = 0;
    let indiceCaracter = roles[0].length;
    let borrando = false;

    const escribirRol = (): void => {
      const textoActual = roles[indiceRol];

      if (!borrando) {
        indiceCaracter++;
        if (indiceCaracter > textoActual.length) {
          indiceCaracter = textoActual.length;
          borrando = true;
          setTimeout(escribirRol, 1800);
          return;
        }
      } else {
        indiceCaracter--;
        if (indiceCaracter < 0) {
          indiceCaracter = 0;
          borrando = false;
          indiceRol = (indiceRol + 1) % roles.length;
        }
      }

      rolDinamico.textContent = roles[indiceRol].slice(0, indiceCaracter);
      setTimeout(escribirRol, borrando ? 45 : 85);
    };

    setTimeout(escribirRol, 1800);
  }

  const elementosRevelables = document.querySelectorAll('section, .encabezado-seccion');

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.2 });

    elementosRevelables.forEach(elemento => observador.observe(elemento));
  } else {
    elementosRevelables.forEach(elemento => elemento.classList.add('visible'));
  }

  const fotoPerfil = document.getElementById('fotoPerfil');

  if (fotoPerfil) {
    fotoPerfil.addEventListener('error', () => {
      const contenedor = fotoPerfil.parentElement;
      fotoPerfil.remove();

      const respaldo = document.createElement('div');
      respaldo.className = 'avatar-respaldo';
      respaldo.innerHTML = '<strong>CH</strong><span>Agrega tu foto en public/img/profile.jpeg</span>';
      contenedor?.appendChild(respaldo);
    });
  }

  const botonCopiarCorreo = document.getElementById('botonCopiarCorreo');
  const valorCorreo = document.getElementById('valorCorreo');

  if (botonCopiarCorreo && valorCorreo && navigator.clipboard) {
    botonCopiarCorreo.addEventListener('click', () => {
      navigator.clipboard.writeText((valorCorreo.textContent ?? '').trim()).then(() => {
        const textoOriginal = botonCopiarCorreo.textContent;
        botonCopiarCorreo.textContent = '¡Copiado!';
        botonCopiarCorreo.classList.add('copiado');

        setTimeout(() => {
          botonCopiarCorreo.textContent = textoOriginal;
          botonCopiarCorreo.classList.remove('copiado');
        }, 1800);
      });
    });
  }

  const botonArriba = document.getElementById('botonArriba');

  if (botonArriba) {
    window.addEventListener('scroll', () => {
      botonArriba.classList.toggle('visible', window.scrollY > 500);
    });

    botonArriba.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const anioActual = document.getElementById('anioActual');
  if (anioActual) {
    anioActual.textContent = String(new Date().getFullYear());
  }
});