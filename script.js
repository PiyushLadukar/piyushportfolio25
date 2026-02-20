'use strict';
/* ============================================================
   PIYUSH LADUKAR — SCROLL-REACTIVE 3D WEBGL BACKGROUND
   6 unique scenes that morph as you scroll each section:
   Hero     → Spinning DNA Helix + Code Rain
   About    → Neural Brain Network with firing signals
   Exp      → Rotating Circuit Board + Glowing Gears
   Projects → Holographic Cards orbiting a star
   Skills   → Exploding Skill Constellation
   Contact  → Wormhole / Portal vortex
   ============================================================ */

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 900);
    initAll();
  }, 1800);
});

function initAll() {
  initCursor();
  initNav();
  initScrollDriven3D();
  initParticles();
  initSpiderWeb();
  initTyping();
  initScrollReveal();
  initScrollProgress();
  initTilt();
  initMagneticButtons();
  initCounters();
  initProjectTilt();
}

/* ============================================================  CURSOR  */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  (function loop(){ dot.style.left=mx+'px'; dot.style.top=my+'px'; rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
}

/* ============================================================  NAV  */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled', window.scrollY>60),{passive:true});
}

/* ============================================================
   SCROLL-DRIVEN 3D SCENE
   ============================================================ */
function initScrollDriven3D() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl',{alpha:false,antialias:true});
  if (!gl) return;

  const resize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; gl.viewport(0,0,canvas.width,canvas.height); };
  resize(); window.addEventListener('resize',resize,{passive:true});

  /* ---- Shaders ---- */
  const VS_PT = `
    attribute vec3 aPos; attribute vec4 aCol; attribute float aSz;
    uniform mat4 uMVP; uniform float uT;
    varying vec4 vCol;
    void main(){
      vec3 p=aPos;
      p.y += sin(p.x*2.0+uT)*0.03 + cos(p.z*1.5+uT*1.3)*0.03;
      gl_Position=uMVP*vec4(p,1.0);
      gl_PointSize=aSz*(1.0+0.25*sin(uT*2.5+p.x*4.0));
      vCol=aCol;
    }`;
  const FS_PT = `
    precision mediump float; varying vec4 vCol;
    void main(){
      vec2 uv=gl_PointCoord-.5; float d=length(uv);
      if(d>.5)discard;
      float g=1.0-smoothstep(.15,.5,d);
      gl_FragColor=vec4(vCol.rgb,vCol.a*g);
    }`;
  const VS_LN = `
    attribute vec3 aPos; attribute vec4 aCol;
    uniform mat4 uMVP; varying vec4 vCol;
    void main(){ gl_Position=uMVP*vec4(aPos,1.0); vCol=aCol; }`;
  const FS_LN = `
    precision mediump float; varying vec4 vCol;
    void main(){ gl_FragColor=vCol; }`;

  const mkShader=(t,s)=>{ const sh=gl.createShader(t); gl.shaderSource(sh,s); gl.compileShader(sh); return sh; };
  const mkProg=(vs,fs)=>{ const p=gl.createProgram(); gl.attachShader(p,mkShader(gl.VERTEX_SHADER,vs)); gl.attachShader(p,mkShader(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(p); return p; };
  const ptP=mkProg(VS_PT,FS_PT), lnP=mkProg(VS_LN,FS_LN);

  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
  gl.enable(gl.DEPTH_TEST);

  /* ---- Math ---- */
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>t<.5?2*t*t:-1+(4-2*t)*t;
  const mul=(a,b)=>{ const r=new Float32Array(16); for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)r[i*4+j]+=a[i*4+k]*b[k*4+j]; return r; };
  const rotY=a=>{ const c=Math.cos(a),s=Math.sin(a); return new Float32Array([c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1]); };
  const rotX=a=>{ const c=Math.cos(a),s=Math.sin(a); return new Float32Array([1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1]); };
  const trans=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);
  const persp=(fov,asp,n,f)=>{ const t=Math.tan(fov/2); return new Float32Array([1/(asp*t),0,0,0,0,1/t,0,0,0,0,-(f+n)/(f-n),-1,0,0,-2*f*n/(f-n),0]); };

  /* ---- Buffers ---- */
  const mkBuf=d=>{ const b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(d),gl.DYNAMIC_DRAW); return b; };
  const upBuf=(b,d)=>{ gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(d),gl.DYNAMIC_DRAW); };
  const bindA=(p,name,buf,sz)=>{ const l=gl.getAttribLocation(p,name); if(l<0)return; gl.bindBuffer(gl.ARRAY_BUFFER,buf); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l,sz,gl.FLOAT,false,0,0); };
  const bPos=mkBuf([0,0,0]),bCol=mkBuf([0,0,0,1]),bSz=mkBuf([1]);
  const blPos=mkBuf([0,0,0,0,0,0]),blCol=mkBuf([0,0,0,1,0,0,0,1]);

  /* ======================================================
     SCENE GENERATORS
     Each returns { pts[], cols[], szs[], lpts[], lcols[] }
     ====================================================== */

  // SCENE 0 — DNA HELIX + CODE RAIN
  function sceneDNA(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const N=100,H=3.2,R=0.55,twists=4;
    const connPairs=[];
    for(let i=0;i<=N;i++){
      const f=i/N, y=f*H-H/2, a=f*Math.PI*2*twists+t*.4;
      const x1=R*Math.cos(a),z1=R*Math.sin(a);
      const x2=R*Math.cos(a+Math.PI),z2=R*Math.sin(a+Math.PI);
      pts.push(x1,y,z1); const p1=Math.sin(i*.1+t)*.5+.5; cols.push(.05,.85,1,1); szs.push(3+p1*4);
      pts.push(x2,y,z2); const p2=Math.sin(i*.13+t+1)*.5+.5; cols.push(1,.15,.3,1); szs.push(3+p2*4);
      // strand lines
      if(i>0){
        lpts.push(x1,y,z1,R*Math.cos(a-(twists*Math.PI*2/N)+t*.4),y-H/N,R*Math.sin(a-(twists*Math.PI*2/N)+t*.4));
        lcols.push(0,.8,1,.5,0,.8,1,.5);
        lpts.push(x2,y,z2,R*Math.cos(a+Math.PI-(twists*Math.PI*2/N)+t*.4),y-H/N,R*Math.sin(a+Math.PI-(twists*Math.PI*2/N)+t*.4));
        lcols.push(1,.1,.3,.5,1,.1,.3,.5);
      }
      // rungs
      if(i%5===0){
        lpts.push(x1,y,z1,x2,y,z2);
        const bit=(i/5)%2, r=bit?.9:.1, g=bit?.9:.9, b=bit?.1:.9;
        lcols.push(r,g,b,.7,r,g,b,.7);
        pts.push((x1+x2)/2,y,(z1+z2)/2); cols.push(r,g,b,1); szs.push(bit?7:4);
      }
    }
    // code rain particles
    for(let i=0;i<80;i++){
      const a=i*2.4, rad=.9+Math.sin(i*.7)*0.4;
      const fy=((i*.31+t*.25)%1.6)-0.8*2;
      pts.push(Math.cos(a)*rad,fy,Math.sin(a)*rad);
      const g=Math.sin(i*.2+t)*.5+.5;
      cols.push(0,.5+g*.5,.3,g*.6); szs.push(1.5+g*3);
    }
    return {pts,cols,szs,lpts,lcols};
  }

  // SCENE 1 — NEURAL BRAIN NETWORK
  function sceneBrain(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const N=100, nodes=[];
    for(let i=0;i<N;i++){
      const phi=Math.acos(1-2*(i+.5)/N);
      const theta=Math.PI*(1+Math.sqrt(5))*i;
      const r=1.1+.25*Math.sin(i*.4+t*.6);
      nodes.push([r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta)]);
      const pulse=Math.sin(i*.35+t*2.5)*.5+.5;
      pts.push(...nodes[i]); cols.push(.2+pulse*.7,.1+pulse*.4,.95,.5+pulse*.5); szs.push(3+pulse*6);
    }
    // synaptic connections + signals
    for(let i=0;i<N;i++){
      const dists=[];
      for(let j=0;j<N;j++){ if(i===j)continue; const d=nodes[i].map((v,k)=>v-nodes[j][k]); dists.push({j,d:d.reduce((a,b)=>a+b*b,0)}); }
      dists.sort((a,b)=>a.d-b.d);
      for(let k=0;k<2;k++){
        const j=dists[k].j; if(j<=i)continue;
        const sig=Math.sin(t*2.5+i*.15)*.5+.5;
        lpts.push(...nodes[i],...nodes[j]); lcols.push(.25,.5,1,sig*.55,.25,.5,1,sig*.55);
      }
    }
    // firing pulses
    for(let i=0;i<25;i++){
      const prog=(t*.45+i/25)%1;
      const a=Math.floor(i*4%N), b=Math.floor((i*4+2)%N);
      pts.push(lerp(nodes[a][0],nodes[b][0],prog),lerp(nodes[a][1],nodes[b][1],prog),lerp(nodes[a][2],nodes[b][2],prog));
      cols.push(0,1,1,1); szs.push(8);
    }
    return {pts,cols,szs,lpts,lcols};
  }

  // SCENE 2 — CIRCUIT BOARD + GEARS
  function sceneCircuit(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const traces=[]; const G=7;
    for(let i=-G;i<=G;i++) for(let j=-G;j<=G;j++){
      if((i+j)%3!==0)continue;
      const x=i*.22,z=j*.22,y=-.6+Math.sin(i+j+t)*.04;
      const hot=(i%4===0||j%4===0)?1:.25;
      pts.push(x,y,z); cols.push(.05,hot*.8,.05,hot*.7); szs.push(hot>.5?5:2);
      traces.push({x,y,z,hot});
    }
    for(let i=0;i<traces.length-1;i++){
      const a=traces[i],b=traces[i+1];
      if(Math.abs(a.x-b.x)<.27&&Math.abs(a.z-b.z)<.27){
        lpts.push(a.x,a.y,a.z,b.x,b.y,b.z);
        const g=(a.hot+b.hot)*.5; lcols.push(.1,g,.1,g*.6,.1,g,.1,g*.6);
      }
    }
    // gear rings
    [.45,.75,1.05].forEach((r,ri)=>{
      const N=20+ri*10,spd=(ri%2?1:-1)*t*.45,ph=ri*.4;
      for(let i=0;i<N;i++){
        const a=i/N*Math.PI*2+spd;
        const x=r*Math.cos(a),z=r*Math.sin(a),y=ri*.18-.45;
        pts.push(x,y,z); cols.push(.95,.55,.05,.9); szs.push(ri===2?7:4.5);
        if(i>0){ const pa=(i-1)/N*Math.PI*2+spd; lpts.push(r*Math.cos(pa),y,r*Math.sin(pa),x,y,z); lcols.push(.9,.5,0,.45,.9,.5,0,.45); }
      }
    });
    // data packets
    for(let i=0;i<18;i++){
      const s=((t*.55+i/18)%1),idx=Math.floor(s*traces.length);
      if(traces[idx]){ pts.push(traces[idx].x,traces[idx].y,traces[idx].z); cols.push(1,1,.1,1); szs.push(8); }
    }
    return {pts,cols,szs,lpts,lcols};
  }

  // SCENE 3 — HOLOGRAPHIC ORBITING CARDS
  function sceneOrbit(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const cardCols=[[1,.25,.25],[.25,.65,1],[.25,1,.65],[1,.85,.25],[.8,.25,1],[0,.95,.95]];
    // central energy core
    for(let i=0;i<90;i++){
      const phi=Math.acos(1-2*(i+.5)/90),theta=Math.PI*(1+Math.sqrt(5))*i;
      const r=.28+Math.sin(i*.3+t*.9)*.07;
      pts.push(r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
      const b=Math.sin(i*.2+t)*.5+.5; cols.push(1,.85,.3,b); szs.push(2+b*4);
    }
    cardCols.forEach((cc,ci)=>{
      const orb=.95+ci*.2, spd=.35+(ci%2?.12:-.12);
      const angle=t*spd+ci/6*Math.PI*2, tilt=ci*.45;
      const cx=orb*Math.cos(angle), cy=Math.sin(tilt+t*.28)*.28, cz=orb*Math.sin(angle);
      const w=.24,h=.17;
      const corners=[[cx-w,cy-h,cz],[cx+w,cy-h,cz],[cx+w,cy+h,cz],[cx-w,cy+h,cz]];
      corners.forEach(c=>{ pts.push(...c); cols.push(...cc,.95); szs.push(5); });
      for(let i=0;i<4;i++){ lpts.push(...corners[i],...corners[(i+1)%4]); lcols.push(...cc,.65,...cc,.65); }
      lpts.push(0,0,0,cx,cy,cz); lcols.push(...cc,.2,...cc,.45);
      pts.push(cx,cy,cz); cols.push(...cc,1); szs.push(13);
      for(let d=0;d<6;d++){ const p=Math.sin(t*3+d+ci)*.5+.5,dx=(d/6-.5)*w*1.4; pts.push(cx+dx,cy+.04,cz); cols.push(...cc,p); szs.push(2+p*3); }
    });
    // outer ring
    for(let i=0;i<140;i++){ const a=i/140*Math.PI*2+t*.04; const r=1.9+Math.sin(i*.28+t)*.06; pts.push(r*Math.cos(a),Math.sin(a*.5+t)*.12,r*Math.sin(a)); cols.push(.3,.6,1,.14); szs.push(1.5); }
    return {pts,cols,szs,lpts,lcols};
  }

  // SCENE 4 — SKILL CONSTELLATION EXPLOSION
  function sceneConstellation(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const N=9, nodes=[];
    for(let i=0;i<N;i++){
      const phi=Math.acos(1-2*(i+.5)/N), theta=Math.PI*(1+Math.sqrt(5))*i+t*.08;
      const r=1.25;
      nodes.push([r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta)]);
      const pulse=Math.sin(t*2+i)*.5+.5;
      pts.push(...nodes[i]); cols.push(.9,.3,1,pulse*.85); szs.push(9+pulse*9);
      pts.push(...nodes[i]); cols.push(1,.9,1,pulse*.25); szs.push(22+pulse*16);
    }
    for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
      const d=nodes[i].reduce((s,v,k)=>s+(v-nodes[j][k])**2,0);
      if(d<2.6){ const p=Math.abs(Math.sin(t*1.5+i+j)); lpts.push(...nodes[i],...nodes[j]); lcols.push(.7,.2,1,p*.65,.7,.2,1,p*.65); }
    }
    // energy beams
    for(let i=0;i<N;i++){
      const s=(t*.4+i/N)%1;
      lpts.push(...nodes[i],nodes[i][0]*1.9*s,nodes[i][1]*1.9*s,nodes[i][2]*1.9*s);
      lcols.push(.9,.3,1,1-s,.9,.3,1,0);
    }
    // orbit ring
    for(let i=0;i<50;i++){ const a=i/50*Math.PI*2*3+t*.35,r=.45+i*.025,y=Math.sin(i*.5+t)*.5; pts.push(Math.cos(a)*r,y,Math.sin(a)*r); const h=i/50; cols.push(h,1-h,1,.55); szs.push(2.5); }
    return {pts,cols,szs,lpts,lcols};
  }

  // SCENE 5 — WORMHOLE PORTAL
  function sceneWormhole(t) {
    const pts=[],cols=[],szs=[],lpts=[],lcols=[];
    const rings=32,perRing=60;
    for(let r=0;r<rings;r++){
      const depth=(r/rings)*4.5-2.25,rad=.28+Math.abs(depth)*.55,twist=depth*1.6+t;
      for(let i=0;i<perRing;i++){
        const a=i/perRing*Math.PI*2+twist;
        const x=rad*Math.cos(a),y=rad*Math.sin(a);
        const d=Math.abs(depth)/2.25, pulse=Math.sin(t*3-r*.3)*.5+.5;
        pts.push(x,y,depth); cols.push(d*.2,d*.45+.3*pulse,1-d*.25,(.8-d*.35)*pulse+.2); szs.push(2+pulse*3);
        if(i>0&&r%3===0){ const pa=(i-1)/perRing*Math.PI*2+twist; lpts.push(rad*Math.cos(pa),rad*Math.sin(pa),depth,x,y,depth); lcols.push(0,.5+pulse*.5,1,pulse*.4,0,.5+pulse*.5,1,pulse*.4); }
      }
    }
    // event horizon
    for(let i=0;i<220;i++){ const a=i/220*Math.PI*2*6+t*.85,r=.12+i/220*.18; pts.push(r*Math.cos(a),r*Math.sin(a),0); const p=Math.sin(i*.05+t*4)*.5+.5; cols.push(1,.8,.2,p); szs.push(p*6); }
    // inbound stars
    for(let i=0;i<22;i++){
      const f=(t*.65+i/22)%1, sa=i/22*Math.PI*2, sr=2.8;
      const x=lerp(Math.cos(sa)*sr,0,f), y=lerp(Math.sin(sa)*sr,0,f), z=lerp(-3.2,0,f);
      pts.push(x,y,z); cols.push(1,1,1,1-f); szs.push((1-f)*9);
      lpts.push(x,y,z,x*1.04,y*1.04,z-.2); lcols.push(1,1,1,.5,1,1,1,0);
    }
    return {pts,cols,szs,lpts,lcols};
  }

  const scenes=[sceneDNA,sceneBrain,sceneCircuit,sceneOrbit,sceneConstellation,sceneWormhole];
  const sectionIds=['hero','about','experience','projects','skills','contact'];
  const sceneNames=['DNA HELIX','NEURAL NET','CIRCUITS','ORBITAL','CONSTELLATION','WORMHOLE'];
  const bgCols=[[.024,.031,.059],[.02,.04,.08],[.02,.055,.02],[.04,.02,.08],[.06,.02,.08],[.015,.035,.1]];

  let curScene=0, tgtScene=0, morph=1;
  let curBG=[...bgCols[0]];
  let hudLabel='',hudAlpha=0,hudTimer=0;

  window.addEventListener('scroll',()=>{
    const mid=window.innerHeight/2; let best=0;
    sectionIds.forEach((id,i)=>{ const el=document.getElementById(id); if(!el)return; const r=el.getBoundingClientRect(); if(r.top<mid&&r.bottom>mid)best=i; });
    if(best!==tgtScene){ tgtScene=best; morph=0; hudLabel=sceneNames[best]; hudAlpha=1; hudTimer=150; }
  },{passive:true});

  // HUD overlay
  const hud=document.createElement('canvas');
  hud.style.cssText='position:fixed;inset:0;z-index:9996;pointer-events:none;';
  document.body.appendChild(hud);
  const hctx=hud.getContext('2d');
  const rhud=()=>{ hud.width=window.innerWidth; hud.height=window.innerHeight; };
  rhud(); window.addEventListener('resize',rhud);

  function drawHUD(t) {
    hctx.clearRect(0,0,hud.width,hud.height);
    // scene label
    if(hudAlpha>0){
      hudTimer--; if(hudTimer<40)hudAlpha=hudTimer/40;
      hctx.save(); hctx.globalAlpha=hudAlpha*.75;
      hctx.font='600 10px "Fira Code",monospace'; hctx.letterSpacing='0.45em';
      hctx.fillStyle='#00ffe7';
      hctx.fillText('// SCENE :: '+hudLabel, 52, hud.height-52);
      // scanline
      const scan=(t%2.5)/2.5*hud.height;
      const g=hctx.createLinearGradient(0,scan-50,0,scan+50);
      g.addColorStop(0,'rgba(0,255,231,0)'); g.addColorStop(.5,'rgba(0,255,231,.025)'); g.addColorStop(1,'rgba(0,255,231,0)');
      hctx.fillStyle=g; hctx.fillRect(0,scan-50,hud.width,100);
      hctx.restore();
    }
    // corner brackets
    hctx.save(); hctx.globalAlpha=.12; hctx.strokeStyle='#00ffe7'; hctx.lineWidth=1.5;
    [[24,24,1,1],[hud.width-24,24,-1,1],[24,hud.height-24,1,-1],[hud.width-24,hud.height-24,-1,-1]].forEach(([x,y,sx,sy])=>{
      hctx.beginPath(); hctx.moveTo(x,y+sy*22); hctx.lineTo(x,y); hctx.lineTo(x+sx*22,y); hctx.stroke();
    });
    hctx.restore();
  }

  let T=0;
  function render(ts){
    T=ts*.001;
    if(morph<1){ morph=Math.min(1,morph+.022); if(morph>=1)curScene=tgtScene; }
    const m=ease(Math.min(morph,1));
    const tBG=bgCols[tgtScene];
    for(let i=0;i<3;i++)curBG[i]=lerp(curBG[i],tBG[i],.025);
    gl.clearColor(curBG[0],curBG[1],curBG[2],1);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    const scIdx=morph<.5?curScene:tgtScene;
    const sc=scenes[scIdx](T,m);

    upBuf(bPos,sc.pts); upBuf(bCol,sc.cols); upBuf(bSz,sc.szs);

    const asp=canvas.width/canvas.height;
    const proj=persp(Math.PI/3.8,asp,.05,50);
    const sf=Math.min(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)||0,1);
    const camDist=4.2-sf*.6, camAngle=T*.07;
    const view=mul(trans(0,-sf*.4,-camDist),rotX(Math.sin(T*.06)*.12));
    const model=mul(rotY(T*.11),rotX(Math.sin(T*.07)*.12));
    const mvp=mul(proj,mul(view,model));

    gl.useProgram(ptP);
    bindA(ptP,'aPos',bPos,3); bindA(ptP,'aCol',bCol,4); bindA(ptP,'aSz',bSz,1);
    gl.uniformMatrix4fv(gl.getUniformLocation(ptP,'uMVP'),false,mvp);
    gl.uniform1f(gl.getUniformLocation(ptP,'uT'),T);
    if(sc.pts.length) gl.drawArrays(gl.POINTS,0,sc.pts.length/3);

    if(sc.lpts.length){
      upBuf(blPos,sc.lpts); upBuf(blCol,sc.lcols);
      gl.useProgram(lnP);
      bindA(lnP,'aPos',blPos,3); bindA(lnP,'aCol',blCol,4);
      gl.uniformMatrix4fv(gl.getUniformLocation(lnP,'uMVP'),false,mvp);
      gl.drawArrays(gl.LINES,0,sc.lpts.length/3);
    }
    drawHUD(T);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* ============================================================  PARTICLES  */
function initParticles() {
  const canvas=document.getElementById('particles'); if(!canvas)return;
  const ctx=canvas.getContext('2d'); let P=[];
  const resize=()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; mkP(); };
  function mkP(){ P=[]; const c=Math.min(80,Math.floor(window.innerWidth/16)); for(let i=0;i<c;i++) P.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,sz:Math.random()*1.5+.3,op:Math.random()*.3+.1,col:Math.random()>.5?'220,38,38':'59,130,246',ph:Math.random()*Math.PI*2}); }
  let mx=0,my=0; document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
  function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); P.forEach(p=>{ const dx=mx-p.x,dy=my-p.y,d=Math.sqrt(dx*dx+dy*dy); if(d<150){p.vx+=dx/d*.01;p.vy+=dy/d*.01;} p.vx*=.99;p.vy*=.99;p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0; p.ph+=.025;const op=p.op*(.7+.3*Math.sin(p.ph)); ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fillStyle=`rgba(${p.col},${op})`;ctx.fill(); }); for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const dx=P[i].x-P[j].x,dy=P[i].y-P[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(P[i].x,P[i].y);ctx.lineTo(P[j].x,P[j].y);ctx.strokeStyle=`rgba(255,255,255,${.04*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}} requestAnimationFrame(draw); }
  resize(); draw(); window.addEventListener('resize',resize);
}

/* ============================================================  SPIDER WEB  */
function initSpiderWeb() {
  const canvas=document.getElementById('spiderWeb'); if(!canvas)return;
  const ctx=canvas.getContext('2d'); let pts=[]; let mouse={x:-1000,y:-1000};
  const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
  resize(); window.addEventListener('resize',resize);
  document.addEventListener('mousemove',e=>{ mouse.x=e.clientX;mouse.y=e.clientY;pts.push({x:mouse.x,y:mouse.y,life:1});if(pts.length>30)pts.shift(); });
  function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); pts=pts.filter(p=>p.life>.02); pts.forEach(p=>p.life*=.92); for(let i=0;i<pts.length-1;i++){const p1=pts[i],p2=pts[i+1];ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.strokeStyle=`rgba(0,255,231,${p1.life*.6})`;ctx.shadowColor='rgba(0,255,231,.9)';ctx.shadowBlur=8;ctx.lineWidth=1.5;ctx.stroke();} if(pts.length>2){for(let s=0;s<8;s++){const a=s/8*Math.PI*2;ctx.beginPath();ctx.moveTo(mouse.x,mouse.y);ctx.lineTo(mouse.x+Math.cos(a)*44,mouse.y+Math.sin(a)*44);ctx.strokeStyle='rgba(220,38,38,.13)';ctx.shadowBlur=0;ctx.lineWidth=.7;ctx.stroke();}} pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,Math.PI*2);ctx.fillStyle=`rgba(220,38,38,${p.life*.8})`;ctx.shadowColor='rgba(220,38,38,.9)';ctx.shadowBlur=5;ctx.fill();}); requestAnimationFrame(draw); }
  draw();
}

/* ============================================================  TYPING  */
function initTyping() {
  typeLoop('typing-text',['Software Developer','Backend Engineer','Android Developer','IoT Innovator','AI Explorer'],90,45,1600,320);
  typeLoop('typing-text-2',['Backend Engineer','Android Developer','IoT Innovator'],80,40,1500,300);
}
function typeLoop(id,words,ts,ds,pa,pb){ const el=document.getElementById(id);if(!el)return;let wi=0,ci=0,del=false;function tick(){const w=words[wi];if(del){ci--;el.textContent=w.substring(0,ci);if(ci===0){del=false;wi=(wi+1)%words.length;setTimeout(tick,pb);return;}setTimeout(tick,ds);}else{ci++;el.textContent=w.substring(0,ci);if(ci===w.length){del=true;setTimeout(tick,pa);return;}setTimeout(tick,ts);}}tick(); }

/* ============================================================  SCROLL REVEAL  */
function initScrollReveal(){ const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1,rootMargin:'0px 0px -40px 0px'}); document.querySelectorAll('.reveal').forEach(el=>o.observe(el)); }

/* ============================================================  SCROLL PROGRESS  */
function initScrollProgress(){ const b=document.getElementById('scrollProgress');if(!b)return; window.addEventListener('scroll',()=>{b.style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';},{passive:true}); }

/* ============================================================  TILT  */
function initTilt(){ const el=document.getElementById('tilt-container'),frame=el?.querySelector('.image-frame');if(!el||!frame)return; el.addEventListener('mousemove',e=>{const r=frame.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/(r.width/2),y=(e.clientY-r.top-r.height/2)/(r.height/2);frame.style.transform=`rotateY(${x*14}deg) rotateX(${-y*10}deg) scale(1.04)`;frame.style.transition='transform .1s ease';}); el.addEventListener('mouseleave',()=>{frame.style.transform='rotateY(0) rotateX(0) scale(1)';frame.style.transition='transform .6s ease';}); }

/* ============================================================  PROJECT TILT  */
function initProjectTilt(){ document.querySelectorAll('.project-card').forEach(card=>{const inner=card.querySelector('.project-inner');if(!inner)return;card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/(r.width/2),y=(e.clientY-r.top-r.height/2)/(r.height/2);inner.style.transform=`rotateY(${x*10}deg) rotateX(${-y*8}deg) scale(1.02)`;inner.style.transition='transform .1s ease';});card.addEventListener('mouseleave',()=>{inner.style.transform='rotateY(0) rotateX(0) scale(1)';inner.style.transition='transform .5s ease';});}); document.querySelectorAll('.glass-panel').forEach(p=>{p.addEventListener('mousemove',e=>{const r=p.getBoundingClientRect();p.style.background=`radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px,rgba(255,255,255,.07),rgba(13,18,38,.7))`;});p.addEventListener('mouseleave',()=>{p.style.background='';});}); }

/* ============================================================  MAGNETIC  */
function initMagneticButtons(){ document.querySelectorAll('.btn,.social-btn,.nav-link').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2,s=b.classList.contains('btn')?.25:.35;b.style.transform=`translate(${x*s}px,${y*s}px)`;});b.addEventListener('mouseleave',()=>{b.style.transform='';b.style.transition='transform .5s cubic-bezier(.16,1,.3,1)';});b.addEventListener('mouseenter',()=>{b.style.transition='transform .1s ease';});}); }

/* ============================================================  COUNTERS  */
function initCounters(){ const o=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=parseInt(el.dataset.count);let cur=0;const step=target/60;const ti=setInterval(()=>{cur+=step;if(cur>=target){el.textContent=target;clearInterval(ti);return;}el.textContent=Math.floor(cur);},16);o.unobserve(el);});},{threshold:.5}); document.querySelectorAll('.stat-num[data-count]').forEach(n=>o.observe(n)); }

/* ============================================================  RIPPLE  */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.btn').forEach(btn=>{btn.addEventListener('click',e=>{const ripple=document.createElement('span');const r=btn.getBoundingClientRect();ripple.style.cssText=`position:absolute;border-radius:50%;width:80px;height:80px;pointer-events:none;background:rgba(255,255,255,.22);transform:scale(0);animation:rippleA .6s ease forwards;left:${e.clientX-r.left-40}px;top:${e.clientY-r.top-40}px;`;btn.appendChild(ripple);setTimeout(()=>ripple.remove(),700);});});
  if(!document.getElementById('ripple-style')){const s=document.createElement('style');s.id='ripple-style';s.textContent='@keyframes rippleA{to{transform:scale(3);opacity:0}}';document.head.appendChild(s);}
});