import { createApp } from 'vue'
import App from './App.vue'

import TimeSheetDay from './components/TimesheetDay.vue'
import TimeSheetRow from './components/TimesheetRow.vue'
import TimeSheetTable from './components/TimesheetTable.vue'
import StatusDescriptionVue from './components/StatusDescription.vue'
import AddEmployee from './components/AddEmployee.vue'

const app = createApp(App)

app.component('timesheet-day', TimeSheetDay)
app.component('timesheet-row', TimeSheetRow)
app.component('timesheet-table', TimeSheetTable)
app.component('status-description', StatusDescriptionVue)
app.component('add-employee', AddEmployee)


app.mount('#app')
