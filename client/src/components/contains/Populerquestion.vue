<template>
  <div class="card">
    <ul class="list-group">
      <li class="list-group-item">Latest Questions</li>
      <router-link v-for="question in questions" :key="question._id" class="list-group-item" :to="{ name: 'detailquestion', params: { id: question._id }}">{{question.title}} </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'popular',
  computed: {
    ...mapState(['isLogin', 'user', 'questions'])
  }
}
</script>
