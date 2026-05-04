import { useState } from 'react';
import { Search, Upload, Download, FileText, File, Trash2, Eye } from 'lucide-react';
import { Header } from './Header';

interface Document {
  id: number;
  name: string;
  category: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  type: string;
}

export function EducationalMaterial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const documents: Document[] = [
    {
      id: 1,
      name: 'Blood Pressure Monitoring Guidelines.pdf',
      category: 'Clinical Guidelines',
      uploadedBy: 'Dr. Sarah Chen',
      uploadedDate: '15 Apr 2026',
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: 2,
      name: 'Diabetes Management Protocol.pdf',
      category: 'Clinical Guidelines',
      uploadedBy: 'Dr. James Wong',
      uploadedDate: '12 Apr 2026',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: 3,
      name: 'Patient Care Handbook.pdf',
      category: 'Training Material',
      uploadedBy: 'NHG Admin',
      uploadedDate: '10 Apr 2026',
      size: '5.2 MB',
      type: 'PDF'
    },
    {
      id: 4,
      name: 'Emergency Procedures Guide.pdf',
      category: 'Safety Protocols',
      uploadedBy: 'Nurse Sarah',
      uploadedDate: '08 Apr 2026',
      size: '3.1 MB',
      type: 'PDF'
    },
    {
      id: 5,
      name: 'Medication Administration Chart.xlsx',
      category: 'Reference Material',
      uploadedBy: 'Pharmacist Team',
      uploadedDate: '05 Apr 2026',
      size: '856 KB',
      type: 'Excel'
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    return type === 'PDF' ? FileText : File;
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 space-y-5">
        <Header showBackButton={false} />
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100">

          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Educational Material</h1>
                <p className="mt-1 text-sm text-slate-500">Training documents, guidelines, and reference materials</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center gap-2">
                  <Upload className="size-4" />
                  Upload File
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-slate-600">entries</span>
              </div>

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
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Uploaded By</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredDocuments.map((doc) => {
                  const FileIcon = getFileIcon(doc.type);
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileIcon className="size-5 text-blue-600" />
                          <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doc.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doc.uploadedBy}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doc.uploadedDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doc.size}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs hover:bg-blue-100 transition-colors border border-blue-200">
                            <Eye className="size-3" />
                            View
                          </button>
                          <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs hover:bg-emerald-100 transition-colors border border-emerald-200">
                            <Download className="size-3" />
                            Download
                          </button>
                          <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md text-xs hover:bg-rose-100 transition-colors border border-rose-200">
                            <Trash2 className="size-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing 1 to {filteredDocuments.length} of {filteredDocuments.length} entries
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
