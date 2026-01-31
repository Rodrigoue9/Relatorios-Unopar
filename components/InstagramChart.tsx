import React from 'react';
import { 
  ComposedChart, // Changed from AreaChart
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Instagram, Eye, ArrowUpRight, Info } from 'lucide-react';
import { CustomTooltip } from './CustomTooltip';
import { MonthlyData } from '../types';

interface InstagramChartProps {
  name: string;
  handle: string;
  data: MonthlyData[];
  colorTheme: string;
}

export const InstagramChart: React.FC<InstagramChartProps> = ({ name, handle, data, colorTheme }) => {
  // Calculate totals
  const totalViews = data.reduce((acc, curr) => acc + curr.views, 0);
  const totalPosts = data.reduce((acc, curr) => acc + curr.posts, 0);
  
  // Calculate best month for views
  const bestMonth = [...data].sort((a, b) => b.views - a.views)[0];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorTheme} text-white shadow-lg`}>
            <Instagram size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{name}</h3>
            <p className="text-slate-400 text-sm font-medium">{handle}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Visualizações</p>
          <p className="text-xl font-bold text-slate-800">{totalViews.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-slate-50 rounded-lg p-2.5 mb-4 flex items-center gap-2 text-xs text-slate-600">
        <Info size={14} className="text-unopar-orange shrink-0" />
        <span>
          <strong>Posts:</strong> Soma de <span className="text-orange-600 font-semibold">Storys</span> com publicações do <span className="text-orange-600 font-semibold">Feed</span>.
        </span>
      </div>

      <div className="h-[280px] w-full -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorViews-${name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" className="text-indigo-500" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="currentColor" className="text-indigo-500" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              dy={10}
            />
            
            {/* Left Axis: Views */}
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6366f1', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />

            {/* Right Axis: Posts */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#f97316', fontSize: 11, fontWeight: 500 }}
            />

            <Tooltip content={<CustomTooltip data={data} />} />
            
            {/* Views Area */}
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="views" 
              name="Visualizações"
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#colorViews-${name})`} 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
            />

            {/* Posts Line */}
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="posts" 
              name="Posts + Stories"
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#f97316', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#f97316' }}
            />
            
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-3 border-t border-slate-50 flex justify-between items-center text-sm">
        <div className="flex items-center text-slate-500 gap-2">
          <div className="bg-green-100 p-1.5 rounded-full text-green-700">
            <ArrowUpRight size={14} />
          </div>
          <span>Melhor mês: <span className="font-semibold text-slate-700">{bestMonth.month}</span></span>
        </div>
        <div className="text-right">
           <span className="text-xs text-slate-400 block">Total Publicações</span>
           <span className="font-bold text-slate-700">{totalPosts}</span>
        </div>
      </div>
    </div>
  );
};
