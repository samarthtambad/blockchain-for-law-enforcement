<template>
    <div>
        <h2> Add Case </h2>
        <div class="form-container">
            <form>
                <div class="form-group">
                    <label for="id">ID</label>
                    <input type="text" v-model="id" name="id" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" v-model="title" name="title" class="form-control" />
                </div> 
                <div class="form-group">
                    <label for="desc">Description</label>
                    <input type="text" v-model="desc" name="desc" class="form-control" />
                </div>
                <div class="form-group">
                    <button type="submit" @click="addCase" class="btn btn-primary">Add Case</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            id: "",
            title: "",
            desc: ""
        }
    },
    methods: {
        addCase(e) {
            e.preventDefault()
            axios.post('http://localhost:4000/chaincode/registerCase',
                {
                    args: [this.id, this.title, this.desc],
                    ccversion: "v1"
                },
                { headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.auth.token
                }
            })
            .then(response => {
                console.log(response)

                if(!response.data.success) {
                    console.log("Could not add case")
                    return
                }

                console.log("Case added successfully");
                this.$router.back()
            })
            .catch(function (error) {
                console.error(error.response);
            });
        }
    },
    computed: {
        auth() {
            return this.$store.getters.userAuth
        },
    }
}
</script>

<style scoped>
button {
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
}
form {
    display: table-caption;
}
.form-container{
    display: inline-block;
}
.form-group{
    padding: 5px;
}
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