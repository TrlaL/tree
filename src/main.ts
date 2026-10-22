import { createApp } from 'vue'
import App from './App.vue'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const app = createApp(App);

app.mount('#app');
