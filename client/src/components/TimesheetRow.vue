<template>
  <tr>
    <td>{{`${employee.firstName} ${employee.lastName}`}}</td>
    <timesheet-day 
      v-for="[i, t] of employee.timesheet.entries()" 
      :timesheet="t" 
      :day="i+1" 
      :employee="employee.id" 
      :key="i"
    />
    <td>{{ workDays }}</td>
  </tr>
</template>

<script>
import { defineComponent } from 'vue'
import { isEmployeeWork } from '../utils/is-employee-work'
export default defineComponent({
  props: {
    employee: {
      type: Object,
      require: true
    }
  },

  setup(props) {
    const { employee }  = props;

    const workDays = Object.entries(employee.timesheet).filter(([, v]) => v && isEmployeeWork(v.status)).length

    return {
      employee, workDays
    }
  },
})
</script>

<style scoped>


</style>