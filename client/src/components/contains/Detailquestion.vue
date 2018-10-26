<template>
  <div>
    <div class="card mb-3">
      <div class="bg-success text-white">
        <h4 class="pl-2 pr-2">{{question.title}}</h4>
      </div>
  
      <div class="card-body">
        <button class="btn btn-sm btn-outline-success" v-if="(user._id !== question.owner._id)&&(question.vote.indexOf(user._id)==-1)" @click="up(question._id)">{{question.vote.length}} <i class="fas fa-arrow-up"></i> </button>
        <button class="btn btn-sm btn-outline-secondary" v-if="(user._id !== question.owner._id)&&(question.vote.indexOf(user._id)!=-1)">{{question.vote.length}} <i class="fas fa-arrow-up"></i> </button>
        <button class="btn btn-sm btn-outline-warning ml-1" v-if="(user._id !== question.owner._id)&&(question.unvote.indexOf(user._id)==-1)" @click="down(question._id)">{{question.unvote.length}}<i class="fas fa-arrow-down"></i> </button>
        <button class="btn btn-sm btn-outline-secondary ml-1" v-if="(user._id !== question.owner._id)&&(question.unvote.indexOf(user._id)!=-1)">{{question.unvote.length}}<i class="fas fa-arrow-down"></i> </button>
        <button class="btn btn-sm btn-outline-success">Total vote : {{question.vote.length-question.unvote.length}}</button>
        <button class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#modalEditquestion" v-if="user._id == question.owner._id" @click="editData(question)">Edit</button>
        <button @click="deleteMyquestion(question._id)" class="btn btn-sm btn-outline-danger ml-1" v-if="user._id == question.owner._id">Delete</button>
        <br />
        <small>
      
        By: {{question.owner.name}} <br />
        CreatedAt: {{question.createdAt}} <br />
        {{question.answers.length}} answers in this question</small>
        <hr>
        <div v-html="question.description" class="mb-3"></div>
            <h5 class="bg-secondary text-white" v-if="question.answers.length>0">&nbsp;Answers</h5>
            <div class="card mb-3" v-for="com in question.answers" :key="com._id">
              <strong>{{com.owner.name}} said: </strong>
              <blockquote v-html="com.answer" class="mb-3"></blockquote>
             
              <button class="btn btn-sm btn-outline-secondary" v-if="(user._id !== com.owner._id)&&(com.vote.indexOf(user._id)!=-1)">{{com.vote.length}} <i class="fas fa-arrow-up"></i> </button>
              <button class="btn btn-sm btn-outline-success" v-if="(user._id !== com.owner._id)&&(com.vote.indexOf(user._id)==-1)" @click="upp(com._id)">{{com.vote.length}} <i class="fas fa-arrow-up"></i> </button>
              <button class="btn btn-sm btn-outline-warning ml-1" v-if="(user._id !== com.owner._id)&&(com.unvote.indexOf(user._id)==-1)" @click="downn(com._id)">{{com.unvote.length}}<i class="fas fa-arrow-down"></i> </button>
              <button class="btn btn-sm btn-outline-secondary ml-1" v-if="(user._id !== com.owner._id)&&(com.unvote.indexOf(user._id)!=-1)">{{com.unvote.length}}<i class="fas fa-arrow-down"></i> </button>
              <button class="btn btn-sm btn-outline-success">Total vote : {{com.vote.length-com.unvote.length}}</button>
              <a href="#" class="text-success" data-toggle="modal" data-target="#modalEditanswer" v-if="user._id == com.owner._id" @click="editAnswer(com)">Edit</a>
              <a href="#" class="text-danger" v-if="user._id == com.owner._id" @click="deleteAnswer(com._id)">Delete</a>
            </div>
            
            <div v-if="user._id">
              <wysiwyg v-model="answer" />
              <button class="btn btn-outline-success btn-sm float-right" @click="saveanswer(question._id)">answer</button>
            </div>
      </div>
    </div>
    <!-- Modal Edit Question -->
      <div class="modal fade" id="modalEditquestion" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h4 class="modal-title" id="modelTitleId">Edit Question</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control mb-3" v-model="question.title" placeholder="Title" required />
              <select v-model="category" class="form-control mb-3">
                <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
              </select>
              <wysiwyg v-model="question.description" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="sendEditQuestion(question._id, question.title, question.description)" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>

        
      <div class="modal fade" id="modalEditanswer" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h4 class="modal-title" id="modelTitleId">Edit Question</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <select v-model="category" class="form-control mb-3">
                <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
              </select>
              <wysiwyg v-model="answers" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"  data-dismiss="modal" @click=saveAnswer(answers._id)>Save</button>
            </div>
          </div>
        </div>
      </div>
  </div>

  
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
const url = 'http://localhost:3000'
export default {
  props: ['id'],
  name: 'listquestion',
  created () {
    this.getQuestion()
  },
  computed: {
    ...mapState(['isLogin', 'user', 'categories'])
  },
  data () {
    return {
      question: {},
      answer: '',
      category: ',',
      answers:'',
      active:''
    }
  },
  watch: {
    '$route' (to, from) {
      this.getQuestion()
    }
  },
  methods: {
    ...mapActions(['editQuestion', 'deleteQuestion','editAnswer']),
    deleteMyquestion (id) {
      this.deleteQuestion(id)
    },
    
    sendEditQuestion (id, title, description) {
      let objQuestion = {
        id: id,
        title: title,
        description: description,
        category: this.category
      }
      this.editQuestion(objQuestion)
    },
    up (id) {
      axios({
        url: url + `/questions/${id}/vote`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.getQuestion()
        })
        .catch(err => console.log(err))
    },
    saveAnswer(val){
      axios({
        url: url + `/answers/${this.active}`,
        method: 'patch',
        data: {
          answer: this.answers
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.getQuestion()
          this.answer = ''
          console.log('success')
        })
        .catch(err => console.log('gagal edit data'))
    },
    down (id) {
      axios({
        url: url + `/questions/${id}/unvote`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          console.log(`object`)
          this.getQuestion()
        })
        .catch(err => console.log(err))
    },
    editAnswer(val){
        this.active=val._id
        this.answers=val.answer
    },
    upp (id) {
      axios({
        url: url + `/answers/${id}/vote`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.getQuestion()
        })
        .catch(err => console.log(err))
    },
    downn (id) {
      axios({
        url: url + `/answers/${id}/unvote`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          console.log(`object`)
          this.getQuestion()
        })
        .catch(err => console.log(err))
    },
    getQuestion () {
      axios({
        url: url + `/questions/${this.id}`, 
        method: 'get'
      })
        .then(found => {
          this.question = found.data
        })
        .catch(err => console.log(err))
    },
    saveanswer (id) {
      axios({
        url: url + `/answers/${id}`,
        method: 'post',
        data: {
          answer: this.answer
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.getQuestion()
          this.answer = ''
        })
        .catch(err => console.log(err))
    },
    deleteAnswer (id) {
      axios({
        url: url + `/answers/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.getQuestion()
        })
        .catch(err => console.log(err))
    },

    editData (payload) {
      this.editArtikel = payload
    }
  }
}
</script>
