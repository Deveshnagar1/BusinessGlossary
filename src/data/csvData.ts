export const csvData = `DOMAIN,LOGICAL TAB NAME,ATTRIBUTE NAME,PHYSICAL TABLE NAME,TABLE NAME,DATA TYPE,DEFINITION
Member,Member Address Dimension,Latitude Number,GIS_LAT,TABLE_ADR,"Decimal(11,6)",The geographic latitude coordinate of the member's address
Member,Member Address Dimension,Longitude Number,GIS_LONG,TABLE_ADR,"Decimal(11,6)",The geographic longitude coordinate of the member's address
Member,Member Demographic Dimension,Gender Code,CDE_GNDR,TABLE_DEMO,Varchar(5),"A code representing gender of the member, used for demograhic analysis"
Provider,Provider Enrollment Dimension,Contract Description,PROC_CNTRCT,TABLE_ENROLL,Varchar(50),Description of Provider Contract
Provider,Provider License Fact,License Date,DTE_LIC,TABLE_LICE_FACT,TIMESTAMP(),Date of the provider's license.
Finance,Finance Capitation Dimension,Medicare Indicator,CDE_TYPE,TABLE_FIN_CAP,Char(1),A code representing if recipient covered by Medicare
Finance,Finance Transaction Dimension,Type Description,DSC_TYPE,TABLE_XN_DIM,Varchar(50),A description of the payment type.
Claim,Claim Benefits Group Dimension,Adjustment Reason,ADI_REASON,TABLE_EOB_DIM,Varchar(100),A detailed explanation of the reason made to a transaction
Claim,Claim Error Dimension,Error Status Code,CDE_EOB,TABLE_ERR_DIM,Varchar(5),A code representing the error status
Claim,Claim Balance,C Type Code,CDE_CLM,TABLE_CLM_BAL,Char(1),The claim type code that identifies type of service category`;