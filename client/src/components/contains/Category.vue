<template>
  <div class="card" style="border:0">
      <button class="btn btn-block btn-outline-primary mb-1" data-toggle="modal" data-target="#modalAddCategory" v-if="user.role==='admin'">Add Category </button>
      <button class="btn btn-block btn-outline-info mb-1" data-toggle="modal" data-target="#modalListCategory">List Category </button>
      <!-- Modal Add Question -->
      <div class="modal fade" id="modalAddCategory" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h4 class="modal-title" id="modelTitleId">Add Question</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control mb-3" v-model="name" placeholder="Name Category" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="sendCategory" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal List Category -->
      <div class="modal fade" id="modalListCategory" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h4 class="modal-title" id="modelTitleId">Category List</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table">
                <tr>
                  <th>No</th>
                  <th>Categories</th>
                </tr>
                <tr v-for="(category, i) in categories" :key="category._id">
                  <td>{{i+1}}</td>
                  <td>{{category.name}}</td>
                </tr>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'category',
  created () {
    this.getCategories()
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['user', 'categories'])
  },
  methods: {
    ...mapActions(['addCategory', 'getCategories']),
    sendCategory () {
      this.addCategory(this.name)
      this.getCategories()
    }
  }
}
</script>
