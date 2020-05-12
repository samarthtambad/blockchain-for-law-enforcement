<template>
    <div>
        <h2> List of Cases </h2>
        <table>
            <thead>
                <tr>
                    <th v-for="key in gridColumns">
                    {{ key | capitalize }}
                        <!-- <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                        </span> -->
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in gridDataComputed">
                    <td v-for="key in gridColumns">
                        {{entry[key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            gridColumns: ["id", "title", "description", "created", "suspects", "evidence"],
            gridData: [
                { id: "case#1", title: "Murder at the Orient Express", description: "Murder crime was committed on the Orient Express train", created: "2019-11-10 23:00:00 +0000 UTC m=+0.000000001", suspects: {}, evidence: {}},
                { id: "case#2", title: "Burglary at Bank", description: "A burglar entered the bank at 11 am and ...", created: "2018-23-05 15:00:00 +0000 UTC m=+0.000000001", suspects: {}, evidence: {}}
            ]
        }
    },
    computed: {
        gridDataComputed() {
            var data = this.gridData;
            for(var i = 0; i < data.length; i++) {
                data[i].suspects = (Object.entries(data[i].suspects).length === 0)? 0 : data[i].suspects.length;
                data[i].evidence = (Object.entries(data[i].evidence).length === 0)? 0 : data[i].evidence.length;
                if(data[i].created.length > 20){
                    data[i].created = data[i].created.substring(0, 20)
                }
            }
            return data;
        }
    },
    filters: {
        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    methods: {
        fetchCases() {
            axios.post('http://localhost:4000/chaincode/queryTest', 
                {
                    args: ["{\"selector\": {\"status\": {\"eq\": 0}}}"],
                    ccversion: "v1"
                },
                { headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer {token}'
                }
            })
            .then(response => {
                console.log(response)

                if(response.data.success) {
                    console.log("Fetched cases successfully");
                    // this.$router.push('/case')
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

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>