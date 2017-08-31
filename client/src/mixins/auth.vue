
<script>
import axios from 'axios';
var loginFunction = {
    methods: {
        login() {
             axios.post('http://localhost:8000/polls/api-token-auth/', {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    console.log(response);
                    this.$store.commit('setToken', response.token)
                })
                .catch((err) => console.log(err));
        }
    }
}
</script>