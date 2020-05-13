<template>
    <div>
        <h2> Add Suspect </h2>
    </div>
</template>

<script>
export default {
    methods: {
        addSuspect(e) {
            e.preventDefault()
            axios.post('http://localhost:4000/chaincode/addSuspectToCase', 
                {
                    args: [this.caseId, "suspect#1", "James Bond"],
                    ccversion: "v1"
                },
                { headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.auth.token
                }
            })
            .then(response => {
                console.log(response)

                if(response.data.success) {
                    console.log("Fetched case successfully");
                    var data = JSON.parse(response.data.message)
                    console.log(data)
                    this.caseData = data
                } else {
                    console.log(response)
                }

            })
            .catch(function (error) {
                console.error(error.response);
            });

        }
    }
}
</script>

<style scoped>

</style>