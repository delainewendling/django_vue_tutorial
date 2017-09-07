import axios from 'axios';
const questionMixin = {
    data(){
        return {
            latest_question_list: []
        }
    },
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
    }
}

export default questionMixin;