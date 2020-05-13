<template>
    <div>
        <h2> Case {{ this.caseDataComputed.id }} </h2>
        <button @click="addSuspect"> Add Suspect </button>
        <table>
            <tbody>
                <tr> <td> Title </td> <td> {{ this.caseDataComputed.title }} </td> </tr>
                <tr> <td> Created At </td> <td> {{ this.caseDataComputed.created }} </td> </tr>
                <tr> <td> Description </td> <td> {{ this.caseDataComputed.description }}  </td> </tr>
                <tr> <td> Evidence </td> <td> {{ this.caseDataComputed.evidence }} </td> </tr>
                <tr> <td> Status </td> <td> {{ this.caseDataComputed.status }} </td> </tr>
                <tr> <td> Suspects </td> <td> {{ this.caseDataComputed.suspects }} </td> </tr>
            </tbody>
        </table>
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
            suspectId: "",
            gridColumns: ["id", "title", "description", "created", "suspects", "evidence"],
            caseData: {
                created: "0001-01-01T00:00:00Z",
                description: "Murder crime was committed on the Orient Express train",
                evidence: 0,
                id: "case#1",
                status: 0,
                suspects: 0,
                title: "Murder at the Orient Express",
            }
        }
    },
    methods: {
        addSuspect(e) {
            e.preventDefault()
            this.$router.push('/addSuspect')
        }
    },
    computed: {
        auth() {
            return this.$store.getters.userAuth
        },
        caseDataComputed() {
            var data = this.caseData;
            data.status = (data.status === 0)? "Ongoing" : "Closed"
            // data.suspects = (data.suspects == null)? 0 : data[i].suspects;
            // data.evidence = (data.evidence == null)? 0 : data[i].evidence;
            if(data.created.length > 20){
                data.created = data.created.substring(0, 20)
            }
            return data;
        }
    },
    mounted() {
        console.log(this.caseId)
        axios.post('http://localhost:4000/chaincode/query/getCaseInfo', 
            {
                args: [this.caseId],
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
</script>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  display: inline-block;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
</style>