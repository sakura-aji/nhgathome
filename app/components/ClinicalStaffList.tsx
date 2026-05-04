import { useState } from 'react';
import { Search, Calendar, Edit, UserCircle, Download, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from './Header';

interface ClinicalStaff {
  id: number;
  name: string;
  role: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  status: string;
  employeeId: string;
}

interface ClinicalStaffListProps {
  onViewRoster: (staffId: number) => void;
}

export function ClinicalStaffList({ onViewRoster }: ClinicalStaffListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(30);
  const [currentWeek, setCurrentWeek] = useState(new Date(2026, 3, 17)); // April 17, 2026

  const staff: ClinicalStaff[] = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Doctor',
      specialization: 'Cardiology',
      department: 'Cardiology',
      email: 'sarah.chen@nhg.com',
      phone: '+65 9123 4567',
      status: 'Active',
      employeeId: 'NHG001'
    },
    {
      id: 2,
      name: 'Dr. James Wong',
      role: 'Doctor',
      specialization: 'General Medicine',
      department: 'General Practice',
      email: 'james.wong@nhg.com',
      phone: '+65 9234 5678',
      status: 'Active',
      employeeId: 'NHG002'
    },
    {
      id: 3,
      name: 'Nurse Sarah',
      role: 'Nurse',
      specialization: 'Critical Care',
      department: 'ICU',
      email: 'nurse.sarah@nhg.com',
      phone: '+65 9345 6789',
      status: 'Active',
      employeeId: 'NHG003'
    },
    {
      id: 4,
      name: 'Dr. Emily Tan',
      role: 'Doctor',
      specialization: 'Cardiology',
      department: 'Cardiology',
      email: 'emily.tan@nhg.com',
      phone: '+65 9456 7890',
      status: 'Active',
      employeeId: 'NHG004'
    },
    {
      id: 5,
      name: 'Dr. Michael Lim',
      role: 'Doctor',
      specialization: 'Physiotherapy',
      department: 'Rehabilitation',
      email: 'michael.lim@nhg.com',
      phone: '+65 9567 8901',
      status: 'On Leave',
      employeeId: 'NHG005'
    }
  ];

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Master schedule data for all staff
  const masterSchedules = {
    'Dr. Sarah Chen': {
      'Mon-09:00': { patient: 'Van Test Non Survey', address: '123 Orchard Road, #05-12', type: 'bg-blue-50 text-blue-900 ring-blue-100' },
      'Mon-14:00': { patient: 'Mary Tan', address: '456 Bukit Timah Road', type: 'bg-emerald-50 text-emerald-900 ring-emerald-100' },
      'Wed-15:00': { patient: 'David Chen', address: '654 Ang Mo Kio Ave 6, #15-32', type: 'bg-purple-50 text-purple-900 ring-purple-100' }
    },
    'Dr. James Wong': {
      'Tue-10:00': { patient: 'John Lim', address: '789 Serangoon Ave 3, #12-456', type: 'bg-rose-50 text-rose-900 ring-rose-100' },
      'Thu-11:00': { patient: 'Sakura Uchiha', address: '987 Jurong West St 91, #04-123', type: 'bg-emerald-50 text-emerald-900 ring-emerald-100' }
    },
    'Nurse Sarah': {
      'Wed-09:00': { patient: 'Sarah Wong', address: '321 Clementi Road, #08-20', type: 'bg-blue-50 text-blue-900 ring-blue-100' },
      'Fri-13:00': { patient: 'Lisa Ng', address: '753 Yishun Ring Road, #10-45', type: 'bg-amber-50 text-amber-900 ring-amber-100' }
    },
    'Dr. Emily Tan': {
      'Mon-10:00': { patient: 'Michael Tan', address: '852 Tampines Ave 5, #07-11', type: 'bg-blue-50 text-blue-900 ring-blue-100' },
      'Fri-09:00': { patient: 'Peter Tan', address: '159 Pasir Ris Drive 4, #06-789', type: 'bg-blue-50 text-blue-900 ring-blue-100' }
    }
  };

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getScheduleForStaffAndSlot = (staffName: string, day: string, time: string) => {
    const staffSchedule = masterSchedules[staffName as keyof typeof masterSchedules];
    if (!staffSchedule) return null;
    return staffSchedule[`${day}-${time}` as keyof typeof staffSchedule];
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
        <Header showBackButton={false} />
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100">

          {/* Header */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Clinical Staff</h1>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm font-semibold">
                Add Staff
              </button>
            </div>
          </div>

          {/* Table Controls */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white"
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-slate-600">entries</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <Download className="size-4" />
                Export
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 w-64 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredStaff.map((staffMember) => (
                  <tr key={staffMember.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">{staffMember.employeeId}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {staffMember.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{staffMember.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{staffMember.role}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{staffMember.specialization}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{staffMember.department}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">{staffMember.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{staffMember.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        staffMember.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {staffMember.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewRoster(staffMember.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs hover:bg-purple-100 transition-colors border border-purple-200"
                        >
                          <Calendar className="size-3" />
                          Roster
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs hover:bg-emerald-100 transition-colors border border-emerald-200">
                          <Edit className="size-3" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing 1 to {filteredStaff.length} of {filteredStaff.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm transition-colors">
                1
              </button>
              <button className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </div>

        </div>

        {/* Master Schedule */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 mt-6">
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Master Schedule</h2>
                <p className="mt-1 text-sm text-slate-500">Weekly assignments for all clinical staff</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateWeek('prev')}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="size-5 text-slate-600" />
                </button>
                <span className="text-sm text-slate-600 min-w-[180px] text-center font-semibold">
                  {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[4].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateWeek('next')}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="size-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto rounded-3xl border border-slate-100">
              <div className="min-w-[1200px]">
                {/* Header */}
                <div className="grid grid-cols-[150px_repeat(5,minmax(180px,1fr))] bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <div className="border-r border-slate-100 px-3 py-3">Staff / Time</div>
                  {weekDays.map((day, idx) => (
                    <div key={idx} className="border-r border-slate-100 px-3 py-3 last:border-r-0">
                      <div>{days[idx]}</div>
                      <div className="text-slate-600 font-normal normal-case text-xs mt-0.5">
                        {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Staff Rows */}
                {staff.slice(0, 4).map((staffMember) => (
                  <div key={staffMember.id} className="border-t border-slate-100">
                    <div className="grid grid-cols-[150px_repeat(5,minmax(180px,1fr))] min-h-[120px]">
                      <div className="border-r border-slate-100 bg-slate-50/60 px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {staffMember.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{staffMember.name}</p>
                            <p className="text-xs text-slate-500">{staffMember.role}</p>
                          </div>
                        </div>
                      </div>

                      {days.map((day, dayIdx) => {
                        const assignments = timeSlots
                          .map(time => ({ time, schedule: getScheduleForStaffAndSlot(staffMember.name, day, time) }))
                          .filter(item => item.schedule);

                        return (
                          <div key={dayIdx} className="border-r border-slate-100 p-2 last:border-r-0">
                            <div className="space-y-1">
                              {assignments.length > 0 ? (
                                assignments.map((item, idx) => (
                                  <div key={idx} className={`rounded-xl p-2 shadow-sm ring-1 ${item.schedule!.type}`}>
                                    <div className="flex items-center gap-1 mb-1">
                                      <Clock className="size-3" />
                                      <p className="text-xs font-bold">{item.time}</p>
                                    </div>
                                    <p className="text-xs font-bold">{item.schedule!.patient}</p>
                                    <p className="text-xs opacity-75 mt-1 line-clamp-1">{item.schedule!.address}</p>
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-slate-300 text-center py-8">No assignments</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
