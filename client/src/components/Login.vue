<template>
    <div>
        <input placeholder="username" v-model="username" required>
        <input placeholder="password" type="password" v-model="password" required>
        <div class="btn btn-info" @click="login()"> Login </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
         axios.post('http://localhost:8000/polls/api-token-auth/', {
                username: this.username,
                password: this.password
            })
            .then((response) => {
                this.$store.commit('setUser', response.token)
                this.$router.push('/home');
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>