package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type CaseWorkflowChaincode struct {
	testMode bool
}

// CaseWorkflowChaincode implementation
func (c *CaseWorkflowChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("Initializing Case Workflow")

	var err error
	var args []string
	_, args = stub.GetFunctionAndParameters()

	// Upgrade Mode 1: leave ledger state as it was
	if len(args) == 0 {
		return shim.Success(nil)
	}

	// Upgrade mode 2: change all the names and case details
	if len(args) != 4 {
		err = errors.New(fmt.Sprintf("Incorrect number of arguments. Expecting 4: {"+
			"Police Org 1, "+
			"Police Org 2, "+
			"Police Org 3, "+
			"Judiciary, "+
			"}. Found %d", len(args)))
		return shim.Error(err.Error())
	}

	fmt.Printf("FBI: %s\n", args[0])
	fmt.Printf("Police Org 2: %s\n", args[1])
	fmt.Printf("Police Org 3: %s\n", args[2])
	fmt.Printf("Judiciary: %s\n", args[3])

	// Map participant identities to their roles on the ledger ?
	//roleKeys := []string{expKey, ebKey, expBalKey, impKey, ibKey, impBalKey, carKey, raKey, lenKey, lenBalKey}
	//for i, roleKey := range roleKeys {
	//	err = stub.PutState(roleKey, []byte(args[i]))
	//	if err != nil {
	//		fmt.Errorf("Error recording key %s: %s\n", roleKey, err.Error())
	//		return shim.Error(err.Error())
	//	}
	//}

	return shim.Success(nil)
}

func (c *CaseWorkflowChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	var creatorOrg, creatorCertIssuer string
	var err error

	fmt.Println("CaseWorkflow Invoke")

	if !c.testMode {
		creatorOrg, creatorCertIssuer, err = getTxCreatorInfo(stub)
		if err != nil {
			fmt.Errorf("Error extracting creator identity info: %s\n", err.Error())
			return shim.Error(err.Error())
		}
		fmt.Printf("CaseWorkflow Invoke by '%s', '%s'\n", creatorOrg, creatorCertIssuer)
	}

	function, args := stub.GetFunctionAndParameters()
	if function == "queryTest" {
		// Importer requests a trade
		return c.queryTest(stub, args)
	}

	return shim.Error("Invalid invoke function name")
}

// register a case. Input: ID, Title, Desc
func (c *CaseWorkflowChaincode) registerCase(stub shim.ChaincodeStubInterface, creatorOrg string, creatorCertIssuer string, args[] string) pb.Response {

	var err error
	var caseKey string
	var caseItem *Case
	var caseItemBytes []byte

	// Access control: All Org except Judiciary can invoke this transaction
	if !c.testMode && authenticateJudiciaryOrg(creatorOrg, creatorCertIssuer) {
		return shim.Error("Caller a member of Judiciary Org. Access denied.")
	}

	// verify args: ID, Title, Desc
	if len(args) != 3 {
		err = errors.New(fmt.Sprintf("Incorrect number of arguments. Expecting 3: {ID, Title, Description of Case}. Found %d", len(args)))
		return shim.Error(err.Error())
	}

	// generate bytes for case
	caseItem = &Case{ Id: args[0], Title: args[1], Desc: args[2] }
	caseItemBytes, err = json.Marshal(caseItem)
	if err != nil { return shim.Error("Error marshaling case item structure") }

	// write to world state
	caseKey, err = getCaseKey(stub, args[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	err = stub.PutState(caseKey, caseItemBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Printf("Case %s registered\n", args[0])
	return shim.Success(nil)
}

// get current information of case with ID from world state
func (c *CaseWorkflowChaincode) getCaseInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	// Access control: None, all org in n/w can invoke this transaction

	// verify args: ID
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1: {ID}")
	}


	return shim.Success(nil)
}

func (c *CaseWorkflowChaincode) queryTest(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	//   0
	// "queryString"
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryString := args[0]
	queryResults, err := getQueryResultForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string)([] byte, error) {
	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)
	resultsIterator, err := stub.GetQueryResult(queryString)
	defer resultsIterator.Close()
	if err != nil {
		return nil, err
	}
	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")
		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())
	return buffer.Bytes(), nil
}

func main() {
	ch := new(CaseWorkflowChaincode)
	ch.testMode = true
	err := shim.Start(ch)
	if err != nil {
		fmt.Printf("Error starting Case Workflow chaincode: %s", err)
	}
}
