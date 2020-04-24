package main

import "github.com/hyperledger/fabric/core/chaincode/shim"

// get unique key of given case id
func getCaseKey(stub shim.ChaincodeStubInterface, caseID string) (string, error) {
	caseKey, err := stub.CreateCompositeKey("Case", []string{caseID})
	if err != nil {
		return "", err
	} else {
		return caseKey, nil
	}
}
