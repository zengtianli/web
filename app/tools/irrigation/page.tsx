"use client"

import { useState } from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

// API 地址 - 部署后改为 Railway 地址
const API_BASE = process.env.NEXT_PUBLIC_IRRIGATION_API || 'http://localhost:8001'

interface DailyData {
  date: string
  irrigation: number
  drainage: number
}

interface ActiveCrop {
  name: string
  quota: number
  unit: string
}

interface ParameterPreview {
  start_date: string
  forecast_days: number
  warmup_days: number
  guarantee_rate: number
  mode: string
  active_crops: ActiveCrop[]
  total_single_crop: number
  total_double_crop: number
  total_dry_land: number
  current_period: string
  eva_ratio: number
  leakage: number
  rotation_batches: number
}

interface CalculateResult {
  success: boolean
  total_irrigation: number
  total_drainage: number
  daily_data: DailyData[]
  parameters: ParameterPreview
  message: string
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function IrrigationPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CalculateResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const [params, setParams] = useState({
    start_date: '2025/07/15',
    forecast_days: 16,
    guarantee_rate: 90,
    mode: 'both'
  })

  const handleCalculate = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`${API_BASE}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      
      const data = await res.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.message || '计算失败')
      }
    } catch (err) {
      setError(`连接失败: ${err instanceof Error ? err.message : '未知错误'}`)
    }
    
    setLoading(false)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
  }

  // 饼图数据：灌溉需水组成
  const pieData = result ? [
    { name: '单季稻', value: result.parameters.total_single_crop },
    { name: '双季稻', value: result.parameters.total_double_crop },
    { name: '旱地', value: result.parameters.total_dry_land },
  ] : []

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-7xl">
        <PageHeader 
          title="农田灌溉需水计算" 
          description="浙东河网平原农田灌溉需水量在线计算系统" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* 左侧：参数配置 */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">参数配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 起始日期 */}
              <div className="space-y-2">
                <Label htmlFor="start_date">起始日期</Label>
                <Input
                  id="start_date"
                  value={params.start_date}
                  onChange={(e) => setParams({...params, start_date: e.target.value})}
                  placeholder="YYYY/MM/DD"
                />
              </div>
              
              {/* 预测天数 */}
              <div className="space-y-2">
                <Label htmlFor="forecast_days">预测天数</Label>
                <Input
                  id="forecast_days"
                  type="number"
                  value={params.forecast_days}
                  onChange={(e) => setParams({...params, forecast_days: parseInt(e.target.value) || 16})}
                  min={1}
                  max={365}
                />
              </div>
              
              {/* 灌溉保证率 */}
              <div className="space-y-2">
                <Label>灌溉保证率</Label>
                <div className="flex gap-4">
                  {[50, 75, 90].map((rate) => (
                    <label key={rate} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="guarantee_rate"
                        checked={params.guarantee_rate === rate}
                        onChange={() => setParams({...params, guarantee_rate: rate})}
                        className="w-4 h-4"
                      />
                      <span>{rate}%</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 计算模式 */}
              <div className="space-y-2">
                <Label>计算模式</Label>
                <div className="space-y-2">
                  {[
                    { value: 'crop', label: '旱地作物' },
                    { value: 'irrigation', label: '水稻灌溉' },
                    { value: 'both', label: '综合模式' },
                  ].map((mode) => (
                    <label key={mode.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        checked={params.mode === mode.value}
                        onChange={() => setParams({...params, mode: mode.value})}
                        className="w-4 h-4"
                      />
                      <span>{mode.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 计算按钮 */}
              <Button 
                onClick={handleCalculate} 
                disabled={loading}
                className="w-full mt-4"
              >
                {loading ? '计算中...' : '开始计算'}
              </Button>
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 右侧：计算结果 */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* 总量统计 */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">总灌溉需水量</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatNumber(result.total_irrigation)} m³
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">总排水量</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatNumber(result.total_drainage)} m³
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* 趋势图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">灌溉需水量趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={result.daily_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value: number) => formatNumber(value) + ' m³'}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="irrigation" 
                          stroke="#3b82f6" 
                          name="灌溉需水(m³)"
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="drainage" 
                          stroke="#10b981" 
                          name="排水量(m³)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                {/* 面积分布饼图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">灌溉面积分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${formatNumber(value)} km²`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatNumber(value) + ' km²'} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                {/* 参数预览 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">计算参数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-muted-foreground">时间配置</div>
                        <div>起始: {result.parameters.start_date}</div>
                        <div>预测: {result.parameters.forecast_days} 天</div>
                        <div>预热: {result.parameters.warmup_days} 天</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">旱地作物</div>
                        <div>保证率: {result.parameters.guarantee_rate}%</div>
                        <div>有效作物: {
                          result.parameters.active_crops.length > 0 
                            ? result.parameters.active_crops.map(c => `${c.name}(${c.quota.toLocaleString()})`).join(', ')
                            : '无'
                        }</div>
                        <div>面积: {formatNumber(result.parameters.total_dry_land)} km²</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">水稻灌溉</div>
                        <div>生育期: {result.parameters.current_period}</div>
                        <div>蒸发系数: {result.parameters.eva_ratio}</div>
                        <div>渗漏: {result.parameters.leakage} mm/d</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 逐日数据表格 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">逐日计算结果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3">日期</th>
                            <th className="text-right py-2 px-3">灌溉需水 (m³)</th>
                            <th className="text-right py-2 px-3">排水量 (m³)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.daily_data.map((row, i) => (
                            <tr key={i} className="border-b hover:bg-muted/50">
                              <td className="py-2 px-3">{row.date}</td>
                              <td className="text-right py-2 px-3">{formatNumber(row.irrigation)}</td>
                              <td className="text-right py-2 px-3">{formatNumber(row.drainage)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center text-muted-foreground">
                  <div className="text-4xl mb-4">🌾</div>
                  <div>配置参数后点击"开始计算"</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
