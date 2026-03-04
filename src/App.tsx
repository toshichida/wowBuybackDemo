import { Routes, Route, Navigate } from 'react-router-dom';
import { BuybackTicket } from './buyback-ticket';
import { ConsentForm } from './consent-form';
import { Admin } from './admin';
import { ImagePreview } from './image-preview';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Navigate to="/buyback" replace />} />
        <Route path="/buyback" element={<BuybackTicket />} />
        <Route path="/consent" element={<ConsentForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/preview" element={<ImagePreview />} />
      </Routes>
    </div>
  );
}

export default App;
