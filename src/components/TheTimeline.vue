<script setup lang="ts">
import { ref } from 'vue';
import { Post, posts } from '../posts';
import { DateTime } from 'luxon';

const periods = ['Today', 'This Week', 'This Month', 'This Year'] as const;

type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>('Today');

const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        @click="selectPeriod(period)"
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': selectedPeriod === period }"
        >{{ period }}</a
      >
    </span>

    <a v-for="post in posts" :key="post.id" class="panel-block">
      <a>{{ post.title }}</a>
      <div>{{ post.created }}</div>
    </a>
  </nav>
</template>
