/* Escape Box toys B: dinosaur, whale, magnifier, binoculars, sunglasses. Pure CSS 3D. */
(function(){ window.EBToys = window.EBToys || {};
var NAVY='#232A36',RED='#D64933',MUS='#E8B04B',TEAL='#2F7F86',CREAM='#F6EFE3',INK='#1F2430',KRAFT='#C89B6D',DINO='#6BAA5A',WHALE='#4D8FC4';
if(!document.getElementById('ebtoys-b')){var st=document.createElement('style');st.id='ebtoys-b';
st.textContent='.tyb-r,.tyb-g{position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d}'+
'.tyb-f{position:absolute;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden}'+
'.tyb-2{-webkit-backface-visibility:visible;backface-visibility:visible}.tyb-o{border-radius:50%}';
document.head.appendChild(st);}
function sh(h,k){var n=parseInt(h.slice(1),16),c=[n>>16,n>>8&255,n&255].map(function(v){return Math.round(k>1?v+(255-v)*(k-1):v*k);});
return 'rgb('+c.join(',')+')';}
function grp(p,t){var g=document.createElement('div');g.className='tyb-g';if(t)g.style.transform=t;p.appendChild(g);return g;}
function face(g,w,h,t,bg,cls,css){var f=document.createElement('div');f.className='tyb-f'+(cls?' '+cls:'');
f.style.cssText='width:'+w+'px;height:'+h+'px;left:'+(-w/2)+'px;top:'+(-h/2)+'px;transform:'+t+';background:'+bg+';'+(css||'');g.appendChild(f);return f;}
function px(x,y,z){return 'translate3d('+x+'px,'+y+'px,'+z+'px) ';}
/* cuboid centred at x,y,z; faces shaded by orientation */
function box(p,w,h,d,x,y,z,c,t){var g=grp(p,px(x,y,z)+(t||'')),W=w+.6,H=h+.6,D=d+.6;
[[W,H,'translateZ('+d/2+'px)',1],[W,H,'rotateY(180deg) translateZ('+d/2+'px)',.78],[D,H,'rotateY(90deg) translateZ('+w/2+'px)',.86],
[D,H,'rotateY(-90deg) translateZ('+w/2+'px)',.7],[W,D,'rotateX(90deg) translateZ('+h/2+'px)',1.25],[W,D,'rotateX(-90deg) translateZ('+h/2+'px)',.55]]
.forEach(function(f){face(g,f[0],f[1],f[2],sh(c,f[3]));});return g;}
/* cylinder along local Y (n even); o.ri = hollow ring; o.top/o.bot cap backgrounds. rotateX(90deg) points it at the viewer (bot cap = front) */
function cyl(p,r,len,n,c,t,o){o=o||{};var g=grp(p,t),s=2*r*Math.tan(Math.PI/n)+.8,R=r/Math.cos(Math.PI/n),pts=[],i,a,k;
for(i=0;i<n;i++){a=360*i/n;k=.66+.42*Math.cos((a-35)*Math.PI/180);
face(g,s,len,'rotateY('+a+'deg) translateZ('+r+'px)',sh(c,k));
if(o.ri)face(g,2*o.ri*Math.tan(Math.PI/n)+.8,len,'rotateY('+a+'deg) translateZ('+o.ri+'px) rotateY(180deg)',sh(c,1.3-k*.5));
var b=(i+.5)*2*Math.PI/n;pts.push((50+50*Math.sin(b)).toFixed(1)+'% '+(50+50*Math.cos(b)).toFixed(1)+'%');}
var cp='clip-path:polygon('+pts.join(',')+');',hole=o.ri?function(col){return 'radial-gradient(circle,transparent '+(o.ri-.5)+'px,'+col+' '+o.ri+'px)';}:function(col){return col;};
face(g,2*R,2*R,'rotateX(90deg) translateZ('+len/2+'px)',o.top||hole(sh(c,1.2)),'',cp);
face(g,2*R,2*R,'rotateX(-90deg) translateZ('+len/2+'px)',o.bot||hole(sh(c,.9)),'',cp);return g;}
/* pair of cute eyes on both sides (z=+-zz) */
function eyes(g,x,y,zz,e){var bg='radial-gradient(circle at 62% 36%,#fff 0 16%,'+INK+' 19%)',bl='radial-gradient(closest-side,rgba(214,73,51,.55),rgba(214,73,51,0))';
[1,-1].forEach(function(sg){var rot=sg<0?'rotateY(180deg)':'';
face(g,e,e,px(x,y,sg*zz)+rot,bg,'tyb-o','border:'+(e*.12)+'px solid '+CREAM);
face(g,e*.9,e*.6,px(x-e*.9,y+e*.85,sg*(zz-.3))+rot,bl,'tyb-o');});}
function root(){var r=document.createElement('div');r.className='tyb-r';return r;}

EBToys.dinosaur=function(size){var u=size/10,r=root(),D2=sh(DINO,.8);
box(r,4*u,3.2*u,3*u,0,.6*u,0,DINO);
box(r,3.4*u,2.6*u,2.6*u,2.4*u,-2.3*u,0,DINO);
box(r,1.8*u,.8*u,2.2*u,2.9*u,-.7*u,0,sh(DINO,1.35));
box(r,3.4*u,1.4*u,2.5*u,.2*u,2.25*u,0,'#CFE3B8');
box(r,2.6*u,2*u,2.2*u,-3*u,1.2*u,0,DINO);
box(r,1.8*u,1.2*u,1.4*u,-4.6*u,1.8*u,0,DINO);
[1,-1].forEach(function(s){box(r,1.3*u,1.9*u,1.1*u,.5*u,3.1*u,s*.95*u,D2);
box(r,.9*u,.45*u,.45*u,2.2*u,.9*u,s*1.1*u,D2);});
[[-1.2,-1.2],[.4,-1.2],[2.2,-3.7],[-3,.1]].forEach(function(p){box(r,.75*u,.75*u,.5*u,p[0]*u,p[1]*u,0,MUS,'rotateZ(45deg)');});
eyes(r,3*u,-2.6*u,1.3*u+.6,1*u);return r;};

EBToys.whale=function(size){var u=size/10,r=root();
box(r,6*u,3.4*u,3.6*u,-.2*u,0,0,WHALE);
box(r,1*u,2.8*u,3*u,3.2*u,.15*u,0,WHALE);
box(r,5.6*u,.8*u,3.2*u,.2*u,1.85*u,0,CREAM);
box(r,2*u,1.8*u,1.8*u,-3.9*u,-.3*u,0,WHALE);
box(r,1.4*u,.4*u,4.4*u,-4.6*u,-1.3*u,0,sh(WHALE,.85),'rotateZ(-20deg)');
[1,-1].forEach(function(s){box(r,1.8*u,.3*u,1.1*u,1*u,1.3*u,s*2.1*u,sh(WHALE,.85),'rotateY('+(s*-25)+'deg) rotateZ(25deg)');});
box(r,.5*u,1.1*u,.5*u,1*u,-2.2*u,0,'#9FD3E6');
[[-.5,-3.6],[1,-4.2],[2.5,-3.6]].forEach(function(p){box(r,.6*u,.6*u,.6*u,(p[0]+.5)*u,p[1]*u,0,'#BFE4F0');});
eyes(r,1.9*u,-.3*u,1.8*u+.6,.9*u);
[1,-1].forEach(function(s){face(r,2.2*u,.9*u,px(2.4*u,.8*u,s*(1.8*u+.6))+(s<0?'rotateY(180deg)':''),'transparent','','border-bottom:'+(.18*u)+'px solid '+INK+';border-radius:0 0 50% 50%');});
return r;};

EBToys.magnifier=function(size){var u=size/10,r=root(),cx=-1*u,cy=-1*u,dir=Math.SQRT1_2;
cyl(r,3*u,.8*u,12,MUS,px(cx,cy,0)+'rotateX(90deg)',{ri:2.5*u});
face(r,5.1*u,5.1*u,px(cx,cy,0),'radial-gradient(circle at 35% 30%,rgba(255,255,255,.75) 0 10%,rgba(255,255,255,0) 30%),radial-gradient(circle,rgba(170,215,220,.25),rgba(47,127,134,.45))','tyb-2 tyb-o');
function at(d){return px(cx+d*dir,cy+d*dir,0)+'rotateZ(-45deg)';}
cyl(r,.8*u,1*u,8,NAVY,at(3.4*u));
cyl(r,.6*u,3.6*u,8,RED,at(5.7*u));
cyl(r,.7*u,.4*u,8,NAVY,at(7.6*u));return r;};

EBToys.binoculars=function(size){var u=size/10,r=root(),glass='radial-gradient(circle at 38% 34%,rgba(255,255,255,.7) 0 8%,transparent 22%),radial-gradient(circle,#3B8C93 0,'+TEAL+' 35%,#12303A 62%,'+MUS+' 64%)';
[1,-1].forEach(function(s){var x=s*1.9*u;
cyl(r,1.5*u,4.4*u,10,NAVY,px(x,0,0)+'rotateX(90deg)');
cyl(r,1.6*u,1.4*u,10,TEAL,px(x,0,.3*u)+'rotateX(90deg)');
cyl(r,1.8*u,1*u,10,MUS,px(x,0,2.6*u)+'rotateX(90deg)',{bot:glass});
cyl(r,1*u,1.2*u,10,INK,px(x,0,-2.8*u)+'rotateX(90deg)',{top:'radial-gradient(circle,#2F7F86 0 30%,#0E1218 34%,'+INK+' 60%)'});});
box(r,1.4*u,1.2*u,2.6*u,0,-.5*u,0,INK);
cyl(r,.6*u,1.2*u,8,RED,px(0,-1.4*u,-.4*u)+'rotateZ(90deg)');return r;};

EBToys.sunglasses=function(size){var u=size/10,r=root(),fz=2.4*u,rad='border-radius:12% 12% 42% 42%/14% 14% 62% 62%;border:'+(.32*u)+'px solid '+INK+';';
[1,-1].forEach(function(s){var x=s*2.4*u;
face(r,4*u,2.9*u,px(x,0,fz+.25*u),'linear-gradient(200deg,rgba(255,255,255,.55) 0 9%,transparent 10% 20%,rgba(255,255,255,.25) 21% 25%,transparent 26%),linear-gradient(160deg,#3D4A5E,#11151C 55%,'+TEAL+')','',rad);
face(r,4*u,2.9*u,px(x,0,fz-.25*u)+'rotateY(180deg)','linear-gradient(160deg,#2A3240,#0E1117)','',rad);
box(r,.4*u,.55*u,6.2*u,s*4.65*u,-1.15*u,fz-3.1*u,RED);
box(r,.4*u,1.5*u,.5*u,s*4.65*u,-.55*u,fz-6.1*u,RED,'rotateX(25deg)');
box(r,.5*u,.8*u,.7*u,s*4.55*u,-1.15*u,fz,INK);});
box(r,9.4*u,.8*u,.7*u,0,-1.5*u,fz,INK);
box(r,1*u,.45*u,.5*u,0,-.6*u,fz,INK);return r;};
})();
