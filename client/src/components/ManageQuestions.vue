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
        <question v-for="question in latest_question_list" :question="question" :key="question.id" :showEditControls="true" @delete="deleteQuestion"></question>
    </div>
</template>

<script>
import NewQuestionForm from './NewQuestionForm.vue';
import Question from './Question.vue';
import QuestionMixin from './../mixins/questions.js';
export default {
    components: {NewQuestionForm, Question},
    mixins: [QuestionMixin],
    methods: {
        addNewQuestion(response){
            const data = response.data;
            this.latest_question_list = [{
                id: data.id,
                expanded: false,
                editing: false,
                question_text: data.question_text
            }, ...this.latest_question_list];
        },
        deleteQuestion(questionId){
            this.latest_question_list = this.latest_question_list.filter((question)=> question.id != questionId);
        }
    }
}
</script>
