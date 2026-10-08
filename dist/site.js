const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-mobile-menu]');
if (toggle && menu) {
 const links = [...menu.querySelectorAll('a')];
 const closeMenu = (returnFocus = false) => {
  toggle.setAttribute('aria-expanded','false'); toggle.textContent='MENU +';
  menu.classList.remove('is-open'); document.body.classList.remove('menu-open');
  if(returnFocus) toggle.focus();
 };
 toggle.addEventListener('click',()=>{
  if(toggle.getAttribute('aria-expanded')==='true') {closeMenu(true);return;}
  toggle.setAttribute('aria-expanded','true'); toggle.textContent='CLOSE ×';
  menu.classList.add('is-open'); document.body.classList.add('menu-open');
  links[0]?.focus();
 });
 links.forEach(link=>link.addEventListener('click',()=>closeMenu()));
 document.addEventListener('keydown',event=>{
  if(toggle.getAttribute('aria-expanded')!=='true') return;
  if(event.key==='Escape') {event.preventDefault();closeMenu(true);}
  if(event.key==='Tab') {
   const items=[toggle,...links], i=items.indexOf(document.activeElement);
   if(event.shiftKey && i===0) {event.preventDefault();items.at(-1).focus();}
   else if(!event.shiftKey && i===items.length-1) {event.preventDefault();toggle.focus();}
  }
 });
 window.addEventListener('resize',()=>{if(window.innerWidth>960)closeMenu();});
}
