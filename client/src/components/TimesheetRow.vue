<template>
  <tr>
    <td>{{`${employee.firstName} ${employee.lastName}`}}</td>
    <timesheet-day v-for="[i, s] of employee.timesheet.entries()" :status="s"  :key="i"/>
    <td>{{ workDays }}</td>
  </tr>
</template>

<script>
import { defineComponent } from 'vue'

const workStatuses = new Set(['PRESENT', 'LATENESS', 'OVERTIME', 'REMOTE'])

const isEmploeeWork = (status) =>{
  return Boolean(status) && workStatuses.has(status)
}

export default defineComponent({
  props: {
    employee: {
      type: Object,
      require: true
    }
  },

  setup(props) {
    const { employee }  = props;

    const workDays = Object.entries(employee.timesheet).filter(([, v]) => isEmploeeWork(v)).length

    return {
      employee, workDays
    }
  },
})
</script>

<style>
  table, th, td {
    border: 1px solid black;
  }

  th, td {
    min-width: 20px;
    min-height: 20px;
  }

  tr td.table-mark {
    margin: 3px;
    border-radius: 3px;
  }
</style>