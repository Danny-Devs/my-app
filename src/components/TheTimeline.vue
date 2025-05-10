<script setup lang="ts">
import { ref, computed } from 'vue';
import { Post, posts } from '../posts';
import { DateTime } from 'luxon';

const periods = ['Today', 'This Week', 'This Month', 'This Year'] as const;

type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>('Today');

// Use computed to automatically update filtered posts when selectedPeriod changes
const filteredPosts = computed(() => {
  return posts.filter(post => {
    const postDate = DateTime.fromISO(post.created);
    const now = DateTime.now();

    switch (selectedPeriod.value) {
      case 'Today':
        return postDate.hasSame(now, 'day');
      case 'This Week':
        return postDate >= now.startOf('week') && postDate <= now.endOf('week');
      case 'This Month':
        return postDate.hasSame(now, 'month');
      case 'This Year':
        return postDate.hasSame(now, 'year');
      default:
        return true;
    }
  });
});

// Format ISO date string to show only month and day
const formatDate = (isoDate: string) => {
  return DateTime.fromISO(isoDate).toFormat('MMM d');
};

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

    <a v-for="post in filteredPosts" :key="post.id" class="panel-block">
      <a>{{ post.title }}</a>
      <div>{{ formatDate(post.created) }}</div>
    </a>
  </nav>
</template>
