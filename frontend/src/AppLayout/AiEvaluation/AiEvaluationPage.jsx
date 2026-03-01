import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAiEvaluation from '../../hooks/useAiEvaluation';
import EvaluationTabs from './components/EvaluationTabs';
import EvaluationDisplay from './components/EvaluationDisplay';

const MOCK_DATA = {
  1: { id: 1, submissionName: "WannaCry Network Patterns", summary: "Automated analysis confirms high-risk behavioral patterns consistent with ransomware. The sample demonstrates SMB exploitation (EternalBlue) and localized file encryption. High-confidence match for WannaCry family.", family: "Ransomware", threatLevel: "Critical", aiScorePercentage: "98%", date: "2024-02-13" },
  2: { id: 2, submissionName: "Emotet Payload Delivery", summary: "Investigation into VBA macros reveals multi-stage downloader behavior. The sample attempts to establish C2 communication with multiple known botnet IPs. Heuristics point to Emotet payload delivery mechanism.", family: "Trojan", threatLevel: "High", aiScorePercentage: "84%", date: "2024-02-10" },
  3: { id: 3, submissionName: "Stuxnet PLC Logic", summary: "Deep dive into industrial control logic shows highly specific Siemens S7-300 PLC targeting. The code exhibits sophisticated payload delivery and rootkit-like persistence on the target system. 100% match for known Stuxnet variants.", family: "Worm", threatLevel: "Critical", aiScorePercentage: "100%", date: "2024-01-25" },
  4: { id: 4, submissionName: "Cobalt Strike Beacon", summary: "Memory-resident beacon detected with standard Cobalt Strike configuration patterns. The sample exhibits typical heartbeating and DNS-based C2 communication. Moderate confidence match for Cobalt Strike v4.x beacon.", family: "APT", threatLevel: "Elevated", aiScorePercentage: "72%", date: "2024-02-15" },
};

function AiEvaluationPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from MOCK_DATA based on submissionId
    const timer = setTimeout(() => {
      if (submissionId && MOCK_DATA[submissionId]) {
        setEvaluation(MOCK_DATA[submissionId]);
      } else {
        setEvaluation(null);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-toxic border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Analyzing Neural Trace...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20 text-center">
        <h3 className="text-red-500 font-black uppercase tracking-widest mb-4">Submission Not Found</h3>
        <button 
          onClick={() => navigate('/submissions')}
          className="text-toxic hover:underline font-mono text-sm"
        >
          Return to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/submissions')}
          className="text-slate-500 hover:text-toxic transition-colors text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-6"
        >
          ← Back to Intelligence
        </button>
        <div className="flex flex-row justify-between items-end pb-6 border-b border-phantom">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
              <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">Neural Report</h3>
            </div>
            <p className="text-slate-400 text-sm font-mono">{evaluation.submissionName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-toxic animate-pulse shadow-[0_0_8px_#22C55E]"></div>
            <span className="text-[10px] text-toxic font-mono font-bold uppercase tracking-widest">Active Analysis</span>
          </div>
        </div>
      </div>

      <EvaluationTabs evaluation={evaluation} />
      <EvaluationDisplay evaluation={evaluation} />
    </div>
  );
}

export default AiEvaluationPage;