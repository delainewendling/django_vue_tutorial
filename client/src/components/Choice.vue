<template>
    <div>
        <div> {{choice.choice_text}} </div>
        <i class="fa fa-trash pull-right" @click="deleteChoice(choice)" aria-hidden="true"></i>
        <i class="fa fa-pencil pull-right" @click="editChoice(choice)" v-if="!editing" aria-hidden="true"></i>
        <i class="fa fa-save pull-right" @click="saveChoiceEdits(choice)" v-if="editing" aria-hidden="true"></i>
    </div>
</template>

<script>
import {axiosHelpers} from '../mixins/axiosHelpers.js';
export default {
    data() {
        return {
            editing: false
        }
    },
    props : ['choice'],
    methods: {
        deleteChoice(choice) {
            axiosHelpers.deleteRequest("http://localhost:8000/polls/choices/"+choice.id+"/")
            .then((response) => {
                this.$emit('delete', choice.id);
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>
