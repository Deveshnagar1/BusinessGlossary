import React from 'react';
import { X, Share2 } from 'lucide-react';

interface DataLineageModalProps {
  open: boolean;
  onClose: () => void;
  term: string;
  related: string[];
}

export const DataLineageModal: React.FC<DataLineageModalProps> = ({ open, onClose, term, related }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-400" />
          Data Lineage for <span className="text-blue-900">{term}</span>
        </h2>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-100 border-2 border-blue-400 px-4 py-2 text-blue-800 font-semibold mb-2">
              {term}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {related.map((rel, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-blue-200" />
                  <div className="rounded-full bg-blue-50 border border-blue-300 px-3 py-1 text-blue-700 text-xs font-medium">
                    {rel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-500 text-center">
          (Mock lineage visualization. For demo purposes only.)
        </div>
      </div>
    </div>
  );
};
