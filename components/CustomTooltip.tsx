import React from 'react';
import { TrendingUp, TrendingDown, Minus, Instagram, Layers } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  data?: any[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    // Payload order depends on chart definition, usually 0 is Area (Views), 1 is Line (Posts)
    // We search by dataKey to be safe
    const viewsItem = payload.find(p => p.dataKey === 'views');
    const postsItem = payload.find(p => p.dataKey === 'posts');

    const currentViews = viewsItem ? viewsItem.value : 0;
    const currentPosts = postsItem ? postsItem.value : 0;

    const currentIndex = data?.findIndex(d => d.month === label) ?? -1;
    let diffViews = 0;
    let hasPrevious = false;

    if (currentIndex > 0 && data) {
      const previousViews = data[currentIndex - 1].views;
      if (previousViews > 0) {
        diffViews = currentViews - previousViews;
        hasPrevious = true;
      }
    }

    return (
      <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-lg min-w-[200px]">
        <p className="text-slate-500 text-sm font-bold mb-3 border-b border-slate-100 pb-1">{label}</p>
        
        {/* Views Section */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-indigo-100 p-1 rounded-md text-indigo-600">
              <Instagram size={14} />
            </div>
            <span className="text-xs text-slate-500 font-medium">Visualizações</span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-bold text-slate-800">
              {currentViews.toLocaleString('pt-BR')}
            </p>
            {hasPrevious && (
              <div className={`flex items-center text-xs font-bold ${diffViews >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {diffViews >= 0 ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                {diffViews >= 0 ? '+' : ''}{((diffViews / data![currentIndex - 1].views) * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-orange-100 p-1 rounded-md text-orange-600">
              <Layers size={14} />
            </div>
            <span className="text-xs text-slate-500 font-medium">Posts (Stories + Feed)</span>
          </div>
          <p className="text-xl font-bold text-slate-800">
            {currentPosts.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    );
  }

  return null;
};
