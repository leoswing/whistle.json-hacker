import { createRoot } from 'react-dom/client';
import App from './components/RequestTab/ReqTab';
import { fixPluginPanelVisibility } from './utils/whistle-panel-visibility';
import './index.css';

fixPluginPanelVisibility();

createRoot(document.getElementById('root')!).render(
  <App />
);
