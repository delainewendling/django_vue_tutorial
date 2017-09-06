<template>
    <div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Brand</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li v-bind:class="{active: route === '/home'}" @click="changeActive('/home')"><a href="#/home">Home <span class="sr-only">(current)</span></a></li>
                <li v-bind:class="{active: route === '/polls'}" @click="changeActive('/polls')"><a href="#/polls" v-if="isAuthenticated">Polls</a></li>
                <li v-bind:class="{active: route === '/manage_questions'}" @click="changeActive('/manage_questions')" v-if="isAuthenticated"><a href="#/manage_questions">Manage Questions</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li class="pull-right" v-bind:class="{active: route === '/login'}" @click="changeActive('/login')" v-if="!isAuthenticated"><a href="#/login">Login</a></li>
                <li class="pull-right" v-bind:class="{active: route === '/register'}" @click="changeActive('/register')" v-if="!isAuthenticated"><a href="#/register">Register</a></li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
        <div class="container">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    export default {
        data() {
          return {
            route: this.$route.path
          }
        },
        methods: {
            changeActive(route){
                this.route = route
            }
        },
        computed: {
            ...mapGetters([
                'isAuthenticated'
            ])
        }
    }
</script>

