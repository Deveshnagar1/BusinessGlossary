export const csvData = `DOMAIN,LOGICAL TAB NAME,ATTRIB NAME,Physc Name,Tab Name,DEFINE
Member,Member Address Dimension,Latitude Number,GIS_LAT,TABLE_ADR,The geographic latitude coordinate of the member's address
Member,Member Address Dimension,Longitude Number,GIS_LONG,TABLE_ADR,The geographic longitude coordinate of the member's address
Provider,Provider Enrollment Fact,Amount Owed,AMT_OWED,TABLE_ENROLL,Amount owed provider.
Provider,Provider License Fact,License Date,DTE_LIC,TABLE_LICE_FACT,Date of the provider's license.
Finance,Finance Transaction Dimension,Type Code,CDE_TYPE,TABLE_XN_DIM,A code representing the type of payment.
Finance,Finance Transaction Dimension,Type Description,DSC_TYPE,TABLE_XN_DIM,A description of the payment type.
Claim,Claim Benefits Group Dimension,Adjustment Reason,ADI_REASON,TABLE_EOB_DIM,A detailed explanation of the reason made to a transaction
Claim,Claim Error Dimension,Error Status Code,CDE_EOB,TABLE_ERR_DIM,A code representing the error status`;