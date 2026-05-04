import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PatientList } from './components/PatientList';
import { PatientDetailModern } from './components/PatientDetailModern';
import { MedicinePage } from './components/MedicinePage';
import { EducationalMaterial } from './components/EducationalMaterial';
import { ClinicalStaffList } from './components/ClinicalStaffList';
import { ClinicalStaffDetail } from './components/ClinicalStaffDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState('patients');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

  const handleViewPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
    setCurrentPage('patient-detail');
  };

  const handleBackToList = () => {
    setSelectedPatientId(null);
    setCurrentPage('patients');
  };

  const handleViewRoster = (staffId: number) => {
    setSelectedStaffId(staffId);
    setCurrentPage('staff-roster');
  };

  const handleBackToStaffList = () => {
    setSelectedStaffId(null);
    setCurrentPage('clinical-staff');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'patients':
        return <PatientList onViewPatient={handleViewPatient} />;
      case 'patient-detail':
        return <PatientDetailModern onNavigate={setCurrentPage} onBack={handleBackToList} patientId={selectedPatientId || undefined} />;
      case 'medicine':
        return <MedicinePage onNavigate={setCurrentPage} />;
      case 'educational-material':
        return <EducationalMaterial />;
      case 'clinical-staff':
        return <ClinicalStaffList onViewRoster={handleViewRoster} />;
      case 'staff-roster':
        return <ClinicalStaffDetail onBack={handleBackToStaffList} staffId={selectedStaffId || undefined} />;
      default:
        return <PatientList onViewPatient={handleViewPatient} />;
    }
  };

  return (
    <div className="size-full flex bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        {renderPage()}
      </div>
    </div>
  );
}