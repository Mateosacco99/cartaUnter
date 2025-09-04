
// Scroll hasta seccion seleccionada en subnav.

document.querySelectorAll('.subnav .tab').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth'});
    }
  });
});
const tabs=[...document.querySelectorAll('.subnav .tab')];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id='#'+entry.target.id;
      tabs.forEach(t=>t.classList.toggle('is-active',t.getAttribute('href')===id));
    }
  });
},{rootMargin:'-40% 0px -55% 0px',threshold:0.01});
document.querySelectorAll('section.section[id]').forEach(sec=>observer.observe(sec));


// Validacion y manejo de formulario de reservas.

document.addEventListener('DOMContentLoaded', () => {
  const f = document.getElementById('reservaForm');
  const dateInput = f.elements.fecha;
  const timeInput = f.elements.hora;

  const t = new Date();
  dateInput.min = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  timeInput.min = '16:00';
  timeInput.max = '23:00';

  const validarFecha = () => {
    dateInput.valorCustom('');
    if (!dateInput.value) dateInput.valorCustom('Seleccione una fecha.');
    else if (dateInput.validity.rangeUnderflow)
      dateInput.valorCustom('La fecha no puede ser anterior a hoy.');
  };
  const validarHora = () => {
    timeInput.valorCustom('');
    if (!timeInput.value) timeInput.valorCustom('Seleccione una hora.');
    else if (timeInput.validity.rangeUnderflow || timeInput.validity.rangeOverflow)
      timeInput.valorCustom('Las reservas deben ser entre 16:00 y 23:00.');
  };

  dateInput.addEventListener('input', validarFecha);
  dateInput.addEventListener('invalid', validarFecha);
  timeInput.addEventListener('input', validarHora);
  timeInput.addEventListener('invalid', validarHora);

  f.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFecha(); validarHora();
    if (!f.reportValidity()) return;
    const { nombre, fecha, hora, personas } = f.elements;
    alert(`¡Gracias ${nombre.value.trim()}! Recibimos tu reserva para ${personas.value} el ${fecha.value} a las ${hora.value}.`);
    f.reset();
  });
});
