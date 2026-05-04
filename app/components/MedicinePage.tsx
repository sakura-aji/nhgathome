import { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Header } from './Header';

interface Medicine {
  id: number;
  drugName: string;
  usage: string;
  dosage: number;
  units: string;
  duration: string;
  frequency: string;
  totalDispense: string;
  note: string;
  status: string;
  createdBy: string;
  lastTimeTaken?: string;
}

interface MedicinePageProps {
  onNavigate?: (page: string) => void;
}

export function MedicinePage({ onNavigate }: MedicinePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const medicines: Medicine[] = [
    {
      id: 1,
      drugName: 'AMOXICILLIN TRIHYDRATE 250MG',
      usage: 'Drink',
      dosage: 2,
      units: 'EA',
      duration: '2 weeks',
      frequency: '2 tab/day',
      totalDispense: '-',
      note: '-',
      status: 'Discontinued',
      createdBy: 'NHG Admin',
      lastTimeTaken: '28 Apr 2026, 14:30'
    },
    {
      id: 2,
      drugName: 'PARACETAMOL 500MG',
      usage: 'Drink',
      dosage: 1,
      units: 'TAB',
      duration: '7 days',
      frequency: '3 tab/day',
      totalDispense: '21',
      note: 'Take after meals',
      status: 'Active',
      createdBy: 'Dr. Sarah Chen',
      lastTimeTaken: 'Missed'
    },
    {
      id: 3,
      drugName: 'METFORMIN 850MG',
      usage: 'Drink',
      dosage: 1,
      units: 'TAB',
      duration: '30 days',
      frequency: '2 tab/day',
      totalDispense: '60',
      note: 'With food',
      status: 'Active',
      createdBy: 'Dr. James Wong',
      lastTimeTaken: '01 May 2026, 08:15'
    },
    {
      id: 4,
      drugName: 'ATORVASTATIN 20MG',
      usage: 'Drink',
      dosage: 1,
      units: 'TAB',
      duration: '30 days',
      frequency: '1 tab/day',
      totalDispense: '30',
      note: '-',
      status: 'Active',
      createdBy: 'Dr. Emily Tan',
      lastTimeTaken: '30 Apr 2026, 22:00'
    },
    {
      id: 5,
      drugName: 'LISINOPRIL 10MG',
      usage: 'Drink',
      dosage: 1,
      units: 'TAB',
      duration: '30 days',
      frequency: '1 tab/day',
      totalDispense: '30',
      note: 'Morning dose',
      status: 'Active',
      createdBy: 'Dr. Sarah Chen',
      lastTimeTaken: 'Missed'
    }
  ];

  const filteredMedicines = medicines.filter(med =>
    med.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMedicines.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedMedicines = filteredMedicines.slice(startIndex, startIndex + entriesPerPage);

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      : 'bg-slate-100 text-slate-600 border border-slate-200';
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 space-y-5">
        <Header onBack={() => onNavigate?.('patients')} />
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100">

          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Drugs - (Van Test Non Survey)</h1>
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold ring-1 ring-amber-200">
                  <span className="inline-block size-2 rounded-full bg-amber-500 mr-1.5"></span>
                  Onboarding
                </span>
              </div>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 text-sm font-semibold">
                <Plus className="size-4" />
                Add Drugs
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
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
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-200/60">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Drug Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Dosage</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Total Dispense</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Last Time Taken</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Note</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Created By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {displayedMedicines.map((med, index) => (
                  <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{med.drugName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.usage}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.dosage}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.units}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.duration}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.frequency}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.totalDispense}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={med.lastTimeTaken === 'Missed' ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                        {med.lastTimeTaken}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.note}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredMedicines.length)} of {filteredMedicines.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
