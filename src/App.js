import React, { useState } from 'react';

const C = {
  purple: '#534AB7',
  purpleLight: '#EEEDFE',
  purpleDark: '#3C3489',
  teal: '#1D9E75',
  tealLight: '#E1F5EE',
  tealBorder: '#5DCAA5',
  tealDark: '#085041',
  red: '#A32D2D',
  redLight: '#FCEBEB',
  redBorder: '#F09595',
  white: '#ffffff',
  gray100: '#f9f9fb',
  gray200: '#f1f0f5',
  gray300: '#e5e3ef',
  gray500: '#888',
  gray700: '#444',
  black: '#1a1a2e',
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f5f4ff; font-family: 'Inter', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.04); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to   { opacity: 1; max-height: 200px; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .fade-up   { animation: fadeUp 0.5s ease both; }
  .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }
  .fade-up-3 { animation: fadeUp 0.5s 0.2s ease both; }
  .fade-up-4 { animation: fadeUp 0.5s 0.3s ease both; }

  .zip-btn {
    width: 100%; padding: 14px; background: ${C.purple};
    color: white; border: none; border-radius: 10px;
    font-size: 15px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s;
  }
  .zip-btn:hover  { background: ${C.purpleDark}; transform: translateY(-1px); }
  .zip-btn:active { transform: scale(0.98); }
  .zip-btn:disabled { background: #AFA9EC; cursor: not-allowed; transform: none; }

  .spin { animation: spin 0.8s linear infinite; display: inline-block; }

  .copy-btn {
    padding: 7px 16px; border: 1.5px solid ${C.tealBorder};
    border-radius: 8px; background: transparent;
    color: ${C.tealDark}; font-size: 12px; font-weight: 500;
    cursor: pointer; transition: background 0.2s;
    display: flex; align-items: center; gap: 5px; white-space: nowrap;
  }
  .copy-btn:hover { background: ${C.tealLight}; }

  .demo-tab {
    padding: 6px 14px; border: 1.5px solid ${C.gray300};
    border-radius: 99px; font-size: 12px; font-weight: 500;
    cursor: pointer; background: transparent;
    color: ${C.gray500}; transition: all 0.2s;
  }
  .demo-tab.active {
    background: ${C.purple}; color: white;
    border-color: ${C.purple};
  }
  .demo-tab:hover:not(.active) { border-color: ${C.purple}; color: ${C.purple}; }

  .step-card {
    background: white; border: 1.5px solid ${C.gray300};
    border-radius: 14px; padding: 1.1rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .step-card:hover { border-color: ${C.purple}; transform: translateY(-2px); }

  .feat-card {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 1rem; background: white; border: 1.5px solid ${C.gray300};
    border-radius: 14px; transition: border-color 0.2s, transform 0.2s;
  }
  .feat-card:hover { border-color: ${C.purple}; transform: translateY(-2px); }

  .url-input {
    width: 100%; padding: 13px 16px;
    border: 1.5px solid ${C.gray300}; border-radius: 10px;
    font-size: 14px; background: white; color: ${C.black};
    margin-bottom: 10px; transition: border-color 0.25s;
    font-family: 'Inter', sans-serif;
  }
  .url-input:focus { outline: none; border-color: ${C.purple}; }

  .alias-wrap {
    display: flex; align-items: center;
    border: 1.5px solid ${C.gray300}; border-radius: 10px;
    overflow: hidden; margin-bottom: 1rem;
    transition: border-color 0.25s;
  }
  .alias-wrap:focus-within { border-color: ${C.purple}; }
  .alias-pre {
    padding: 12px 14px; background: ${C.gray200};
    color: ${C.gray500}; font-size: 13px; font-weight: 500;
    white-space: nowrap; border-right: 1.5px solid ${C.gray300};
  }
  .alias-field {
    flex: 1; padding: 12px 14px; border: none;
    font-size: 13px; background: white; color: ${C.black};
    font-family: 'Inter', sans-serif;
  }
  .alias-field:focus { outline: none; }

  .result-slide {
    animation: slideDown 0.4s ease both;
    overflow: hidden;
  }

  .stat-card {
    background: white; border-radius: 12px;
    padding: 1rem; text-align: center;
    border: 1.5px solid ${C.gray300};
    transition: transform 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); }
`;

const DEMOS = [
  {
    label: 'Amazon link',
    long: 'https://amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_1?crid=2WVQK&keywords=iphone',
    short: 'ziplink.com/iphone15',
    alias: 'iphone15',
    desc: 'A 100+ character Amazon link becomes 6 clean words.'
  },
  {
    label: 'YouTube video',
    long: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrEnWoR732-BHrPp_Pm8&index=1&ab_channel=RickAstley',
    short: 'ziplink.com/rickroll',
    alias: 'rickroll',
    desc: 'YouTube + playlist links are huge. One word is enough.'
  },
  {
    label: 'GitHub repo',
    long: 'https://github.com/myusername/distributed-url-shortener-project/blob/main/src/main/java/com/urlshortener',
    short: 'ziplink.com/myproject',
    alias: 'myproject',
    desc: 'Share your project in interviews with a clean link.'
  },
];

const FEATS = [
  { icon: '⚡', title: 'Instant shortening', desc: 'Any URL becomes a short link in milliseconds' },
  { icon: '✏️', title: 'Custom alias', desc: 'Choose your own name — ziplink.com/yourname' },
  { icon: '📊', title: 'Click analytics', desc: 'Track exactly how many people clicked your link' },
  { icon: '⏰', title: 'Auto expiry', desc: 'Links auto-delete after 7 days — clean & private' },
  { icon: '🛡️', title: 'Rate limiting', desc: 'Max 5 links/min — spam protection built in' },
  { icon: '📋', title: 'One-click copy', desc: 'Copy your short link instantly with one tap' },
];

export default function App() {
  const [longUrl, setLongUrl]   = useState('');
  const [alias, setAlias]       = useState('');
  const [result, setResult]     = useState('');
  const [error, setError]       = useState('');
  const [copied, setCopied]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [links, setLinks]       = useState(0);
  const [copies, setCopies]     = useState(0);
  const [activeTab, setTab]     = useState(0);
  const [statsCode, setStatsCode]=useState('');
  const [statsData, setStatsData]=useState(null);
  const [statsError, setStatsError]=useState('');
  const [statsLoading, setStatsLoading]=useState(false);


  const doZip = async () => {
    setError(''); setResult('');
    if (!longUrl) { setError('Please paste a URL first!'); return; }
    if (!longUrl.startsWith('http')) { setError('URL must start with http:// or https://'); return; }
    setLoading(true);
    try {
      const res  = await fetch('https://ziplink-backend-tcqk.onrender.com/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, customAlias: alias }),
      });
      const data = await res.text();
      if (data.startsWith('Error')) { setError(data); }
      else {
        console.log('Backend response:', data);
        const code = data.split('myapp.com/')[1]?.split(' ')[0];
        console.log('Extracted code:', code);
        setResult('https://ziplink-backend-tcqk.onrender.com/' + code);
        setLinks(l => l + 1);
      } 
    } catch {
      setError('Server cannot be connected. Is Springboot working?');
    }
    setLoading(false);
  };

  const doCopy = () => {
    
    navigator.clipboard.writeText(result);
    setCopied(true); setCopies(c => c + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const fillDemo = (d) => {
    setLongUrl(d.long); 
    setAlias(d.alias);
    setResult(''); 
    setError('');
    window.scrollTo({ top: 0,behavior : 'smooth' });
  };
  const fetchStats =async()=>{
    setStatsError(''); setStatsData(null);
    if(!statsCode){setStatsError('Please enter a short code!'); return;}
    setStatsLoading(true);
    try{
      const res=await fetch(`https://ziplink-backend-tcqk.onrender.com/stats/${statsCode}`);
      const data=await res.text();
      if(data === 'URL not found!'){setStatsError('No URL found for this code!');}
      else{
        const lines=data.split('\n');
        setStatsData({
          code: lines[0]?.split(': ')[1],
          url: lines[1]?.split(': ')[1],
          clicks: lines[2]?.split(': ')[1],
          expiry: lines[3]?.split(': ')[1]?.split('T')[0],
        });
      }
    }catch{
      setStatsError('Server is unable to connect!');
    }
    setStatsLoading(false);
  };

  return (
    <>
      <style>{globalCSS}</style>
      {/* NAVBAR */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.95)', borderBottom:`1.5px solid ${C.gray300}`, padding:'0.75rem 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(8px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:30, height:30, background:C.purple, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>✂️</div>
          <span style={{ fontSize:16, fontWeight:700, color:C.black }}>ZipLink</span>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {[['Home','home'],['How it works','how'],['Demo','demo'],['Features','features'],['Stats','stats'],['About','about']].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })}
              style={{ padding:'6px 12px', border:'none', background:'transparent', color:C.gray500, fontSize:13, fontWeight:500, cursor:'pointer', borderRadius:8, transition:'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background=C.purpleLight; e.target.style.color=C.purple; }}
              onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color=C.gray500; }}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior:'smooth' })}
          style={{ padding:'7px 16px', background:C.purple, color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>
          Zip it free ↑
        </button>
      </nav>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1rem 4rem' }}>

      {/* HERO */}
      <div id="home" className="fade-up" style={{ textAlign:'center', padding:'3rem 1rem 1.75rem', position:'relative', overflow:'hidden' }}>

        {/* Background blobs */}
        <div style={{ position:'absolute', top:-60, left:-80, width:300, height:300, background:'radial-gradient(circle, #EEEDFE 0%, transparent 70%)', zIndex:0, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:-40, right:-80, width:250, height:250, background:'radial-gradient(circle, #E1F5EE 0%, transparent 70%)', zIndex:0, pointerEvents:'none' }}/>
        
        <div style={{ position:'relative', zIndex:1 }}>
          {/* Logo */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:'1.25rem' }}>
            <div style={{ width:52, height:52, background:C.purple, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 8px 24px rgba(83,74,183,0.3)' }}>✂️</div>
            <span style={{ fontSize:32, fontWeight:700, color:C.black, letterSpacing:'-1px' }}>ZipLink</span>
            <span style={{ fontSize:11, fontWeight:600, background:C.purpleLight, color:C.purpleDark, padding:'3px 10px', borderRadius:99 }}>FREE</span>
          </div>
        
          {/* Animated badge */}
          <div style={{ display:'inline-block', background:'linear-gradient(135deg,#EEEDFE,#E1F5EE)', color:C.purpleDark, fontSize:12, fontWeight:600, padding:'6px 16px', borderRadius:99, marginBottom:'1.25rem', border:`1px solid #AFA9EC` }}>
            ✨ Shorten · Share · Track — all free
          </div>
        
          {/* Main heading */}
          <h1 style={{ fontSize:38, fontWeight:700, color:C.black, lineHeight:1.15, marginBottom:'0.75rem', letterSpacing:'-1.5px' }}>
            Long URLs are<br/>
            <span style={{ color:C.purple }}>killing your reach.</span>
          </h1>
        
          {/* Subheading */}
          <p style={{ fontSize:15, color:C.gray500, lineHeight:1.8, marginBottom:'1.5rem', maxWidth:480, margin:'0 auto 1.5rem' }}>
            Turn ugly 200-character links into clean, memorable short URLs.<br/>
            Custom names · Click tracking · Auto-expiry in 7 days.
          </p>
        
          {/* Before/After visual */}
          <div style={{ background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:16, padding:'1.25rem', marginBottom:'1.75rem', textAlign:'left' }}>
            <div style={{ fontSize:11, color:C.gray500, fontWeight:600, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>See the difference</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div>
                <div style={{ fontSize:10, color:'#A32D2D', fontWeight:600, marginBottom:4 }}>❌ BEFORE — ugly, untrustworthy</div>
                <div style={{ fontFamily:'monospace', fontSize:11, background:'#fff5f5', border:`1px solid #F09595`, borderRadius:8, padding:'8px 12px', color:'#A32D2D', wordBreak:'break-all', lineHeight:1.6 }}>
                  https://amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_1?crid=2WVQK&keywords=iphone+15&sprefix=iphone%2Caps%2C234&sr=8-1&linkCode=sl1
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ flex:1, height:1, background:C.gray300 }}/>
                <span style={{ fontSize:18 }}>⬇</span>
                <div style={{ flex:1, height:1, background:C.gray300 }}/>
              </div>
              <div>
                <div style={{ fontSize:10, color:C.teal, fontWeight:600, marginBottom:4 }}>✅ AFTER — clean, professional, trackable</div>
                <div style={{ fontFamily:'monospace', fontSize:14, background:C.tealLight, border:`1px solid ${C.tealBorder}`, borderRadius:8, padding:'8px 12px', color:C.tealDark, fontWeight:700 }}>
                  ziplink.com/iphone15
                </div>
              </div>
            </div>
          </div>
        
          {/* CTA buttons */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior:'smooth' })}
              style={{ padding:'13px 28px', background:C.purple, color:'white', border:'none', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 16px rgba(83,74,183,0.3)' }}>
              ✂ Zip your first link — free
            </button>
            <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior:'smooth' })}
              style={{ padding:'13px 24px', background:'white', color:C.purple, border:`1.5px solid ${C.purple}`, borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer' }}>
              ▶ See live demo
            </button>
          </div>
        </div>
        </div>

        {/* MAIN CARD */}
        <div className="fade-up-2" style={{ background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:16, padding:'1.5rem', marginBottom:'1.25rem', boxShadow:'0 4px 24px rgba(83,74,183,0.07)' }}>
          <input className="url-input" value={longUrl} onChange={e=>setLongUrl(e.target.value)} placeholder="Paste your long URL here — e.g. https://amazon.in/product/xyz..." />
          <div className="alias-wrap">
            <span className="alias-pre">ziplink.com/</span>
            <input className="alias-field" value={alias} onChange={e=>setAlias(e.target.value)} placeholder="custom-name (optional)" />
          </div>
          <button className="zip-btn" onClick={doZip} disabled={loading}>
            {loading ? <><span className="spin">↻</span> Zipping...</> : <>✂ Zip it!</>}
          </button>

          {result && (
            <div className="result-slide" style={{ background:C.tealLight, border:`1.5px solid ${C.tealBorder}`, borderRadius:10, padding:'1rem', marginTop:'1rem' }}>
              <div style={{ fontSize:11, color:C.teal, fontWeight:600, marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>🎉 Your short URL is ready!</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                <div style={{ fontSize:15, color:C.tealDark, fontWeight:600, wordBreak:'break-all' }}>{result}</div>
                <button className="copy-btn" onClick={doCopy}>{copied ? '✓ Copied!' : '⧉ Copy'}</button>
              </div>
            </div>
          )}
          {error && (
            <div style={{ background:C.redLight, border:`1.5px solid ${C.redBorder}`, borderRadius:10, padding:'0.75rem 1rem', marginTop:'0.75rem', fontSize:13, color:C.red }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="fade-up-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:'2rem' }}>
          {[['🔗', links, 'Links zipped'], ['📋', copies, 'Times copied'], ['⏱', '7d', 'Link lifetime']].map(([ic,n,l]) => (
            <div key={l} className="stat-card">
              <div style={{ fontSize:20, marginBottom:4 }}>{ic}</div>
              <div style={{ fontSize:24, fontWeight:700, color:C.black }}>{n}</div>
              <div style={{ fontSize:11, color:C.gray500, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        <hr style={{ border:'none', borderTop:`1.5px solid ${C.gray200}`, marginBottom:'2rem' }}/>

        {/* HOW IT WORKS */}
        <div id="how" className="fade-up-4">
          <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'1rem', textAlign:'center' }}>How it works</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:'2rem' }}>
            {[['1','🖇','Paste your URL','Copy any long link and paste it above'],['2','⚡','Zip it','Click Zip it! and get a clean link instantly'],['3','📤','Share anywhere','WhatsApp, Instagram, email — works everywhere']].map(([n,ic,t,d])=>(
              <div key={n} className="step-card">
                <div style={{ width:28, height:28, background:C.purpleLight, color:C.purple, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, marginBottom:8 }}>{n}</div>
                <div style={{ fontSize:18, marginBottom:6 }}>{ic}</div>
                <div style={{ fontSize:13, fontWeight:600, color:C.black, marginBottom:3 }}>{t}</div>
                <div style={{ fontSize:12, color:C.gray500, lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>

          <hr style={{ border:'none', borderTop:`1.5px solid ${C.gray200}`, marginBottom:'2rem' }}/>

          {/* LIVE DEMO */}
          <div id="demo">
            <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'1rem', textAlign:'center' }}>▶ Live demo</h2>
            <div style={{ background:C.gray100, border:`1.5px solid ${C.gray300}`, borderRadius:16, padding:'1.25rem', marginBottom:'2rem' }}>
              <div style={{ display:'flex', gap:6, marginBottom:'1rem' }}>
                {DEMOS.map((d,i) => (
                  <button key={i} className={`demo-tab${activeTab===i?' active':''}`} onClick={()=>setTab(i)}>{d.label}</button>
                ))}
              </div>
              <div style={{ fontFamily:'monospace', fontSize:12, background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:8, padding:'10px 12px', color:C.gray500, marginBottom:8, wordBreak:'break-all', lineHeight:1.6 }}>
                {DEMOS[activeTab].long}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, margin:'8px 0' }}>
                <div style={{ flex:1, height:1, background:C.gray300 }}/>
                <span style={{ fontSize:18 }}>⬇</span>
                <div style={{ flex:1, height:1, background:C.gray300 }}/>
              </div>
              <div style={{ fontFamily:'monospace', fontSize:13, background:C.purpleLight, border:`1.5px solid #AFA9EC`, borderRadius:8, padding:'10px 12px', color:C.purpleDark, fontWeight:600 }}>
                {DEMOS[activeTab].short}
              </div>
              <div style={{ fontSize:12, color:C.gray500, marginTop:8, lineHeight:1.5 }}>{DEMOS[activeTab].desc}</div>
              <button onClick={()=>fillDemo(DEMOS[activeTab])} style={{ marginTop:10, padding:'7px 16px', border:`1.5px solid ${C.purple}`, borderRadius:8, background:'transparent', color:C.purple, fontSize:12, fontWeight:500, cursor:'pointer' }}>
                Try this example ↗
              </button>
            </div>
  
            <hr style={{ border:'none', borderTop:`1.5px solid ${C.gray200}`, marginBottom:'2rem' }}/>
          </div>
          {/* FEATURES */}
          <div id="features">
            <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'1rem', textAlign:'center' }}>Features</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
              {FEATS.map(f => (
                <div key={f.title} className="feat-card">
                  <span style={{ fontSize:22 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.black, marginBottom:2 }}>{f.title}</div>
                    <div style={{ fontSize:12, color:C.gray500, lineHeight:1.4 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="stats">
            <hr style={{ border:'none', borderTop:`1.5px solid ${C.gray200}`, marginBottom:'2rem' }}/>
            <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'0.5rem', textAlign:'center' }}>📊 Check your link stats</h2>
            <p style={{ fontSize:13, color:C.gray500, textAlign:'center', marginBottom:'1.25rem' }}>Enter your short code to see how many people clicked your link</p>
            
            <div style={{ background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:16, padding:'1.5rem', marginBottom:'2rem' }}>
              <div style={{ display:'flex', gap:8, marginBottom:'1rem' }}>
                <div style={{ flex:1, display:'flex', alignItems:'center', border:`1.5px solid ${C.gray300}`, borderRadius:10, overflow:'hidden' }}>
                  <span style={{ padding:'10px 12px', background:C.gray200, color:C.gray500, fontSize:13, whiteSpace:'nowrap' }}>ziplink.com/</span>
                  <input
                    style={{ flex:1, padding:'10px 12px', border:'none', fontSize:13, background:'white', color:C.black, fontFamily:'Inter, sans-serif' }}
                    value={statsCode}
                    onChange={e => setStatsCode(e.target.value)}
                    placeholder="your-short-code"
                    onKeyDown={e => e.key === 'Enter' && fetchStats()}
                  />
                </div>
                <button onClick={fetchStats} disabled={statsLoading}
                  style={{ padding:'10px 20px', background:C.purple, color:'white', border:'none', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
                  {statsLoading ? '⏳' : '🔍 Check'}
                </button>
              </div>
            
              {statsError && (
                <div style={{ background:C.redLight, border:`1.5px solid ${C.redBorder}`, borderRadius:10, padding:'0.75rem 1rem', fontSize:13, color:C.red }}>
                  ⚠ {statsError}
                </div>
              )}
            
              {statsData && (
                <div style={{ background:C.tealLight, border:`1.5px solid ${C.tealBorder}`, borderRadius:12, padding:'1.25rem' }}>
                  <div style={{ fontSize:12, color:C.teal, fontWeight:600, marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>📊 Link statistics</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:'1rem' }}>
                    <div style={{ background:'white', borderRadius:10, padding:'0.875rem', border:`1px solid ${C.tealBorder}` }}>
                      <div style={{ fontSize:11, color:C.gray500, marginBottom:4 }}>SHORT CODE</div>
                      <div style={{ fontSize:15, fontWeight:700, color:C.black }}>/{statsData.code}</div>
                    </div>
                    <div style={{ background:'white', borderRadius:10, padding:'0.875rem', border:`1px solid ${C.tealBorder}` }}>
                      <div style={{ fontSize:11, color:C.gray500, marginBottom:4 }}>TOTAL CLICKS</div>
                      <div style={{ fontSize:28, fontWeight:700, color:C.purple }}>{statsData.clicks}</div>
                    </div>
                  </div>
                  <div style={{ background:'white', borderRadius:10, padding:'0.875rem', border:`1px solid ${C.tealBorder}`, marginBottom:10 }}>
                    <div style={{ fontSize:11, color:C.gray500, marginBottom:4 }}>ORIGINAL URL</div>
                    <div style={{ fontSize:13, color:C.tealDark, wordBreak:'break-all', fontWeight:500 }}>{statsData.url}</div>
                  </div>
                  <div style={{ background:'white', borderRadius:10, padding:'0.875rem', border:`1px solid ${C.tealBorder}` }}>
                    <div style={{ fontSize:11, color:C.gray500, marginBottom:4 }}>EXPIRES ON</div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.black }}>📅 {statsData.expiry}</div>
                  </div>
                </div>
              )}
            </div>
            </div>
          <div id="about">
            {/* PITCH SECTION */}
            <hr style={{ border:'none', borderTop:`1.5px solid ${C.gray200}`, marginBottom:'2rem', marginTop:'2rem' }}/>
            
            {/* PROBLEM */}
            <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
              <span style={{ fontSize:11, fontWeight:600, background:'#FCEBEB', color:'#A32D2D', padding:'4px 12px', borderRadius:99, letterSpacing:'0.06em' }}>THE PROBLEM</span>
              <h2 style={{ fontSize:22, fontWeight:700, color:C.black, margin:'1rem 0 0.75rem', lineHeight:1.3 }}>
                Long URLs are <span style={{ color:'#A32D2D' }}>killing</span> your reach
              </h2>
              <p style={{ fontSize:14, color:C.gray500, lineHeight:1.8, maxWidth:480, margin:'0 auto' }}>
                You spend hours creating content — but when you share a 200-character link on WhatsApp or Instagram, people don't click it. It looks spammy, breaks in messages, and kills trust instantly.
              </p>
            </div>
            
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:'2.5rem' }}>
              {[
                ['😤', 'Links look spammy', 'Long URLs with random characters make people distrust your link'],
                ['💔', 'Links break in chats', 'WhatsApp and SMS cut off long URLs — your link stops working'],
                ['📉', 'Zero tracking', 'You have no idea if anyone even clicked your link'],
              ].map(([ic,t,d]) => (
                <div key={t} style={{ background:'#fff5f5', border:'1.5px solid #F09595', borderRadius:14, padding:'1rem', textAlign:'center' }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{ic}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#A32D2D', marginBottom:4 }}>{t}</div>
                  <div style={{ fontSize:12, color:C.gray500, lineHeight:1.5 }}>{d}</div>
                </div>
              ))}
            </div>
            
            {/* SOLUTION */}
            <div style={{ background:C.purpleLight, border:`1.5px solid #AFA9EC`, borderRadius:16, padding:'1.5rem', marginBottom:'2.5rem', textAlign:'center' }}>
              <span style={{ fontSize:11, fontWeight:600, background:C.purple, color:'white', padding:'4px 12px', borderRadius:99, letterSpacing:'0.06em' }}>THE SOLUTION</span>
              <h2 style={{ fontSize:22, fontWeight:700, color:C.purpleDark, margin:'1rem 0 0.75rem', lineHeight:1.3 }}>
                ZipLink makes your links <span style={{ color:C.purple }}>work for you</span>
              </h2>
              <p style={{ fontSize:14, color:C.purpleDark, lineHeight:1.8, maxWidth:480, margin:'0 auto 1.25rem' }}>
                We built ZipLink so that anyone — a student, a small business owner, a content creator — can share links that look professional, track clicks, and never break.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, textAlign:'left' }}>
                {[
                  ['✅', 'Clean short links', 'ziplink.com/yourname — memorable and professional'],
                  ['✅', 'Real-time analytics', 'See exactly how many people clicked and when'],
                  ['✅', 'Custom branding', 'Choose your own alias — not random gibberish'],
                  ['✅', 'Auto expiry', 'Links auto-delete in 7 days — safe and private'],
                ].map(([ic,t,d]) => (
                  <div key={t} style={{ background:'white', borderRadius:10, padding:'0.75rem', border:`1px solid #AFA9EC` }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.purpleDark, marginBottom:2 }}>{ic} {t}</div>
                    <div style={{ fontSize:12, color:C.gray500, lineHeight:1.4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* WHO IS IT FOR */}
            <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'1rem', textAlign:'center' }}>Who is ZipLink for?</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:'2.5rem' }}>
              {[
                ['🎓', 'Students', 'Share assignment links, notes, and resources cleanly in group chats'],
                ['🛍️', 'Small businesses', 'Share product links on WhatsApp without looking spammy'],
                ['🎨', 'Content creators', 'Put one clean link in your Instagram bio that tracks clicks'],
                ['💼', 'Professionals', 'Share portfolio or GitHub links in resumes and interviews'],
              ].map(([ic,t,d]) => (
                <div key={t} style={{ background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:14, padding:'1rem', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <span style={{ fontSize:28, flexShrink:0 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.black, marginBottom:3 }}>{t}</div>
                    <div style={{ fontSize:12, color:C.gray500, lineHeight:1.5 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* IMPACT NUMBERS */}
            <div style={{ background:`linear-gradient(135deg, ${C.purple}, ${C.purpleDark})`, borderRadius:16, padding:'1.5rem', marginBottom:'2.5rem', textAlign:'center' }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:'white', marginBottom:'1.25rem' }}>ZipLink by the numbers</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[['10x','More clicks on short links vs long links'],['7 sec','Time saved per link shared'],['100%','Free — no hidden charges']].map(([n,l]) => (
                  <div key={l} style={{ background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'1rem' }}>
                    <div style={{ fontSize:26, fontWeight:700, color:'white' }}>{n}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.75)', marginTop:4, lineHeight:1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* TESTIMONIALS */}
            <h2 style={{ fontSize:20, fontWeight:700, color:C.black, marginBottom:'1rem', textAlign:'center' }}>What people say</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(1,1fr)', gap:12, marginBottom:'2.5rem' }}>
              {[
                ['Priya S.', 'Content Creator', 'I used to lose followers because my links looked broken. ZipLink changed everything — my click rate went up 3x in a week!', 'PS'],
                ['Rahul M.', 'Small Business Owner', 'I share my product catalogue on WhatsApp. Before ZipLink, nobody clicked. Now I get 40+ clicks per day on my short link.', 'RM'],
                ['Ananya K.', 'Engineering Student', 'I put my GitHub link in my resume as ziplink.com/myprojects — the interviewer actually mentioned how clean it looked!', 'AK'],
              ].map(([name,role,quote,initials]) => (
                <div key={name} style={{ background:'white', border:`1.5px solid ${C.gray300}`, borderRadius:14, padding:'1.25rem', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', background:C.purpleLight, color:C.purple, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, flexShrink:0 }}>{initials}</div>
                  <div>
                    <div style={{ fontSize:13, color:C.gray700, lineHeight:1.6, marginBottom:8, fontStyle:'italic' }}>"{quote}"</div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.black }}>{name}</div>
                    <div style={{ fontSize:11, color:C.gray500 }}>{role}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* FINAL CTA */}
            <div style={{ background:C.tealLight, border:`1.5px solid ${C.tealBorder}`, borderRadius:16, padding:'2rem', textAlign:'center', marginBottom:'2rem' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>🚀</div>
              <h2 style={{ fontSize:22, fontWeight:700, color:C.tealDark, marginBottom:'0.75rem' }}>Ready to zip your first link?</h2>
              <p style={{ fontSize:14, color:C.teal, marginBottom:'1.25rem', lineHeight:1.6 }}>Free forever. No signup needed. Just paste and zip.</p>
              <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} style={{ padding:'12px 28px', background:C.teal, color:'white', border:'none', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                Try ZipLink now ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}