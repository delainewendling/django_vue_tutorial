<template>
    <div v-if="question.expanded">
        <form method="post">
        <div v-for="(index, choice) in choices">
            <input type="radio" name="choice" id="choice + $index" :choice-id="choice.id" />
            <label for="choice + $index">{{ choice.choice_text }}</label><br />
        </div>
        <input type="submit" value="Vote" />
        </form>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            error_message: null,
            choices: []
        }
    },
    props : ['question'],
    created: function() {
        axios.get('http://localhost:8000/polls/choices/'+this.question.id)
        .then((response) => {
            this.choices = response.data
        })
        .catch((err) => console.log(err));
    }
}
</script>

<!--//<p><strong v-if="error_message">{{ error_message }}</strong></p>-->

<!--//        <div v-for="choice in question.choice_set.all">-->
<!--//            <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />-->
<!--//            <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br />-->
<!--//        </div>-->