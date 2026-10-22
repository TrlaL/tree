// core
import { createApp } from 'vue';
import App from './App.vue';

// ag-grid
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

// styles
import 'reset-css/reset.css';
import './styles/app.scss';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const app = createApp(App);

app.mount('#app');
