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

document.addEventListener('DOMContentLoaded', () => {
  const f = document.getElementById('reservaForm');
  if (!f) return;

  f.addEventListener('submit', (e) => {
    e.preventDefault();                 
    if (!f.reportValidity()) return;    

    const { nombre, fecha, hora, personas } = f.elements;
    alert(`¡Gracias ${nombre.value.trim()}! Recibimos tu reserva para ${personas.value} el ${fecha.value} a las ${hora.value}.`);
    f.reset();
  });
});
