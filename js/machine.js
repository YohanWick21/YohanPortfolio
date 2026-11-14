/* The press: drag a job from rough idea to published.
   Everything on the card is a function of one number, p, from 0 to 1. Jobs come from js/jobs.js. */
(function(){
'use strict';
var JOBS=window.YW_JOBS,card=document.getElementById('card');
if(!JOBS||!card)return;
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(i){return document.getElementById(i)};
var STAGES=[
 {key:'ideate',word:'Ideate',no:'01 / 03',at:0,q:'What is the one thing this has to make someone do?'},
 {key:'create',word:'Create',no:'02 / 03',at:0.3,q:'What do they see first, and does it earn the next second?'},
 {key:'exec',word:'Execute',no:'03 / 03',at:0.66,q:'Does it work in two seconds, on a phone, with no explanation?'},
 {key:'pub',word:'Published',no:'Done',at:0.985,q:'What did this job teach me for the next one?'}
];
var PUBTEXT='Out the door. Most portfolios start here. The thinking above is where I would start on yours.';
var ALLTEXT='Every job shipped. That is how each one runs, yours included.';
var STN=[{label:'01 Ideate',p:0.12,go:0.14},{label:'02 Create',p:0.5,go:0.52},{label:'03 Execute',p:0.82,go:0.84},{label:'Published',p:1,go:1}];

var cur=0,p=0,stageIdx=-1,touched=false,tw=0,shipped={};
try{var saved=JSON.parse(sessionStorage.getItem('ywShipped')||'{}');if(saved&&typeof saved==='object')shipped=saved}catch(e){}
var note=$('note'),bp=$('bp'),colorImg=$('colorImg'),scan=$('scan'),dims=$('dims'),chrome=$('chrome'),stamp=$('stamp'),run=$('run'),fill=$('fill'),st=$('stations'),queue=document.querySelector('.queue');
var edgeCache={};

function tally(){var t=Object.keys(shipped).length,el=$('tally');if(el)el.textContent=t+' of '+JOBS.length+' shipped'}
JOBS.forEach(function(j,i){
  var b=document.createElement('button');b.type='button';b.className='job'+(shipped[i]?' done':'');b.setAttribute('aria-pressed','false');
  b.innerHTML='<i></i>'+j.name;b.addEventListener('click',function(){touched=true;loadJob(i)});queue.appendChild(b);
});
STN.forEach(function(s,i){
  var b=document.createElement('button');b.type='button';b.className='station';b.style.left=(s.p*100)+'%';b.textContent=s.label;
  if(i===0)b.style.transform='translateX(-8%)';
  if(i===3)b.style.transform='translateX(-92%)';
  b.addEventListener('click',function(){touched=true;go(s.go,reduce?0:700)});st.appendChild(b);
});
tally();

function sm(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}

/* the blueprint is the poster's own edges, drawn in lime */
function blueprint(i,img){
  if(edgeCache[i])return edgeCache[i];
  try{
    var w=bp.width,h=bp.height,c=document.createElement('canvas');c.width=w;c.height=h;
    var x=c.getContext('2d');x.drawImage(img,0,0,w,h);
    var d=x.getImageData(0,0,w,h).data,g=new Float32Array(w*h),k;
    for(k=0;k<w*h;k++)g[k]=0.299*d[k*4]+0.587*d[k*4+1]+0.114*d[k*4+2];
    var out=x.createImageData(w,h),o=out.data;
    for(var yy=1;yy<h-1;yy++)for(var xx=1;xx<w-1;xx++){
      var n=yy*w+xx;
      var gx=-g[n-w-1]-2*g[n-1]-g[n+w-1]+g[n-w+1]+2*g[n+1]+g[n+w+1];
      var gy=-g[n-w-1]-2*g[n-w]-g[n-w+1]+g[n+w-1]+2*g[n+w]+g[n+w+1];
      var m=Math.sqrt(gx*gx+gy*gy),a=Math.max(0,Math.min(255,(m-70)*2.4));
      o[n*4]=200;o[n*4+1]=255;o[n*4+2]=0;o[n*4+3]=a;
    }
    edgeCache[i]=out;return out;
  }catch(e){return null}
}
function paintBlueprint(i){
  var img=new Image();
  img.onload=function(){
    if(cur!==i)return;
    var data=blueprint(i,img),ctx=bp.getContext('2d');
    ctx.clearRect(0,0,bp.width,bp.height);
    if(data)ctx.putImageData(data,0,0);
    else{ctx.globalAlpha=.5;ctx.drawImage(img,0,0,bp.width,bp.height);ctx.globalAlpha=1}
  };
  img.src=JOBS[i].img;
}

function render(){
  var n=1-sm(0.16,0.32,p);
  note.style.opacity=n;
  note.style.transform='translateY('+((1-n)*-34)+'px) rotate('+((1-n)*-5)+'deg) scale('+(1-(1-n)*0.05)+')';
  bp.style.opacity=sm(0.18,0.32,p);
  var q=sm(0.38,0.84,p);
  colorImg.style.clipPath='inset(0 '+((1-q)*100)+'% 0 0)';
  scan.style.left='calc('+(q*100)+'% - 1px)';
  scan.style.opacity=(q>0.001&&q<0.999)?1:0;
  dims.style.opacity=sm(0.3,0.4,p)*(1-sm(0.5,0.6,p));
  chrome.style.opacity=sm(0.86,0.97,p);
  var on=p>=0.985;
  if(on&&!stamp.classList.contains('on')){stamp.classList.add('on');if(!reduce){card.classList.remove('thud');void card.offsetWidth;card.classList.add('thud')}markShipped()}
  if(!on&&stamp.classList.contains('on'))stamp.classList.remove('on');
  fill.style.width=(p*100)+'%';
  run.value=Math.round(p*1000);
  var s=0;for(var i=0;i<STAGES.length;i++)if(p>=STAGES[i].at)s=i;
  if(s!==stageIdx){stageIdx=s;updatePanel()}
  Array.prototype.forEach.call(st.children,function(b,i){b.classList.toggle('on',i===s)});
}
function copyFor(s){
  if(s.key!=='pub')return JOBS[cur][s.key];
  return Object.keys(shipped).length===JOBS.length?ALLTEXT:PUBTEXT;
}
function updatePanel(){
  var j=JOBS[cur],s=STAGES[stageIdx];
  $('stageWord').textContent=s.word;$('stageNo').textContent=s.no;
  $('meta').textContent=j.name+'  /  '+j.tag+'  /  '+j.meta;
  $('qText').textContent=s.q;
  $('doText').textContent=copyFor(s);
  $('after').hidden=s.key!=='pub';
  var pl=$('projLink');pl.href=j.href;
  var pn=$('panel');pn.classList.remove('swapin');void pn.offsetWidth;if(!reduce)pn.classList.add('swapin');
  $('live').textContent=s.word+', '+j.name;
  run.setAttribute('aria-valuetext',s.word);
}
function markShipped(){
  if(!shipped[cur]){
    shipped[cur]=true;
    try{sessionStorage.setItem('ywShipped',JSON.stringify(shipped))}catch(e){}
    queue.querySelectorAll('.job')[cur].classList.add('done');tally();
  }
  if(stageIdx===3)$('doText').textContent=copyFor(STAGES[3]);
}
function loadJob(i){
  cur=i;var j=JOBS[i];
  Array.prototype.forEach.call(queue.querySelectorAll('.job'),function(b,k){b.setAttribute('aria-pressed',k===i?'true':'false')});
  card.style.aspectRatio=j.w+' / '+j.h;
  bp.width=540;bp.height=Math.round(540*j.h/j.w);
  $('nBrief').textContent=j.brief;$('nIdea').textContent=j.idea;$('nTag').textContent=j.tag;$('nSize').textContent=j.w+' × '+j.h;
  dims.textContent='LAYOUT '+j.w+' × '+j.h;
  colorImg.src=j.img;colorImg.alt='Finished '+j.name+' design';
  paintBlueprint(i);
  cancelAnimationFrame(tw);p=0;stageIdx=-1;stamp.classList.remove('on');
  if(!reduce){card.classList.remove('swap');void card.offsetWidth;card.classList.add('swap')}
  render();
}
function go(target,dur){
  cancelAnimationFrame(tw);
  if(!dur){p=target;render();return}
  var a=p,t0=performance.now();
  (function step(){
    var t=Math.min(1,(performance.now()-t0)/dur),e=1-Math.pow(1-t,3);
    p=a+(target-a)*e;render();
    if(t<1)tw=requestAnimationFrame(step);
  })();
}

run.addEventListener('input',function(){touched=true;cancelAnimationFrame(tw);p=run.value/1000;render()});
$('nextJob').addEventListener('click',function(){touched=true;loadJob((cur+1)%JOBS.length)});
var drag=null;
card.addEventListener('pointerdown',function(e){
  touched=true;cancelAnimationFrame(tw);
  drag={x:e.clientX,p:p};card.classList.add('drag');
  try{card.setPointerCapture(e.pointerId)}catch(x){}
});
card.addEventListener('pointermove',function(e){
  if(!drag)return;
  var w=card.getBoundingClientRect().width*1.15;
  p=Math.max(0,Math.min(1,drag.p+(e.clientX-drag.x)/w));render();
});
function end(){drag=null;card.classList.remove('drag')}
card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end);

loadJob(0);
if(!reduce){
  document.querySelector('.rail').classList.add('wiggle');
  setTimeout(function(){
    if(touched)return;
    var a=performance.now();
    (function nudge(){
      if(touched)return;
      var t=(performance.now()-a)/1600;
      if(t>=1){p=0;render();return}
      p=Math.sin(t*Math.PI)*0.2;render();requestAnimationFrame(nudge);
    })();
  },1500);
}
})();
