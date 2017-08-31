<template>
    <div>
        <input placeholder="username" v-model="username" required>
        <input placeholder="password" type="password" v-model="password" required>
        <div class="btn btn-info" @click="login()"> Login </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import authMixin from '../mixins/auth.vue';
    export default {
        extends: authMixin,
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
                    console.log(response);
                    console.log(this.$router);
                    this.$store.commit('setUser', response.token)
                    this.$router.push('/home');
                })
                .catch((err) => console.log(err));
            }
        }
    }
</script>