  const grid = new Muuri('.grid',{
     layout:{
     rounding:false
     }
 });

  window.addEventListener('load',() => {
  grid.refreshItems().layout();
  document.getElementById('grid').classList.add('imagenes-cargadas');

// agregamos los listeners de los enlaces para filtrar categoria
  const enlaces = document.querySelectorAll('#categorias a');
  enlaces.forEach( (elemento) => {
    elemento.addEventListener('click', (evento) => {
      evento.preventDefault();
      
      enlaces.forEach((enlace) => enlace.classList.remove('activo'));
      evento.target.classList.add('activo');

     const categoria = evento.target.innerHTML.toLowerCase();
     categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
     
    });
  });

// agregamos listeners para la barra de busqueda
document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
  const busqueda = evento.target.value;
  grid.filter( (item) =>  item.getElement().dataset.etiquetas.includes(busqueda) );
})
// agregando lisener para las imagenes
const overlay = document.getElementById('overlay');
document.querySelectorAll('.grid .item img').forEach((elemento) => {
 

  elemento.addEventListener('click', () => {
  const ruta = elemento.getAttribute('src');
  const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
  
  overlay.classList.add('activo');
  document.querySelector('#overlay img').src = ruta;
  document.querySelector('#overlay .descripcion').innerHTML = descripcion;
  });

  // trabajando con el overlay de precios

  elemento.addEventListener('click', () => {
    const ruta = elemento.getAttribute('src');
    const precio = elemento.parentNode.parentNode.dataset.precio;
    
    overlay.classList.add('activo');
    document.querySelector('#overlay img').src = ruta;
    document.querySelector('#overlay .precio').innerHTML = precio;
    });

});

// eventlistener del boton de cerrar
document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
overlay.classList.remove('activo');

});
// eventlistener del overlay
overlay.addEventListener('click', (evento) => {
  evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
});

});
