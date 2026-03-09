import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';

export function ConfigTab() {
  const { state, dispatch } = useAppContext();
  const [localConfig, setLocalConfig] = useState(state.config);

  const handleSave = () => {
    dispatch({ type: "SET_CONFIG", payload: localConfig });
    // Push a log for transparency
    dispatch({ type: "ADD_LOG", payload: { type: "Info", message: "Configuration updated successfully." }});
  };

  const updateSmartFixer = (key, val) => {
    setLocalConfig(prev => ({
      ...prev,
      smartFixer: {
        ...prev.smartFixer,
        [key]: parseFloat(val) || 0
      }
    }));
  };

  return (
    <div className="p-6 h-[calc(100vh-12rem)] overflow-auto bg-white rounded shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">Smart Fixer Configuration</h2>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm transition"
        >
          Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Core Geometry Thresholds */}
        <div className="bg-slate-50 p-4 rounded border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-3">Geometry Thresholds (mm)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Micro-Pipe Deletion</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.microPipeThreshold} onChange={(e) => updateSmartFixer('microPipeThreshold', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Micro-Fitting Warning</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.microFittingThreshold} onChange={(e) => updateSmartFixer('microFittingThreshold', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Off-Axis Snapping</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.diagonalMinorThreshold} onChange={(e) => updateSmartFixer('diagonalMinorThreshold', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
          </div>
        </div>

        {/* Gap & Overlap Logic */}
        <div className="bg-slate-50 p-4 rounded border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-3">Gap & Overlap Limits (mm)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Silent Snap Micro-Gap</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.negligibleGap} onChange={(e) => updateSmartFixer('negligibleGap', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Auto-Fill Pipe Max Gap</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.autoFillMaxGap} onChange={(e) => updateSmartFixer('autoFillMaxGap', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Auto-Trim Max Overlap</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.autoTrimMaxOverlap} onChange={(e) => updateSmartFixer('autoTrimMaxOverlap', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Gap Review Warning</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.reviewGapMax} onChange={(e) => updateSmartFixer('reviewGapMax', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
          </div>
        </div>

        {/* Topological Constraints */}
        <div className="bg-slate-50 p-4 rounded border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-3">Topological Rules</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Route Closure Warning (mm)</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.closureWarningThreshold} onChange={(e) => updateSmartFixer('closureWarningThreshold', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Route Closure Error (mm)</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.closureErrorThreshold} onChange={(e) => updateSmartFixer('closureErrorThreshold', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">OLET Max Branch Ratio</label>
              <input type="number" step="0.01" value={localConfig.smartFixer.oletMaxRatioError} onChange={(e) => updateSmartFixer('oletMaxRatioError', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
             <div className="flex justify-between items-center">
              <label className="text-sm text-slate-600">Connection Tolerance (mm)</label>
              <input type="number" step="0.1" value={localConfig.smartFixer.connectionTolerance} onChange={(e) => updateSmartFixer('connectionTolerance', e.target.value)} className="w-24 p-1 border rounded text-right text-sm font-mono" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
