import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEvaluation from '../hooks/useEvaluation';
import EvaluationTabs from './components/EvaluationTabs';
import EvaluationDisplay from './components/EvaluationDisplay';

function AiEvaluationPage() {
  const { submissionId } = useParams();
  const { evaluation, loading, error, loadEvaluation } = useEvaluation();

  useEffect(() => {
    if (submissionId) {
      loadEvaluation(submissionId);
    }
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-toxic border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-mono text-sm">Analyzing submission...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-500 font-mono text-sm mb-4">Error: {error}</p>
            <button className="bg-toxic text-void font-black px-6 py-3 rounded-sm uppercase tracking-widest text-[10px] hover:bg-toxic/80 transition-colors">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
      <div className="flex flex-row justify-between items-end mb-10 pb-6 border-b border-phantom">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
            <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">AI Evaluation</h3>
          </div>
          {evaluation && (
            <p className="text-slate-400 text-sm">{evaluation.submissionName}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-toxic animate-pulse shadow-[0_0_8px_#22C55E]"></div>
          <span className="text-[10px] text-toxic font-mono font-bold uppercase tracking-widest">Live Analysis</span>
        </div>
      </div>

      {evaluation && (
        <>
          <EvaluationTabs evaluation={evaluation} />
          <EvaluationDisplay evaluation={evaluation} />
        </>
      )}
    </div>
  );
}

export default AiEvaluationPage;