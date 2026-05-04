import { useState } from 'react';
import { Plus, AlertTriangle, Clock as ClockIcon, Upload, FileText, Download, Trash2, FileDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

interface PatientDetailProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  patientId?: number;
}

export function PatientDetailModern({ onNavigate, onBack, patientId }: PatientDetailProps) {
  const [chartView, setChartView] = useState<'bp' | 'pulse' | 'temp' | 'oxygen' | 'glucose'>('bp');
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d');

  const patientData = {
    name: 'Van Test Non Survey',
    initials: 'VT',
    ward: 'B',
    bedNumber: '29',
    phone: '+65 9258 3691',
    dob: '17 Apr 2000',
    language: 'Chinese',
    loginPin: '4126',
    status: 'Monitoring'
  };

  const chartData = [
    { id: 1, time: '17 Apr 16:24', systolic: 100, diastolic: 90, pulse: 100, temperature: 36.5, oxygen: 98, glucose: 5.2 },
    { id: 2, time: '17 Apr 18:20', systolic: 108, diastolic: 86, pulse: 96, temperature: 36.7, oxygen: 97, glucose: 5.4 },
    { id: 3, time: '18 Apr 09:10', systolic: 112, diastolic: 82, pulse: 89, temperature: 36.6, oxygen: 98, glucose: 5.1 },
    { id: 4, time: '18 Apr 15:40', systolic: 118, diastolic: 84, pulse: 92, temperature: 36.8, oxygen: 99, glucose: 5.3 }
  ];

  const readings = [
    { time: '17 Apr 16:24', bp: '100/90', pulse: 100, position: 'Sitting', status: 'Monitor', note: 'This is first BP reading manual', pulseColor: 'text-amber-600' },
    { time: '17 Apr 18:20', bp: '108/86', pulse: 96, position: 'Sitting', status: 'Normal', note: 'Patient resting', pulseColor: 'text-emerald-600' },
    { time: '18 Apr 09:10', bp: '112/82', pulse: 89, position: 'Sitting', status: 'Normal', note: 'Morning reading', pulseColor: 'text-emerald-600' }
  ];

  const meetings = [
    { day: 'Mon', time: '10:00', title: 'Teleconsult Review', owner: 'Dr Lim', duration: '10:00 - 10:30', style: 'bg-blue-50 text-blue-900 ring-1 ring-blue-100' },
    { day: 'Wed', time: '14:00', title: 'Care Plan Follow-up', owner: 'Nurse Sarah', duration: '14:00 - 14:30', style: 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100' },
    { day: 'Thu', time: '11:00', title: 'Medication Check', owner: 'Pharmacist Team', duration: '11:00 - 11:20', style: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200' }
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getMeetingForSlot = (day: string, time: string) => {
    return meetings.find(m => m.day === day && m.time === time);
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 space-y-5">

        {/* Top Header */}
        <header className="flex items-center justify-between rounded-3xl bg-white/85 backdrop-blur p-3 shadow-sm border border-white/70">
          <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-200">
            Onboarding
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back
            </button>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-900">NHG Admin</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center text-lg">
              👤
            </div>
          </div>
        </header>

        {/* Patient Info Card */}
        <section className="rounded-3xl border border-white/70 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-blue-200">
              {patientData.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">{patientData.name}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span> {patientData.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span>Ward {patientData.ward}</span>
                <span>Bed {patientData.bedNumber}</span>
                <span>Phone: <span className="text-blue-600 font-semibold">{patientData.phone}</span></span>
                <span>DOB: {patientData.dob}</span>
                <span>Language: {patientData.language}</span>
                <span>Login PIN: {patientData.loginPin}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
            + Add Reading
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Create Report
          </button>
          <button
            onClick={() => onNavigate?.('medicine')}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Medicine
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            WhatsApp
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Update
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Discharge
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Thresholds
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Notification
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Survey
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Manual Link
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
          <div className="space-y-5 min-w-0">
            {/* Vital Signs Cards */}
            <section className="grid gap-4 md:grid-cols-5">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Blood Pressure</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">100/90</p>
                <p className="mt-1 text-xs text-slate-500">mmHg</p>
                <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  Normal
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Heart Rate</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">100</p>
                <p className="mt-1 text-xs text-slate-500">bpm</p>
                <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  Monitor
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Temperature</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">36.5</p>
                <p className="mt-1 text-xs text-slate-500">°C</p>
                <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  Normal
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">O₂ Saturation</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">98</p>
                <p className="mt-1 text-xs text-slate-500">%</p>
                <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  Normal
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Glucose</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">5.2</p>
                <p className="mt-1 text-xs text-slate-500">mmol/L</p>
                <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  Normal
                </span>
              </div>
            </section>

            {/* Charts Section */}
            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Patient Trends</h2>
                  <p className="mt-1 text-sm text-slate-500">Monitor vital signs with threshold indicators.</p>
                </div>
                <div className="flex flex-wrap rounded-2xl bg-slate-100 p-1 text-xs md:text-sm font-semibold text-slate-600">
                  <button
                    onClick={() => setChartView('bp')}
                    className={`rounded-xl px-3 py-2 ${chartView === 'bp' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}`}
                  >
                    BP
                  </button>
                  <button
                    onClick={() => setChartView('pulse')}
                    className={`rounded-xl px-3 py-2 ${chartView === 'pulse' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}`}
                  >
                    Heart
                  </button>
                  <button
                    onClick={() => setChartView('temp')}
                    className={`rounded-xl px-3 py-2 ${chartView === 'temp' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}`}
                  >
                    Temp
                  </button>
                  <button
                    onClick={() => setChartView('oxygen')}
                    className={`rounded-xl px-3 py-2 ${chartView === 'oxygen' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}`}
                  >
                    O₂
                  </button>
                  <button
                    onClick={() => setChartView('glucose')}
                    className={`rounded-xl px-3 py-2 ${chartView === 'glucose' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}`}
                  >
                    Glucose
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px]">
                <div className="h-[340px] rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        tickFormatter={(value) => value.split(' ')[0]}
                      />
                      <YAxis
                        domain={
                          chartView === 'bp' ? [60, 150] :
                          chartView === 'pulse' ? [60, 130] :
                          chartView === 'temp' ? [35, 39] :
                          chartView === 'oxygen' ? [85, 100] :
                          [3, 8]
                        }
                        tick={{ fontSize: 12, fill: '#64748b' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '8px 12px'
                        }}
                      />
                      {chartView === 'bp' ? (
                        <>
                          <ReferenceLine y={140} stroke="#ef4444" strokeDasharray="6 6" label={{ value: 'High 140', position: 'right', fill: '#ef4444', fontSize: 12 }} />
                          <ReferenceLine y={90} stroke="#f59e0b" strokeDasharray="6 6" label={{ value: 'Monitor 90', position: 'right', fill: '#f59e0b', fontSize: 12 }} />
                          <Line
                            key="systolic-line"
                            type="monotone"
                            dataKey="systolic"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 3, r: 5 }}
                            name="Systolic"
                          />
                          <Line
                            key="diastolic-line"
                            type="monotone"
                            dataKey="diastolic"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#14b8a6', strokeWidth: 3, r: 5 }}
                            name="Diastolic"
                          />
                        </>
                      ) : chartView === 'pulse' ? (
                        <>
                          <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="6 6" label={{ value: 'Monitor 100', position: 'right', fill: '#f59e0b', fontSize: 12 }} />
                          <Line
                            key="pulse-line"
                            type="monotone"
                            dataKey="pulse"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 3, r: 5 }}
                            name="Heart Rate (bpm)"
                          />
                        </>
                      ) : chartView === 'temp' ? (
                        <>
                          <ReferenceLine y={37.5} stroke="#f59e0b" strokeDasharray="6 6" label={{ value: 'Fever 37.5', position: 'right', fill: '#f59e0b', fontSize: 12 }} />
                          <ReferenceLine y={38.0} stroke="#ef4444" strokeDasharray="6 6" label={{ value: 'High 38.0', position: 'right', fill: '#ef4444', fontSize: 12 }} />
                          <Line
                            key="temperature-line"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 3, r: 5 }}
                            name="Temperature (°C)"
                          />
                        </>
                      ) : chartView === 'oxygen' ? (
                        <>
                          <ReferenceLine y={90} stroke="#f59e0b" strokeDasharray="6 6" label={{ value: 'Low 90', position: 'right', fill: '#f59e0b', fontSize: 12 }} />
                          <ReferenceLine y={95} stroke="#10b981" strokeDasharray="6 6" label={{ value: 'Normal 95', position: 'right', fill: '#10b981', fontSize: 12 }} />
                          <Line
                            key="oxygen-line"
                            type="monotone"
                            dataKey="oxygen"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 3, r: 5 }}
                            name="O₂ Saturation (%)"
                          />
                        </>
                      ) : (
                        <>
                          <ReferenceLine y={5.6} stroke="#f59e0b" strokeDasharray="6 6" label={{ value: 'Monitor 5.6', position: 'right', fill: '#f59e0b', fontSize: 12 }} />
                          <ReferenceLine y={7.0} stroke="#ef4444" strokeDasharray="6 6" label={{ value: 'High 7.0', position: 'right', fill: '#ef4444', fontSize: 12 }} />
                          <Line
                            key="glucose-line"
                            type="monotone"
                            dataKey="glucose"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 3, r: 5 }}
                            name="Glucose (mmol/L)"
                          />
                        </>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-500">Trend Insight</p>
                    <p className="mt-2 text-sm font-semibold text-blue-950">
                      {chartView === 'bp' ? 'Blood pressure is within safe range.' :
                       chartView === 'pulse' ? 'Pulse is improving after first reading.' :
                       chartView === 'temp' ? 'Temperature remains stable and normal.' :
                       chartView === 'oxygen' ? 'Oxygen saturation is excellent.' :
                       'Glucose levels are well controlled.'}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      {chartView === 'bp'
                        ? 'Latest diastolic reading should continue to be monitored, but no critical breach is shown.'
                        : chartView === 'pulse'
                        ? 'Initial pulse was 100 bpm, then reduced across later readings. Continue monitoring.'
                        : chartView === 'temp'
                        ? 'All temperature readings are within normal range. No fever detected.'
                        : chartView === 'oxygen'
                        ? 'All readings above 95%. Patient is maintaining healthy oxygen levels.'
                        : 'Blood glucose is well managed. Continue current diabetes management plan.'}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Filters</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => setTimeFilter('24h')}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold ${timeFilter === '24h' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
                      >
                        24H
                      </button>
                      <button
                        onClick={() => setTimeFilter('7d')}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold ${timeFilter === '7d' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
                      >
                        7D
                      </button>
                      <button
                        onClick={() => setTimeFilter('30d')}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold ${timeFilter === '30d' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
                      >
                        30D
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Readings Table */}
            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Recent Readings</h2>
                  <p className="mt-1 text-sm text-slate-500">Latest manual and device readings with abnormal values highlighted.</p>
                </div>
                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <Download className="size-4" />
                  Export
                </button>
              </div>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-[850px] w-full divide-y divide-slate-100 text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Time</th>
                      <th className="px-4 py-3 text-left font-semibold">BP</th>
                      <th className="px-4 py-3 text-left font-semibold">Pulse</th>
                      <th className="px-4 py-3 text-left font-semibold">Position</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {readings.map((reading, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3 font-medium text-slate-700">{reading.time}</td>
                        <td className="px-4 py-3 font-bold text-slate-950">{reading.bp}</td>
                        <td className={`px-4 py-3 font-bold ${reading.pulseColor}`}>{reading.pulse}</td>
                        <td className="px-4 py-3 text-slate-600">{reading.position}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            reading.status === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {reading.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{reading.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Clinical Alerts</h2>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">2</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100">
                  <p className="text-sm font-semibold text-amber-900">⚠ Pulse slightly elevated</p>
                  <p className="mt-1 text-xs text-amber-700">Latest pulse is 100 bpm. Monitor next reading.</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  <p className="text-sm font-semibold text-blue-900">⏱ Last reading updated</p>
                  <p className="mt-1 text-xs text-blue-700">17 Apr 2026, 16:24</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Patient Summary</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <dt className="text-xs text-slate-400">Ward</dt>
                  <dd className="mt-1 font-semibold">{patientData.ward}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <dt className="text-xs text-slate-400">Bed</dt>
                  <dd className="mt-1 font-semibold">{patientData.bedNumber}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <dt className="text-xs text-slate-400">PIN</dt>
                  <dd className="mt-1 font-semibold">{patientData.loginPin}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <dt className="text-xs text-slate-400">Language</dt>
                  <dd className="mt-1 font-semibold">{patientData.language}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Quick Notes</h2>
              <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                This is first BP reading manual. Continue monitoring pulse trend for the next scheduled reading.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Patient Files</h2>
                <button className="rounded-2xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center gap-1.5">
                  <Upload className="size-3.5" />
                  Upload
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-700">Medical_Report.pdf</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-white rounded-lg transition-colors">
                      <Download className="size-3.5 text-slate-600" />
                    </button>
                    <button className="p-1 hover:bg-white rounded-lg transition-colors">
                      <Trash2 className="size-3.5 text-rose-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-700">Lab_Results.pdf</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-white rounded-lg transition-colors">
                      <Download className="size-3.5 text-slate-600" />
                    </button>
                    <button className="p-1 hover:bg-white rounded-lg transition-colors">
                      <Trash2 className="size-3.5 text-rose-600" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Meeting Schedule */}
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Meeting Schedule</h2>
              <p className="mt-1 text-sm text-slate-500">Google Calendar-style view for teleconsults, care reviews, and follow-ups.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold text-slate-600">
                <button className="rounded-xl px-3 py-2 hover:text-slate-900">Today</button>
                <button className="rounded-xl px-3 py-2 bg-white text-blue-700 shadow-sm">Week</button>
                <button className="rounded-xl px-3 py-2 hover:text-slate-900">Month</button>
              </div>
              <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
                ＋ Create Meeting
              </button>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-100">
            <div className="min-w-[850px]">
              {/* Header */}
              <div className="grid grid-cols-[82px_repeat(5,minmax(150px,1fr))] bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-400">
                <div className="border-r border-slate-100 px-3 py-3">Time</div>
                {days.map(day => (
                  <div key={day} className="border-r border-slate-100 px-3 py-3 last:border-r-0">{day}</div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-[82px_repeat(5,minmax(150px,1fr))] min-h-[78px] border-t border-slate-100">
                  <div className="border-r border-slate-100 bg-slate-50/60 px-3 py-3 text-xs font-semibold text-slate-400">
                    {time}
                  </div>
                  {days.map(day => {
                    const meeting = getMeetingForSlot(day, time);
                    return (
                      <div key={day} className="border-r border-slate-100 p-2 last:border-r-0">
                        {meeting ? (
                          <div className={`h-full rounded-2xl p-3 shadow-sm ${meeting.style}`}>
                            <p className="text-xs font-bold">{meeting.duration}</p>
                            <p className="mt-2 text-sm font-bold">{meeting.title}</p>
                            <p className="mt-1 text-xs opacity-80">{meeting.owner}</p>
                          </div>
                        ) : (
                          <button className="h-full w-full rounded-2xl border border-dashed border-slate-200 text-xs font-semibold text-slate-300 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                            + Slot
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pb-4 text-xs font-semibold text-slate-400">
          COPYRIGHT © 2026 NHG AT HOME, All rights reserved
        </footer>
      </div>
    </div>
  );
}
