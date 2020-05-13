<template>
    <div>
        <h2> Add Suspect </h2>
        <form>
            <div class="form-group">
                <label for="id">ID</label>
                <input type="text" v-model="id" name="id" class="form-control" />
            </div> 
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="name" name="name" class="form-control" />
            </div>
            <div class="form-group">
                <button type="submit" @click="addSuspect" class="btn btn-primary">Add Suspect</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props: {
        caseId: { 
            required: true,
        },
    },
    data() {
        return {
            id: "",
            name: ""
        }
    },
    methods: {
        addSuspect(e) {
            e.preventDefault()
            axios.post('http://localhost:4000/chaincode/addSuspectToCase',
                {
                    args: [this.caseId, this.id, this.name],
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
                    console.log("Could not add suspect")
                    return
                }

                console.log("Added suspect successfully");
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