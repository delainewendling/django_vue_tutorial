<template>
    <div v-if="question.visible">
        <span v-if="!question.editing">{{ question.question_text }}</span>
        <input v-model="question.question_text" v-if="question.editing">
        <span v-if="!showEditControls">
            <i class="fa fa-caret-down" v-if="!question.expanded" @click="changeArrowDirection(question)" aria-hidden="true"></i>
            <i class="fa fa-caret-up" v-if="question.expanded" @click="changeArrowDirection(question)" aria-hidden="true"></i>
        </span>
        <span v-if="showEditControls">
            <i class="fa fa-trash pull-right" @click="deleteQuestion(question)" aria-hidden="true"></i>
            <i class="fa fa-pencil pull-right" @click="editQuestion(question)" v-if="!question.editing" aria-hidden="true"></i>
            <i class="fa fa-save pull-right" @click="saveQuestionEdits(question)" v-if="question.editing" aria-hidden="true"></i>
        </span>
        <hr>
        <poll-detail :question="question" v-if="!showEditControls"></poll-detail>
    </div>
</template>

<script>
import axios from 'axios';
import PollDetail from './PollDetail.vue';
export default {
    props: ['question', 'showEditControls'],
    components: {PollDetail},
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