<template>
    <div>
        <h2>Login</h2>
        <form>
            <div class="form-group">
                <label for="organisation">Organisation</label>
                <select v-model="orgName">
                    <option v-for="organisation in organisations" v-bind:value="organisation.value">
                        {{ organisation.text }}
                    </option>
                </select>
                <span>Selected: {{ orgName }}</span>
            </div> 
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" />
            </div> 
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" />
            </div>
            <div class="form-group">
                <button type="submit" @click="handleSubmit" class="btn btn-primary">Login</button>
                <!-- <router-link to="/cases" class="btn btn-link">Register</router-link> -->
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data () {
        return {
            username: '',
            orgName: '',
            password: '',
            submitted: false,
            organisations: [
                { text: 'Federal Beureau of Investigation', value: 'fbi'},
                { text: 'New York Police Department', value: 'nypd'},
                { text: 'New Jersey State Police', value: 'njsp'},
                { text: 'Supreme Court', value: 'judiciary'}
            ]
        }
    },
    methods: {
        handleSubmit(e){
            e.preventDefault()
            if (this.password.length > 0) {
                axios.post('http://localhost:4000/login', 
                {
                    username: this.username,
                    orgName: this.orgName,
                    password: this.password
                },
                { headers: {
                    'Content-type': 'application/json',
                }
                })
                .then(response => {
                    console.log(response)

                    if(!response.data.success) {
                        console.log("Login unsuccessful")
                        return
                    }
                    console.log("Logged in successfully")
                    this.storeUserAuth(response)
                    // this.$store.state.auth.user = this.username
                    // this.$store.state.auth.secret = response.data.secret
                    // this.$store.state.auth.token = response.data.token
                    console.log(this.$store.state.auth)
                    
                    this.$router.push('/cases')
                })
                .catch(function (error) {
                    console.error(error.response);
                });
            }
        },
        storeUserAuth(response) {
            this.$store.state.auth.user = this.username
            this.$store.state.auth.secret = response.data.secret
            this.$store.state.auth.token = response.data.token
        }
    }
};
</script>

<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>