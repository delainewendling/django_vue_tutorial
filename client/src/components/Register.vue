<style>
    .register-input {
        margin-bottom: 10px;
    }
</style>

<template>
    <div>
        <input class="register-input" placeholder="First Name" v-model="firstName" required><br>
        <input class="register-input" placeholder="Last Name" v-model="lastName" required><br>
        <input class="register-input" placeholder="Email" v-model="email" required><br>
        <input class="register-input" placeholder="password" type="password" v-model="password" required><br>
        <div class="btn btn-info" @click="login()"> Register </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        },
        methods: {
            login(){
                axios.post('http://localhost:8000/polls/accounts/', {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    username: this.email,
                    password: this.password
                })
                .then((response) => {
                     axios.post('http://localhost:8000/polls/api-token-auth/', {
                        username: this.username,
                        password: this.password
                    })
                    .then((response) => {
                        this.$store.commit('setToken', response.data.token)
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            }
        }
    }
</script>
