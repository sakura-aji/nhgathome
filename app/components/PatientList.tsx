import { useState } from 'react';
import { Search, Eye, Edit, UserX, Bell, FileText, Link2, Activity, Download } from 'lucide-react';
import { Header } from './Header';

interface Patient {
  id: number;
  ward: string;
  bedNumber: string;
  name: string;
  mobileNumber: string;
  device: string;
  status: string;
  dateAdmitted: string;
  latestReading: string;
}

interface PatientListProps {
  onViewPatient: (patientId: number) => void;
}

export function PatientList({ onViewPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(30);
  const [selectedWard, setSelectedWard] = useState('all');

  const patients: Patient[] = [
    {
      id: 1,
      ward: 'B',
      bedNumber: '29',
      name: 'Van Test Non Survey',
      mobileNumber: '92353091',
      device: '-',
      status: 'Active',
      dateAdmitted: '17-04-26 16:23',
      latestReading: '17-04-26 16:24'
    },
    {
      id: 2,
      ward: 'A',
      bedNumber: '28',
      name: 'Van test patient',
      mobileNumber: '91472043',
      device: '-',
      status: 'Active',
      dateAdmitted: '17-04-26 16:18',
      latestReading: '17-04-26 16:40'
    },
    {
      id: 3,
      ward: 'B',
      bedNumber: '-',
      name: 'Sasuke Uchiha',
      mobileNumber: '80480368',
      device: '-',
      status: 'Active',
      dateAdmitted: '06-03-26 18:37',
      latestReading: '18-03-26 15:54'
    },
    {
      id: 4,
      ward: 'A',
      bedNumber: '123',
      name: 'Sakura',
      mobileNumber: '78008942527',
      device: 'iPad (iOS13)',
      status: 'Active',
      dateAdmitted: '18-07-25 18:21',
      latestReading: '09-04-26 13:52'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.mobileNumber.includes(searchTerm);
    const matchesWard = selectedWard === 'all' || patient.ward === selectedWard;
    return matchesSearch && matchesWard;
  });

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 space-y-5">
        <Header showBackButton={false} />
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100">

          {/* Header with Filters */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm font-semibold">
                New Patient
              </button>
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-3">
                <label className="text-sm text-slate-600">Created Date</label>
                <input
                  type="date"
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white"
                />
              </div>

              <div className="flex-1 flex items-center gap-3">
                <label className="text-sm text-slate-600">Select Ward</label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white flex-1"
                >
                  <option value="all">All Wards</option>
                  <option value="A">Ward A</option>
                  <option value="B">Ward B</option>
                  <option value="C">Ward C</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Controls */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-white"
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
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Ward</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Bed Number</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Mobile Number</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Date Admitted</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Latest Reading</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900">{patient.ward}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{patient.bedNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.mobileNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.device}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.dateAdmitted}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.latestReading}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => onViewPatient(patient.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs hover:bg-indigo-100 transition-colors border border-indigo-200"
                        >
                          <Eye className="size-3" />
                          View
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs hover:bg-emerald-100 transition-colors border border-emerald-200">
                          <Edit className="size-3" />
                          Update
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md text-xs hover:bg-rose-100 transition-colors border border-rose-200">
                          <UserX className="size-3" />
                          Discharge
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs hover:bg-amber-100 transition-colors border border-amber-200">
                          <Activity className="size-3" />
                          Thresholds
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 text-sky-700 rounded-md text-xs hover:bg-sky-100 transition-colors border border-sky-200">
                          <Bell className="size-3" />
                          Notification
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs hover:bg-purple-100 transition-colors border border-purple-200">
                          <FileText className="size-3" />
                          Survey
                        </button>
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md text-xs hover:bg-slate-100 transition-colors border border-slate-200">
                          <Link2 className="size-3" />
                          Manual Link
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
              Showing 1 to {filteredPatients.length} of {filteredPatients.length} entries
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
      </div>
    </div>
  );
}
