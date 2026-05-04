import { useState } from 'react';
import { Mail, Phone, Calendar as CalendarIcon, Briefcase, Award, Clock } from 'lucide-react';

interface ClinicalStaffDetailProps {
  onBack?: () => void;
  staffId?: number;
}

export function ClinicalStaffDetail({ onBack, staffId }: ClinicalStaffDetailProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date(2026, 3, 17)); // April 17, 2026

  const staffData = {
    id: 1,
    name: 'Dr. Sarah Chen',
    initials: 'SC',
    role: 'Doctor',
    specialization: 'Cardiology',
    department: 'Cardiology',
    email: 'sarah.chen@nhg.com',
    phone: '+65 9123 4567',
    employeeId: 'NHG001',
    joinDate: '15 Jan 2020',
    status: 'Active'
  };

  // Sample roster schedule with patient names and addresses
  const schedules = {
    'Mon-09:00': { type: 'home-visit', title: 'Van Test Non Survey', location: '123 Orchard Road, #05-12, Singapore 238858', color: 'bg-blue-50 text-blue-900 ring-blue-100' },
    'Mon-14:00': { type: 'consultation', title: 'Mary Tan', location: '456 Bukit Timah Road, Singapore 259756', color: 'bg-emerald-50 text-emerald-900 ring-emerald-100' },
    'Tue-10:00': { type: 'emergency', title: 'John Lim', location: '789 Serangoon Avenue 3, #12-456, Singapore 550789', color: 'bg-rose-50 text-rose-900 ring-rose-100' },
    'Wed-09:00': { type: 'home-visit', title: 'Sarah Wong', location: '321 Clementi Road, #08-20, Singapore 129742', color: 'bg-blue-50 text-blue-900 ring-blue-100' },
    'Wed-15:00': { type: 'followup', title: 'David Chen', location: '654 Ang Mo Kio Avenue 6, #15-32, Singapore 560654', color: 'bg-purple-50 text-purple-900 ring-purple-100' },
    'Thu-11:00': { type: 'consultation', title: 'Sakura Uchiha', location: '987 Jurong West Street 91, #04-123, Singapore 640987', color: 'bg-emerald-50 text-emerald-900 ring-emerald-100' },
    'Fri-09:00': { type: 'home-visit', title: 'Peter Tan', location: '159 Pasir Ris Drive 4, #06-789, Singapore 510159', color: 'bg-blue-50 text-blue-900 ring-blue-100' },
    'Fri-13:00': { type: 'checkup', title: 'Lisa Ng', location: '753 Yishun Ring Road, #10-45, Singapore 760753', color: 'bg-amber-50 text-amber-900 ring-amber-100' }
  };

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getScheduleForSlot = (day: string, time: string) => {
    return schedules[`${day}-${time}` as keyof typeof schedules];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getWeekDays = () => {
    const week = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1); // Start from Monday

    for (let i = 0; i < 5; i++) { // Only weekdays
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays();

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 space-y-5">

        {/* Top Header */}
        <header className="flex items-center justify-between rounded-3xl bg-white/85 backdrop-blur p-3 shadow-sm border border-white/70">
          <span className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span> {staffData.status}
          </span>
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

        {/* Staff Info Card */}
        <section className="rounded-3xl border border-white/70 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-blue-200">
              {staffData.initials}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">{staffData.name}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                  {staffData.role}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Award className="size-4" />
                  {staffData.specialization}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="size-4" />
                  {staffData.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="size-4" />
                  <span className="text-blue-600 font-semibold">{staffData.email}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-4" />
                  {staffData.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="size-4" />
                  Joined: {staffData.joinDate}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Roster Schedule */}
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Roster Schedule</h2>
              <p className="mt-1 text-sm text-slate-500">Weekly work schedule and shift assignments</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ← Prev Week
              </button>
              <span className="text-sm text-slate-600 min-w-[180px] text-center font-semibold">
                {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[4].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Next Week →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <div className="min-w-[1200px]">
              {/* Header */}
              <div className="grid grid-cols-[100px_repeat(5,minmax(200px,1fr))] bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-400">
                <div className="border-r border-slate-100 px-3 py-3">Time</div>
                {weekDays.map((day, idx) => (
                  <div key={idx} className="border-r border-slate-100 px-3 py-3 last:border-r-0">
                    <div>{days[idx]}</div>
                    <div className="text-slate-600 font-normal normal-case text-xs mt-0.5">
                      {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-[100px_repeat(5,minmax(200px,1fr))] min-h-[90px] border-t border-slate-100">
                  <div className="border-r border-slate-100 bg-slate-50/60 px-3 py-3 text-xs font-semibold text-slate-400">
                    {time}
                  </div>
                  {days.map(day => {
                    const schedule = getScheduleForSlot(day, time);
                    return (
                      <div key={day} className="border-r border-slate-100 p-2 last:border-r-0">
                        {schedule ? (
                          <div className={`h-full rounded-2xl p-3 shadow-sm ring-1 ${schedule.color}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="size-3" />
                              <p className="text-xs font-bold">{time}</p>
                            </div>
                            <p className="text-sm font-bold mt-2">{schedule.title}</p>
                            <p className="text-xs opacity-80 mt-1">{schedule.location}</p>
                          </div>
                        ) : (
                          <button className="h-full w-full rounded-2xl border border-dashed border-slate-200 text-xs font-semibold text-slate-300 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                            + Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            {[
              { label: 'Home Visit', color: 'bg-blue-50 ring-blue-100' },
              { label: 'Consultation', color: 'bg-emerald-50 ring-emerald-100' },
              { label: 'Emergency', color: 'bg-rose-50 ring-rose-100' },
              { label: 'Follow-up', color: 'bg-purple-50 ring-purple-100' },
              { label: 'Check-up', color: 'bg-amber-50 ring-amber-100' }
            ].map((legend, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`size-4 ${legend.color} ring-1 rounded`}></div>
                <span className="text-xs text-slate-600">{legend.label}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
