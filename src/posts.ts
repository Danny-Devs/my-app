import { DateTime } from 'luxon';

export interface Post {
  id: string;
  title: string;
  created: string;
}

export const today: Post = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
};

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ days: 7 }).toISO(),
};

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: DateTime.now().minus({ days: 30 }).toISO(),
};

export const thisYear: Post = {
  id: "4",
  title: "This Year",
  created: DateTime.now().minus({ days: 365 }).toISO(),
};

export const posts: Post[] = [today, thisWeek, thisMonth, thisYear].map(
  (post) => ({
    ...post,
    created: DateTime.fromISO(post.created).toLocaleString(DateTime.DATE_MED),
  })
) ;
