<template>
  <td :class="['mark-' + status]"></td>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent ({
  props: {
    status: {
      type: String,
      required: false,
    }
  },
  setup(props) {
    const { status } = props;
    
    return {
      status: status ? status.toLocaleLowerCase() : 'null'
    }
  }
})
</script>

<style>
.mark-null {
    background-color: #efefef;
  }

  .mark-present {
    background-color: rgb(120, 165, 90);
  }

  .mark-missing {
    background-color: rgb(234, 51, 35);
  }

  .mark-lateness {
    background-color: rgb(36, 83, 143);
  }

  .mark-overtime {
    background-color: rgb(49, 77, 28);
  }

  .mark-hospital {
    background-color: rgb(184, 127, 158);
  }

  .mark-vacation {
    background-color: rgb(249, 217, 120);
  }

  .mark-remote {
    background-color: rgb(238, 205, 205);
  }
</style>