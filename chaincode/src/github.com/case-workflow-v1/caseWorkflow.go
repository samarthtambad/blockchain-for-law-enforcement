package main

import (
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

	fmt.Printf("Police Org 1: %s\n", args[0])
	fmt.Printf("Police Org 2: %s\n", args[1])
	fmt.Printf("Police Org 3: %s\n", args[2])
	fmt.Printf("Judiciary: %s\n", args[3])

	return shim.Success(nil)
}

func main() {

}
