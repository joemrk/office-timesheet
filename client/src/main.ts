import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import TimeSheetDay from './components/TimesheetDay.vue'
import TimeSheetRow from './components/TimesheetRow.vue'
import TimeSheetTable from './components/TimesheetTable.vue'
import StatusDescriptionVue from './components/StatusDescription.vue'
import AddEmployee from './components/AddEmployee.vue'
import TimesheetSetForm from './components/TimesheetSetForm.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: App }
  ],
})

const app = createApp(App)

app.use(router);

app.component('timesheet-day', TimeSheetDay)
app.component('timesheet-row', TimeSheetRow)
app.component('timesheet-table', TimeSheetTable)
app.component('status-description', StatusDescriptionVue)
app.component('add-employee', AddEmployee)
app.component('timesheet-set-form', TimesheetSetForm)




app.mount('#app')
