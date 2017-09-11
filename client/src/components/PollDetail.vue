<template>
    <div v-if="question.expanded">
        <form method="post">
        <div v-for="(choice, index) in choices">
            <input type="radio" name="choice" id="choice + $index" />
            <label for="choice + $index">{{ choice }}</label><br />
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
        axios.get('http://localhost:8000/polls/'+this.question.id+'/choices/')
        .then((response) => {
            console.log(response);
            this.choices = response.data.choices.map((choice) => choice);
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