/* Shared: mobile menu, work filters, project lightbox. */
(function(){
'use strict';
var btn=document.getElementById('menuBtn');
if(btn){
  btn.addEventListener('click',function(){
    var open=document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.textContent=open?'Close':'Menu';
  });
  document.querySelectorAll('.top nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu'})});
}

/* work filters */
var chips=document.querySelectorAll('.chip[data-f]');
if(chips.length){
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});
      var f=c.dataset.f;
      document.querySelectorAll('.pcard').forEach(function(card){card.hidden=!(f==='all'||card.dataset.cat===f)});
    });
  });
}

/* lightbox */
var items=Array.prototype.slice.call(document.querySelectorAll('.g-item'));
var lb=document.getElementById('lb');
if(items.length&&lb){
  var img=lb.querySelector('img'),cap=lb.querySelector('p'),i=0,last=null;
  function show(n){i=(n+items.length)%items.length;var it=items[i];img.src=it.dataset.full;img.alt=it.dataset.alt||'';cap.textContent=it.dataset.tag+'  ('+(i+1)+' of '+items.length+')'}
  function open(n){last=document.activeElement;show(n);lb.classList.add('open');lb.querySelector('.x').focus();document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');document.body.style.overflow='';if(last)last.focus()}
  items.forEach(function(it,n){it.addEventListener('click',function(){open(n)})});
  lb.querySelector('.x').addEventListener('click',close);
  lb.querySelector('.pv').addEventListener('click',function(){show(i-1)});
  lb.querySelector('.nx').addEventListener('click',function(){show(i+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='ArrowRight')show(i+1);
  });
}
})();
