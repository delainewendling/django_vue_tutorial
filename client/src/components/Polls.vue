//    Do things here to get the questions from the database
<style>
    .fa {
        cursor: pointer;
    }
</style>

<template>
    <div>
        <h1> Latest Questions </h1>
        <div v-for="question in latest_question_list">
            <div v-if="question.visible">
                <span v-if="!question.editing">{{ question.question_text }}</span>
                <input v-model="question.question_text" v-if="question.editing">
                <i class="fa fa-caret-down" v-if="!question.expanded" @click="changeArrowDirection(question)" aria-hidden="true"></i>
                <i class="fa fa-caret-up" v-if="question.expanded" @click="changeArrowDirection(question)" aria-hidden="true"></i>
                <i class="fa fa-trash pull-right" @click="deleteQuestion(question)" aria-hidden="true"></i>
                <i class="fa fa-pencil pull-right" @click="editQuestion(question)" v-if="!question.editing" aria-hidden="true"></i>
                <i class="fa fa-save pull-right" @click="saveQuestionEdits(question)" v-if="question.editing" aria-hidden="true"></i>
                <hr>
                <poll-detail :question="question"></poll-detail>
            </div>
        </div>
        <p v-if="!latest_question_list">No polls are available.</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import PollDetail from './PollDetail.vue';
    export default {
        data(){
            return {
                latest_question_list: []
            }
        },
        components: {PollDetail},
        created: function(){
            axios.get('http://localhost:8000/polls/questions')
            .then((response) => {
                this.latest_question_list = response.data.map((question)=> {
                    return {
                        id: question.id,
                        expanded: false,
                        visible: true,
                        editing: false,
                        question_text: question.question_text
                    }
                });
            })
            .catch((err) => console.log(err));
        },
        computed: {
            detail_url: function (id) {
                return 'http://localhost:8000/questions/' + id
            }
        },
        methods: {
            changeArrowDirection(question) {
                question.expanded =!question.expanded;
            },
            deleteQuestion(question) {
                axios.delete('http://localhost:8000/polls/questions/' + question.id)
                .then((response) => {
                    question.visible = false;
                })
                .catch((err) => console.log(err));
            },
            editQuestion(question) {
                question.editing = !question.editing;
            },
            saveQuestionEdits(question) {
                question.editing = !question.editing;
                axios.put('http://localhost:8000/polls/questions/' + question.id + "/", {
                    question_text: question.question_text
                })
                .then((response) => {

                })
                .catch((err) => console.log(err));
            }
        }
    }
</script>




