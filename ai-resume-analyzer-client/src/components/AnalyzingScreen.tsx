"use client";

import { useEffect, useState } from "react";

export default function AnalyzingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(iv); return 90; }
        return p + Math.random() * 3;
      });
    }, 120);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <div className="w-full max-w-md text-center px-8">

        {/* Robot */}
        <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 animate-pulse" style={{borderColor:'#6366f1'}}/>
          <div className="absolute rounded-full border border-cyan-400 opacity-40" style={{inset:'-12px',animation:'pulse 2s ease-in-out infinite 0.5s'}}/>

          {/* Orbiting dots */}
          {['#6366f1','#06b6d4','#10b981'].map((color, i) => (
            <div key={i} className="absolute w-2.5 h-2.5 rounded-full" style={{
              background: color,
              animation: `orbit${i+1} 2.4s linear infinite`,
            }}/>
          ))}

          <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center z-10" style={{animation:'rgb-border 4s linear infinite'}}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="10" y="16" width="28" height="22" rx="5" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5"/>
              <rect x="16" y="22" width="5" height="5" rx="1.5" fill="#06b6d4"/>
              <rect x="27" y="22" width="5" height="5" rx="1.5" fill="#06b6d4"/>
              <rect x="19" y="31" width="10" height="2.5" rx="1.25" fill="#10b981"/>
              <rect x="21" y="10" width="6" height="6" rx="3" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5"/>
              <line x1="24" y1="16" x2="24" y2="13" stroke="#6366f1" strokeWidth="1.5"/>
              <line x1="10" y1="24" x2="6" y2="26" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="38" y1="24" x2="42" y2="26" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="38" x2="16" y2="44" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="30" y1="38" x2="32" y2="44" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-medium text-gray-100 mb-1">Analyzing your resume</h2>
        <p className="text-sm text-gray-500 mb-8 animate-pulse">AI is reading every line carefully...</p>

        {/* Steps */}
        <div className="space-y-3 mb-8 text-left">
          {[
            { label: 'Parsing resume text', color: '#6366f1', delay: '0.2s' },
            { label: 'Extracting skills', color: '#06b6d4', delay: '1.2s' },
            { label: 'Calculating ATS score', color: '#10b981', delay: '2.4s' },
            { label: 'Generating suggestions', color: '#f59e0b', delay: '3.6s' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3" style={{animation:`fadeUp 0.4s ease ${step.delay} forwards`,opacity:0}}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background: step.color}}/>
              <span className="text-sm text-gray-400 flex-1">{step.label}</span>
              <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{background:`linear-gradient(90deg,${step.color},#06b6d4)`,width:'0%',animation:`fillBar 0.9s ease ${step.delay} forwards`}}/>
              </div>
            </div>
          ))}
        </div>

        {/* Main progress bar */}
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
          <div className="h-full rounded-full transition-all duration-150" style={{
            width: `${Math.round(progress)}%`,
            background: 'linear-gradient(90deg,#6366f1,#06b6d4,#10b981,#f59e0b)',
            backgroundSize: '300% 100%',
            animation: 'rgbFlow 2s linear infinite'
          }}/>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Overall progress</span>
          <span style={{color:'#6366f1'}}>{Math.round(progress)}%</span>
        </div>

      </div>

      <style>{`
        @keyframes orbit1{from{transform:rotate(0deg) translateX(54px) rotate(0deg)}to{transform:rotate(360deg) translateX(54px) rotate(-360deg)}}
        @keyframes orbit2{from{transform:rotate(120deg) translateX(54px) rotate(-120deg)}to{transform:rotate(480deg) translateX(54px) rotate(-480deg)}}
        @keyframes orbit3{from{transform:rotate(240deg) translateX(54px) rotate(-240deg)}to{transform:rotate(600deg) translateX(54px) rotate(-600deg)}}
        @keyframes fillBar{from{width:0%}to{width:100%}}
        @keyframes rgbFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}