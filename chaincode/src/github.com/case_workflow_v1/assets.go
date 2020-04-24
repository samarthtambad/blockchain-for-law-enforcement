package main

import "time"

type EvidenceItem struct {
	Type 		EvidenceType	`json:"type"`			// type of evidence
	CreatedAt	time.Time		`json:"created"`		// time of logging evidence
	Desc 		string			`json:"description"`	// description of the evidence
	// yet to add EvidenceType specific elements
}

type Suspect struct {
	Id			int				`json:"id"`			// unique identifier
	Name		string			`json:"name"`		// suspect's real name
	Status		SuspectStatus	`json:"status"`		// status of the suspect
	Evidence	[]EvidenceItem	`json:"evidence"`	// evidence against a particular suspect
}

type Case struct {
	Id			int				`json:"id"`			// unique identifier
	FileDate	time.Time		`json:"file"`		// date of case filing
	Suspects	[]Suspect		`json:"suspects"`	// suspects involved in the case
	Evidence	[]EvidenceItem	`json:"evidence"`	// evidence collected not related to a particular suspect
	Status		CaseStatus		`json:"status"`		// current status of the case
}
