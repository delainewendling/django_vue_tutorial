<template>
    <div>
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
            <div> <i class="fa fa-plus" aria-hidden="true" @click="addNewChoice(question)"></i></div>
            <input placeholder="New Answer Text" v-model="question.answerText" v-if="question.addingQuestion">
            <div class="btn btn-default" v-if="question.addingQuestion" @click="saveNewChoice(question)"> Save Answer</div>
            <div v-if="question.showChoices">
                <h5> Current Answer Choices </h5>
                <choice v-for="choice in choices" :choice="choice" :key="choice.id" @delete="deleteChoice"> </choice>
            </div>
        </span>
        <hr>
        <poll-detail :question="question"></poll-detail>
    </div>
</template>

<script>
import {axiosHelpers} from '../mixins/axiosHelpers.js';
import PollDetail from './PollDetail.vue';
import Choice from './Choice.vue';
export default {
    data() {
        return {
            choices: []
        }
    },
    props: ['question', 'showEditControls'],
    components: {PollDetail, Choice},
    created: function() {
        axiosHelpers.getRequest('http://localhost:8000/polls/choices/'+this.question.id+'/get_choices')
        .then((response) => {
            this.choices = response.data.map((choice) => choice);
        })
        .catch((err) => console.log(err));
    },
    methods: {
         changeArrowDirection(question) {
            question.expanded =!question.expanded;
         },
         deleteQuestion(question) {
            axiosHelpers.deleteRequest('http://localhost:8000/polls/questions/' + question.id)
            .then((response) => {
                this.$emit('delete', question.id);
            })
            .catch((err) => console.log(err));
        },
        deleteChoice(choiceId){
            this.choices = this.choices.filter((choice)=> choice.id != choiceId);
        },
        editQuestion(question) {
            question.editing = !question.editing;
        },
        saveQuestionEdits(question) {
            question.editing = !question.editing;
            axiosHelpers.put('http://localhost:8000/polls/questions/' + question.id + "/", {
                question_text: question.question_text
            })
            .then((response) => {
mkdir clien
            })
            .catch((err) => console.log(err));
        },
        addNewChoice(question) {
            question.addingQuestion = !question.addingQuestion;
            question.showChoices = !question.showChoices;
        },
        saveNewChoice(question){
            axiosHelpers.postRequest('http://localhost:8000/polls/choices/'+question.id+'/add_choice/', {choice_text: question.answerText})
            .then((response) => {

            })
            .catch((err) => console.log(err));
        }
    }
}
</script>