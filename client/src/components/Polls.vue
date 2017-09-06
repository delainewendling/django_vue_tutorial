//    Do things here to get the questions from the database
<style>
    .fa {
        cursor: pointer;
    }
</style>

<template>
    <div>
        <h1> Vote on the Latest Questions </h1>
        <question v-for="question in latest_question_list" :question="question" :showEditControls="false"></question>
        <p v-if="!latest_question_list">No polls are available.</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import Question from './Question.vue';
    export default {
        data(){
            return {
                latest_question_list: []
            }
        },
        components: {Question},
        created: function(){
            axios.get('http://localhost:8000/polls/questions')
            .then((response) => {
                this.latest_question_list = response.data.map((question)=> {
                    return {
                        id: question.id,
                        expanded: false,
                        question_text: question.question_text
                    }
                });
            })
            .catch((err) => console.log(err));
        },
        destroyed() {
            this.$destroy();
        },
        computed: {
            detail_url: function (id) {
                return 'http://localhost:8000/questions/' + id
            }
        }
    }
</script>




