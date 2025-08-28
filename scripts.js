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
