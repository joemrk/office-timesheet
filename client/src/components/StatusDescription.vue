<template>
  <div class="mark-description">
    <div v-for="s of statuses" :key="s">
      <div :class="['mark-' + s]"></div>
      <span>{{ s }}</span>
    </div>

    </div> 
</template>

<script>
import { defineComponent } from 'vue';
import { allStatuses } from '../constant';

export default defineComponent({
  setup() {
    return {
      statuses: [...allStatuses].map(s => s.toLocaleLowerCase())
    }
  },
})
</script>

<style >
  .mark-description {
    display: flex;
  }

  .mark-description div {
    margin: 3px;
    border-radius: 3px;
    min-width: 20px;
    min-height: 20px;
  }

  .mark-description span {
    margin-right: 15px;
  }

  .mark-description div {
    display: flex;
  }
</style>