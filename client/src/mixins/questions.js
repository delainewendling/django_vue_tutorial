import {axiosHelpers} from '../mixins/axiosHelpers.js';

const questionMixin = {
    data(){
        return {
            latest_question_list: []
        }
    },
    created: function(){
        axiosHelpers.getRequest('http://localhost:8000/polls/questions')
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
    }
}

export default questionMixin;