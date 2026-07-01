import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import ScamDNAPage from './pages/ScamDNAPage';
import TimelinePage from './pages/Timeline';
import ConnectionsPage from './pages/Connections';
import QueuePage from './pages/Queue';
import SettingsPage from './pages/SettingsPage';
import { useCases } from './data/useData';
import { useLang } from './i18n';
import { DemoCase } from './types';

export type Page = 'dashboard' | 'analysis' | 'queue' | 'connections' | 'scam-dna' | 'timeline' | 'settings';

function App() {
  const cases = useCases();
  const { lang } = useLang();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedCase, setSelectedCase] = useState<DemoCase>(cases[0]);

  // When the language switches, remap a selected DEMO case to its counterpart
  // in the new language; leave ad-hoc live-analysis results untouched.
  useEffect(() => {
    const match = cases.find((c) => c.id === selectedCase.id);
    if (match && match !== selectedCase) setSelectedCase(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleSelectCase = (c: DemoCase, page: Page = 'analysis') => {
    setSelectedCase(c);
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && (
        <Dashboard
          onNavigateAnalysis={() => setCurrentPage('analysis')}
          onSelectCase={(c) => handleSelectCase(c, 'analysis')}
        />
      )}
      {currentPage === 'analysis' && (
        <Analysis
          selectedCase={selectedCase}
          onSelectCase={(c) => setSelectedCase(c)}
          onViewScamDNA={() => setCurrentPage('scam-dna')}
          onViewTimeline={() => setCurrentPage('timeline')}
          onViewConnections={() => setCurrentPage('connections')}
        />
      )}
      {currentPage === 'scam-dna' && (
        <ScamDNAPage selectedCase={selectedCase} onBack={() => setCurrentPage('analysis')} />
      )}
      {currentPage === 'timeline' && (
        <TimelinePage selectedCase={selectedCase} onBack={() => setCurrentPage('analysis')} />
      )}
      {currentPage === 'connections' && (
        <ConnectionsPage selectedCase={selectedCase} onBack={() => setCurrentPage('analysis')} />
      )}
      {currentPage === 'queue' && (
        <QueuePage
          onSelectCase={(c) => handleSelectCase(c, 'analysis')}
        />
      )}
      {currentPage === 'settings' && <SettingsPage />}
    </Layout>
  );
}

export default App;
