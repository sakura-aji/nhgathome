import { useState } from 'react';
import {
  User, Phone, Calendar, MapPin, Languages, KeyRound,
  Activity, Heart, Droplet, Thermometer, Wind,
  FileText, Pill, MessageSquare, Link2, ChevronLeft, ChevronRight, Clock, Plus
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

interface PatientDetailProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  patientId?: number;
}

export function PatientDetail({ onNavigate, onBack, patientId }: PatientDetailProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 17));

  const patientData = {
    name: 'Van Test Non Survey',
    ward: 'B',
    bedNumber: '29',
    phone: '+65 92353091',
    dob: '17-04-2000',
    language: 'Chinese',
    loginPin: '4126',
    status: 'Onboarding'
  };

  const vitals = {
    bloodPressure: { systolic: 100, diastolic: 90, status: 'normal' },
    heartRate: { value: 100, status: 'normal' },
    temperature: { value: 36.5, status: 'normal' },
    respiratoryRate: { value: 16, status: 'normal' },
    oxygenSaturation: { value: 98, status: 'normal' }
  };

  const bloodPressureData = [
    { id: 1, date: '14 Apr', systolic: 103, diastolic: 92 },
    { id: 2, date: '15 Apr', systolic: 101, diastolic: 89 },
    { id: 3, date: '16 Apr', systolic: 98, diastolic: 88 },
    { id: 4, date: '17 Apr', systolic: 100, diastolic: 90 },
    { id: 5, date: '18 Apr', systolic: 102, diastolic: 91 },
    { id: 6, date: '19 Apr', systolic: 99, diastolic: 87 }
  ];

  const heartRateData = [
    { id: 1, date: '14 Apr', rate: 102 },
    { id: 2, date: '15 Apr', rate: 98 },
    { id: 3, date: '16 Apr', rate: 95 },
    { id: 4, date: '17 Apr', rate: 100 },
    { id: 5, date: '18 Apr', rate: 103 },
    { id: 6, date: '19 Apr', rate: 97 }
  ];

  const appointments = [
    {
      id: 1,
      date: new Date(2026, 3, 17, 9, 0),
      duration: 60,
      title: 'General Checkup',
      doctor: 'Dr. Sarah Chen',
      type: 'routine'
    },
    {
      id: 2,
      date: new Date(2026, 3, 17, 14, 30),
      duration: 45,
      title: 'Blood Test',
      doctor: 'Lab Technician',
      type: 'lab'
    },
    {
      id: 3,
      date: new Date(2026, 3, 18, 10, 0),
      duration: 30,
      title: 'Physiotherapy',
      doctor: 'Dr. James Wong',
      type: 'therapy'
    },
    {
      id: 4,
      date: new Date(2026, 3, 19, 15, 0),
      duration: 60,
      title: 'Cardiologist Consultation',
      doctor: 'Dr. Emily Tan',
      type: 'specialist'
    }
  ];

  const getWeekDays = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays();

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === day.toDateString();
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      routine: 'bg-blue-50 text-blue-700 border-blue-200',
      lab: 'bg-purple-50 text-purple-700 border-purple-200',
      therapy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      specialist: 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50/30">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">

        {/* Patient Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="size-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center border-2 border-indigo-300 shadow-sm">
                <User className="size-8 text-indigo-700" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">{patientData.name}</h1>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm mt-1 border border-indigo-200">
                  {patientData.status}
                </span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: MapPin, label: 'Ward', value: patientData.ward },
              { icon: Activity, label: 'Bed Number', value: patientData.bedNumber },
              { icon: Phone, label: 'Phone', value: patientData.phone },
              { icon: Calendar, label: 'DOB', value: patientData.dob },
              { icon: Languages, label: 'Language', value: patientData.language },
              { icon: KeyRound, label: 'Login Pin', value: patientData.loginPin }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <item.icon className="size-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="text-sm text-gray-900">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: FileText, label: 'Create Report', page: null },
            { icon: Pill, label: 'Medicine', page: 'medicine' },
            { icon: Activity, label: 'Add Reading', page: null },
            { icon: Calendar, label: 'Schedule', page: null },
            { icon: MessageSquare, label: 'Message', page: null },
            { icon: Link2, label: 'Manual Link', page: null }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => item.page && onNavigate?.(item.page)}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/60 hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-3"
            >
              <item.icon className="size-5 text-indigo-600" />
              <span className="text-sm text-slate-700">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Vital Signs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          <h2 className="text-lg text-slate-900 mb-5">Current Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Heart, label: 'Blood Pressure', value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`, unit: 'mmHg', color: 'from-rose-50 to-rose-100 border-rose-200', iconColor: 'text-rose-600' },
              { icon: Activity, label: 'Heart Rate', value: vitals.heartRate.value, unit: 'bpm', color: 'from-pink-50 to-pink-100 border-pink-200', iconColor: 'text-pink-600' },
              { icon: Thermometer, label: 'Temperature', value: `${vitals.temperature.value}°C`, unit: '', color: 'from-amber-50 to-amber-100 border-amber-200', iconColor: 'text-amber-600' },
              { icon: Wind, label: 'Respiratory Rate', value: vitals.respiratoryRate.value, unit: 'brpm', color: 'from-sky-50 to-sky-100 border-sky-200', iconColor: 'text-sky-600' },
              { icon: Droplet, label: 'O₂ Saturation', value: `${vitals.oxygenSaturation.value}%`, unit: '', color: 'from-cyan-50 to-cyan-100 border-cyan-200', iconColor: 'text-cyan-600' }
            ].map((vital, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${vital.color} p-4 rounded-lg border`}>
                <div className="flex items-center justify-between mb-3">
                  <vital.icon className={`size-6 ${vital.iconColor}`} />
                  <span className="text-xs text-emerald-600 font-medium">Normal</span>
                </div>
                <div className="text-2xl text-gray-900">{vital.value}</div>
                <div className="text-xs text-slate-600 mt-1">{vital.label} {vital.unit && `(${vital.unit})`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Blood Pressure Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={bloodPressureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[60, 120]} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line key="bp-systolic" type="monotone" dataKey="systolic" stroke="#0d9488" strokeWidth={2} dot={{ fill: '#0d9488', r: 4 }} activeDot={{ r: 6 }} name="Systolic" />
                <Line key="bp-diastolic" type="monotone" dataKey="diastolic" stroke="#14b8a6" strokeWidth={2} dot={{ fill: '#14b8a6', r: 4 }} activeDot={{ r: 6 }} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Heart Rate Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={heartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[80, 120]} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Area key="hr-rate" type="monotone" dataKey="rate" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" name="Heart Rate (bpm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendar Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-slate-900">Appointments & Schedule</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateWeek('prev')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronLeft className="size-5 text-slate-600" />
              </button>
              <span className="text-sm text-slate-600 min-w-[150px] text-center">
                {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => navigateWeek('next')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight className="size-5 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const dayAppointments = getAppointmentsForDay(day);
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <div key={index} className={`min-h-[200px] p-3 rounded-lg border ${isToday ? 'bg-indigo-50 border-indigo-300' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-center mb-3">
                    <div className="text-xs text-slate-500 uppercase">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className={`text-xl ${isToday ? 'text-indigo-700' : 'text-slate-900'}`}>{day.getDate()}</div>
                  </div>

                  <div className="space-y-2">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map(apt => (
                        <div key={apt.id} className={`p-2 rounded-lg border text-xs ${getTypeColor(apt.type)}`}>
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="size-3" />
                            <span>{formatTime(apt.date)}</span>
                          </div>
                          <div className="line-clamp-2 font-medium">{apt.title}</div>
                          <div className="text-xs opacity-75 mt-1">{apt.doctor}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 text-center mt-4">No appointments</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            {[
              { label: 'Routine', color: 'bg-blue-50 border-blue-200' },
              { label: 'Lab', color: 'bg-purple-50 border-purple-200' },
              { label: 'Therapy', color: 'bg-emerald-50 border-emerald-200' },
              { label: 'Specialist', color: 'bg-amber-50 border-amber-200' }
            ].map((legend, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`size-4 ${legend.color} border rounded`}></div>
                <span className="text-xs text-slate-600">{legend.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
