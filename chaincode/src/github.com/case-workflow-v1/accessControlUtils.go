package main

import (
	"crypto/x509"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
)

func getTxCreatorInfo(stub shim.ChaincodeStubInterface) (string, string, error) {
	var mspid string
	var err error
	var cert *x509.Certificate

	mspid, err = cid.GetMSPID(stub)
	if err != nil {
		fmt.Printf("Error getting MSP identity: %s\n", err.Error())
		return "", "", err
	}

	cert, err = cid.GetX509Certificate(stub)
	if err != nil {
		fmt.Printf("Error getting client certificate: %s\n", err.Error())
		return "", "", err
	}

	return mspid, cert.Issuer.CommonName, nil
}

func authenticateFBIOrg(mspID string, certCN string) bool {
	return (mspID == "FBIOrgMSP") && (certCN == "ca.fbi.justice.com")
}

func authenticateNYPDOrg(mspID string, certCN string) bool {
	return (mspID == "NYPDOrgMSP") && (certCN == "ca.nypd.justice.com")
}

func authenticateNJSPOrg(mspID string, certCN string) bool {
	return (mspID == "NJSPOrgMSP") && (certCN == "ca.njsp.justice.com")
}

func authenticateJudiciaryOrg(mspID string, certCN string) bool {
	return (mspID == "JudiciaryOrgMSP") && (certCN == "ca.judiciary.justice.com")
}