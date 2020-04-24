package main

type EvidenceType int
const (
	PhysicalEvidence EvidenceType = iota	// in the form of a physical object
	ForensicEvidence						// scientific in nature
	DigitalEvidence							// emails, hard drives, cell phone logs, etc
	DocumentaryEvidence						// contracts, wills, invoices, etc.
	DemonstrativeEvidence					// photographs, videos, sound recordings, x-rays, etc.
	TestimonialEvidence						// by a witness
)

type SuspectStatus int
const (
	UnderInvestigation SuspectStatus = iota
	Eliminated
)

type CaseStatus int
const(
	Ongoing CaseStatus = iota
	Closed
)
