<template>
    <div class="question-form">
        <input class="question-name" placeholder="Question Text" v-model="question_text">
        <div class="btn btn-default" @click="saveQuestion()"> Save Question </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            question_text: ''
        }
    },
    methods: {
        saveQuestion() {
            axios.post('http://localhost:8000/polls/questions/', {
                question_text: this.question_text
            })
            .then((response) => {
                this.question_text = '';
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>