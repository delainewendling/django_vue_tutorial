<template>
    <div class="question-form">
        <input class="question-name" placeholder="Question Text" v-model="question_text">
        <div class="btn btn-default" @click="saveQuestion()"> Save Question </div>
    </div>
</template>

<script>
import {axiosHelpers} from '../mixins/axiosHelpers.js';
export default {
    data(){
        return {
            question_text: ''
        }
    },
    methods: {
        saveQuestion() {
            axiosHelpers.postRequest('http://localhost:8000/polls/questions/', {
                question_text: this.question_text
            })
            .then((response) => {
                this.question_text = '';
                this.$emit('add', response);
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>