import React, { useMemo } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { SKILLS } from '../constants';
import { TooltipPayloadItem, SkillChartData } from '../types';

// ==========================================
// SkillsChart - IMPROVED VERSION
// Features:
// - useMemo for performance
// - Proper TypeScript types
// - Accessibility (ARIA labels)
// - Empty state handling
// - Category filtering support
// ==========================================

interface SkillsChartProps {
  category?: 'Data' | 'QA' | 'Tools' | 'Soft Skill' | 'all';
}

const SkillsChart: React.FC<SkillsChartProps> = ({ category = 'all' }) => {
  // Memoize data transformation
  const data = useMemo((): SkillChartData[] => {
    const filtered = category === 'all' 
      ? SKILLS 
      : SKILLS.filter(s => s.category === category);
    
    return filtered.map(s => ({
      subject: s.name,
      A: s.level,
      fullMark: 100,
    }));
  }, [category]);

  // Memoize color based on category
  const chartColor = useMemo(() => {
    const colors: Record<string, string> = {
      'Data': '#64ffda',
      'QA': '#ff6b6b',
      'Tools': '#ffd93d',
      'Soft Skill': '#a78bfa',
      'all': '#64ffda',
    };
    return colors[category] || '#64ffda';
  }, [category]);

  // Custom tooltip with proper typing
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) => {
    if (active && payload && payload.length > 0) {
      const item = payload[0];
      return (
        <div className="bg-[#112240] px-3 py-2 rounded border border-[#64ffda] shadow-xl">
          <p className="mono text-[#64ffda] text-xs font-semibold">{item.payload.subject}</p>
          <p className="text-[#8892b0] text-[10px] mt-1">
            Proficiency: <span className="text-[#64ffda]">{item.payload.A}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div 
        className="h-[400px] w-full bg-[#112240] rounded-lg p-4 border border-[#233554] flex items-center justify-center"
        role="img"
        aria-label="No skills data available"
      >
        <div className="text-center">
          <i className="fas fa-chart-pie text-4xl text-[#233554] mb-3" aria-hidden="true"></i>
          <p className="text-[#8892b0] text-sm">No skills data available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-[400px] w-full bg-[#112240] rounded-lg p-4 border border-[#233554]"
      role="img"
      aria-label={`Skills radar chart showing ${category === 'all' ? 'all' : category} competencies`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#233554" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#8892b0', fontSize: 9 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke={chartColor}
            fill={chartColor}
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center mt-2 gap-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: chartColor }}
            aria-hidden="true"
          ></div>
          <span className="text-[10px] text-[#8892b0] mono">
            {category === 'all' ? 'All Skills' : `${category} Skills`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;
