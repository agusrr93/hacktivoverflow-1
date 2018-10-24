<template>
  <div class="card" style="border:0">
      <button class="btn btn-block btn-outline-success" data-toggle="modal" data-target="#modalAddQuestion">Add Question </button>
      <!-- Modal Add Question -->
      <div class="modal fade" id="modalAddQuestion" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h4 class="modal-title" id="modelTitleId">Add Question</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control mb-3" v-model="title" placeholder="Title" required />
              <select v-model="category" class="form-control mb-3">
                <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
              </select>
              <wysiwyg v-model="description" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="sendQuestion" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'management',
  created () {
    this.getCategories()
    this.getQuestions()
  },
  data () {
    return {
      title: '',
      description: '',
      category: ''
    }
  },
  computed: {
    ...mapState(['user', 'categories', 'questions'])
  },
  methods: {
    ...mapActions(['getQuestions', 'getCategories', 'addQuestion']),
    sendQuestion () {
      let question = {
        title: this.title,
        category: this.category,
        description: this.description
      }
      this.addQuestion(question)
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
