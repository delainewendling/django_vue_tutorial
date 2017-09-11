<style lang="sass">
    @import '../sass/partials/questions.sass';
</style>

<template>
    <div>
        <h1> Vote on the Latest Questions </h1>
        <question v-for="question in latest_question_list" :question="question" :key="question.id" :showEditControls="false"></question>
        <p v-if="!latest_question_list">No polls are available.</p>
    </div>
</template>

<script>
    import Question from './Question.vue';
    import QuestionMixin from '../mixins/questions.js';
    export default {
        components: {Question},
        mixins: [QuestionMixin]
    }
</script>




