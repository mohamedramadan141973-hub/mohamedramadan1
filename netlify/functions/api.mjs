import { getStore } from '@netlify/blobs';
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json'}});
export default async (req)=>{
  const st=getStore('islamic'),act=new URL(req.url).pathname.split('/').pop();
  const day=new Date(Date.now()+3*36e5).toISOString().slice(0,10);
  if(act==='log'&&req.method==='POST'){
    const b=await req.json(),sid=String(b.sid||'').replace(/[^a-z0-9]/gi,'').slice(0,24);
    if(!sid)return J({ok:0},400);
    const k='s/'+sid,r=(await st.get(k,{type:'json'}))||{name:'',joined:Date.now(),visits:0,days:[],res:{}};
    if(b.name)r.name=String(b.name).slice(0,60);
    r.last=Date.now();if(!r.days.includes(day))r.days.push(day);
    if(b.type==='visit')r.visits++;
    if(b.type==='answer'&&/^\d+\.\d+$/.test(String(b.q))){const x=r.res[b.q]||(r.res[b.q]={c:0,w:0});b.ok?x.c++:x.w++}
    await st.setJSON(k,r);return J({ok:1});
  }
  if(act==='stats'){
    const pw=Netlify.env.get('TEACHER_PASSWORD');
    if(!pw||req.headers.get('x-key')!==pw)return J({err:1},401);
    const{blobs}=await st.list({prefix:'s/'}),students=[],sec={},qs={};let today=0,visits=0,A=0,C=0,W=0;
    for(const b of blobs){const r=await st.get(b.key,{type:'json'});if(!r)continue;
      let c=0,w=0;visits+=r.visits||0;if(r.days.includes(day))today++;
      for(const q in r.res){const x=r.res[q],s=q.split('.')[0];c+=x.c;w+=x.w;
        const z=sec[s]||(sec[s]={c:0,w:0});z.c+=x.c;z.w+=x.w;const y=qs[q]||(qs[q]={q,c:0,w:0});y.c+=x.c;y.w+=x.w}
      A+=c+w;C+=c;W+=w;students.push({name:r.name||'(بدون اسم)',last:r.last,days:r.days.length,c,w})}
    students.sort((a,b)=>(b.last||0)-(a.last||0));
    const hard=Object.values(qs).filter(x=>x.w).sort((a,b)=>b.w-a.w).slice(0,10);
    return J({students,today,visits,A,C,W,sec,hard});
  }
  return J({err:1},404);
};
export const config={path:'/api/*'};
