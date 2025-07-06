export const csvData = `DOMAIN,LOGICAL TAB NAME,ATTRIBUTE NAME,PHYSICAL TABLE NAME,TABLE NAME,DEFINITION,DATA TYPE
Member,Member Address Dimension,Latitude Number,GIS_LAT,TABLE_ADR,The geographic latitude coordinate of the member's address,Decimal(11,6)
Member,Member Address Dimension,Longitude Number,GIS_LONG,TABLE_ADR,The geographic longitude coordinate of the member's address,Decimal(11,6)
Member,Member Demographic Dimension,Gender Code,CDE_GNDR,TABLE_DEMO,A code representing gender of the member, used for demographic analysis,Varchar(10)
Provider,Provider Enrollment Dimension,Contract Description,PROC_CNTRCT,TABLE_ENROLL,Description of Provider Contract,Varchar(50)
Provider,Provider License Fact,License Date,DTE_LIC,TABLE_LICE_FACT,Date of the provider's license.,TIMESTAMP()
Finance,Finance Capitation Dimension,Medicare Indicator,CDE_TYPE,TABLE_FIN_CAP,A code representing if recipient covered by Medicare,Char(1)
Finance,Finance Transaction Dimension,Type Description,DSC_TYPE,TABLE_XN_DIM,A description of the payment type.,Varchar(50)
Claim,Claim Benefits Group Dimension,Adjustment Reason,ADI_REASON,TABLE_EOB_DIM,A detailed explanation of the reason made to a transaction,Varchar(100)
Claim,Claim Error Dimension,Error Status Code,CDE_EOB,TABLE_ERR_DIM,A code representing the error status,Varchar(5)
Claim,Claim Balance,C Type Code,CDE_CLM,TABLE_CLM_BAL,The claim type code that identifies type of service category,Char(1)`;