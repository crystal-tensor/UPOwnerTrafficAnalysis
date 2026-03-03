import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Search, Plus, Trash2, Globe, TrendingUp, Lightbulb } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { generateAIAnalysis } from './utils/mockAI';
import type { AIAnalysisReport, SuggestionItem } from './utils/mockAI';

// Types
type Platform = 'bilibili' | 'tiktok' | 'douyin' | 'xiaohongshu' | 'youtube';
type Language = 'zh' | 'en';

interface AnalysisData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  history: { date: string; views: number }[];
}

interface CompetitorData {
  url: string;
  data: AnalysisData;
}

interface AnalysisResult {
  target: {
    url: string;
    data: AnalysisData;
  };
  competitors: CompetitorData[];
  aiReport: AIAnalysisReport;
}

// Utils
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Mock Data Generator
const generateMockData = (platform: Platform): AnalysisData => {
  const baseViews = Math.floor(Math.random() * 100000) + 5000;
  return {
    views: baseViews,
    likes: Math.floor(baseViews * 0.1),
    comments: Math.floor(baseViews * 0.01),
    shares: Math.floor(baseViews * 0.005),
    engagementRate: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      views: Math.floor(baseViews * (0.8 + Math.random() * 0.4)),
    })),
  };
};

// Translations
const translations = {
  zh: {
    title: 'UP主流量分析工具',
    subtitle: '多平台视频数据深度分析与竞品对比',
    selectPlatform: '选择平台',
    targetUrl: '目标账号/视频链接',
    competitors: '竞品账号/视频链接',
    addCompetitor: '添加竞品',
    analyze: '开始分析',
    analyzing: '分析中...',
    results: '分析结果',
    views: '播放量',
    likes: '点赞数',
    comments: '评论数',
    shares: '分享数',
    engagement: '互动率',
    trend: '流量趋势',
    aiAnalysis: 'AI 智能分析',
    overallScore: '综合评分',
    summary: '分析总结',
    accountDiagnosis: '账号诊断',
    contentStrategy: '内容策略',
    competitorGap: '竞品差距',
    actionPlan: '行动计划',
    priority: '优先级',
    high: '高',
    medium: '中',
    low: '低',
    placeholder: '请输入链接...',
    remove: '移除',
    targetLabel: '目标账号',
    compLabel: '竞品',
    platforms: {
      bilibili: '哔哩哔哩',
      tiktok: 'TikTok',
      douyin: '抖音',
      xiaohongshu: '小红书',
      youtube: 'YouTube'
    }
  },
  en: {
    title: 'Creator Traffic Analysis',
    subtitle: 'Deep analysis of video data and competitor comparison',
    selectPlatform: 'Select Platform',
    targetUrl: 'Target Account/Video URL',
    competitors: 'Competitor Accounts/Video URLs',
    addCompetitor: 'Add Competitor',
    analyze: 'Analyze',
    analyzing: 'Analyzing...',
    results: 'Analysis Results',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    shares: 'Shares',
    engagement: 'Engagement Rate',
    trend: 'Traffic Trend',
    aiAnalysis: 'AI Analysis',
    overallScore: 'Overall Score',
    summary: 'Summary',
    accountDiagnosis: 'Account Diagnosis',
    contentStrategy: 'Content Strategy',
    competitorGap: 'Competitor Gap',
    actionPlan: 'Action Plan',
    priority: 'Priority',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    placeholder: 'Enter URL...',
    remove: 'Remove',
    targetLabel: 'Target',
    compLabel: 'Comp',
    platforms: {
      bilibili: 'Bilibili',
      tiktok: 'TikTok',
      douyin: 'Douyin',
      xiaohongshu: 'Xiaohongshu',
      youtube: 'YouTube'
    }
  }
};

function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [platform, setPlatform] = useState<Platform>('bilibili');
  const [targetUrl, setTargetUrl] = useState('');
  const [competitors, setCompetitors] = useState<string[]>(['']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const t = translations[lang];

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, '']);
  };

  const handleRemoveCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = value;
    setCompetitors(newCompetitors);
  };

  const handleAnalyze = () => {
    if (!targetUrl) return;
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        target: {
          url: targetUrl,
          data: generateMockData(platform)
        },
        competitors: competitors.filter(c => c).map(url => ({
          url,
          data: generateMockData(platform)
        })),
        aiReport: generateAIAnalysis(platform, lang)
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const platforms: { id: Platform; name: string; color: string }[] = [
    { id: 'bilibili', name: t.platforms.bilibili, color: 'bg-pink-400' },
    { id: 'tiktok', name: t.platforms.tiktok, color: 'bg-black' },
    { id: 'douyin', name: t.platforms.douyin, color: 'bg-black' },
    { id: 'xiaohongshu', name: t.platforms.xiaohongshu, color: 'bg-red-500' },
    { id: 'youtube', name: t.platforms.youtube, color: 'bg-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-500 mt-2">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>{lang === 'zh' ? 'English' : '中文'}</span>
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">{t.selectPlatform}</label>
            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                    platform === p.id
                      ? `${p.color} text-white shadow-md transform scale-105`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.targetUrl}</label>
            <div className="relative">
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder={t.placeholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Competitors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.competitors}</label>
            <div className="space-y-3">
              {competitors.map((url, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleCompetitorChange(index, e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                  {competitors.length > 1 && (
                    <button
                      onClick={() => handleRemoveCompetitor(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={t.remove}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddCompetitor}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t.addCompetitor}
              </button>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !targetUrl}
            className={cn(
              "w-full py-4 rounded-lg font-bold text-white text-lg shadow-md transition-all",
              isAnalyzing || !targetUrl
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5"
            )}
          >
            {isAnalyzing ? t.analyzing : t.analyze}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-fade-in">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm mb-1">{t.views}</div>
                <div className="text-2xl font-bold text-gray-900">{result.target.data.views.toLocaleString()}</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12%
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm mb-1">{t.likes}</div>
                <div className="text-2xl font-bold text-gray-900">{result.target.data.likes.toLocaleString()}</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +8%
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm mb-1">{t.engagement}</div>
                <div className="text-2xl font-bold text-gray-900">{result.target.data.engagementRate}%</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +2.5%
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm mb-1">{t.shares}</div>
                <div className="text-2xl font-bold text-gray-900">{result.target.data.shares.toLocaleString()}</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +5%
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t.trend}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.target.data.history}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" name={t.views} stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">VS {t.competitors} ({t.views})</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: t.targetLabel, views: result.target.data.views },
                      ...result.competitors.map((c, i) => ({
                        name: `${t.compLabel} ${i + 1}`,
                        views: c.data.views
                      }))
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" name={t.views} fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* AI Analysis Report */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  {t.aiAnalysis}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">{t.overallScore}:</span>
                  <span className={`text-2xl font-bold ${
                    result.aiReport.overallScore >= 80 ? 'text-green-600' : 
                    result.aiReport.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.aiReport.overallScore}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">{t.summary}</h4>
                <p className="text-blue-700 leading-relaxed">{result.aiReport.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Account Diagnosis */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b flex items-center justify-between">
                    {t.accountDiagnosis}
                  </h4>
                  <div className="space-y-4">
                    {result.aiReport.accountDiagnosis.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.priority === 'High' ? 'bg-red-100 text-red-600' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {item.priority === 'High' ? t.high : item.priority === 'Medium' ? t.medium : t.low}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Strategy */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b flex items-center justify-between">
                    {t.contentStrategy}
                  </h4>
                  <div className="space-y-4">
                    {result.aiReport.contentStrategy.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.priority === 'High' ? 'bg-red-100 text-red-600' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {item.priority === 'High' ? t.high : item.priority === 'Medium' ? t.medium : t.low}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Competitor Gap */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">
                    {t.competitorGap}
                  </h4>
                  <div className="space-y-4">
                    {result.aiReport.competitorGap.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                         <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.priority === 'High' ? 'bg-red-100 text-red-600' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {item.priority === 'High' ? t.high : item.priority === 'Medium' ? t.medium : t.low}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Plan */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">
                    {t.actionPlan}
                  </h4>
                  <ul className="space-y-3">
                    {result.aiReport.actionPlan.map((action, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
