<style>
    .question-name {
        width: 300px;
    }

</style>

<template>
    <div>
        <h2> Add a New Question </h2>
        <new-question-form @add="addNewQuestion"></new-question-form>
        <hr>
        <h2> Edit Current Questions </h2>
        <question v-for="question in latest_question_list" :question="question" :key="question.id" :showEditControls="true"></question>
    </div>
</template>

<script>
import axios from 'axios';
import NewQuestionForm from './NewQuestionForm.vue';
import Question from './Question.vue';
export default {
    data(){
        return {
            latest_question_list: []
        }
    },
    components: {NewQuestionForm, Question},
    created: function(){
        axios.get('http://localhost:8000/polls/questions')
        .then((response) => {
            this.latest_question_list = response.data.map((question)=> {
                return {
                    id: question.id,
                    expanded: false,
                    editing: false,
                    visible: true,
                    question_text: question.question_text
                }
            });
        })
        .catch((err) => console.log(err));
    },
    destroyed() {
        this.$destroy();
    },
    methods: {
        addNewQuestion(response){
            const data = response.data;
            this.latest_question_list.unshift({
                id: data.id,
                expanded: false,
                editing: false,
                visible: true,
                question_text: data.question_text
            });

        }
    }
}
</script>
