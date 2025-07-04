export const csvData = `Domain,Logical Table Name,Attribute Name,Physical Table Name,Definition,Data type
Customer,Customer Addr Dimension,Customer State Address,ADR_CUST_STATE,The state code for customer address information,varchar(2)
Customer,Customer Eligibility Fact,Region Certification Code,CDE_REGION_CERT,A code representing the regional certification authority,varchar(10)
Vendor,Vendor Dimension,Vendor Business Name,NAM_VENDOR_BIZ,The registered business name for vendor entity,varchar(50)
Finance,Financial Fact,Reference Number,NUM_REF,Financial transaction reference identifier,Decimal(9)
Transaction,Transaction Balance,Processing Date,DTE_PROCESS,System timestamp when transaction was processed,Timestamp()
Customer,Customer Demographics,Customer ID,CUSTOMER_ID,Unique identifier assigned to each customer for system tracking,VARCHAR(20)
Customer,Customer Demographics,Customer First Name,CUST_FIRST_NAME,The first name of the customer as recorded in the system,VARCHAR(50)
Customer,Customer Demographics,Customer Last Name,CUST_LAST_NAME,The last name of the customer as recorded in the system,VARCHAR(50)
Vendor,Vendor Dimension,Vendor Registration ID,VENDOR_REG_ID,National registration identifier for business vendors,VARCHAR(10)
Vendor,Vendor Dimension,Vendor Category,VENDOR_CATEGORY,Business category classification for the vendor,VARCHAR(100)
Transaction,Transaction Header,Transaction ID,TXN_ID,Unique identifier for each transaction submitted,VARCHAR(15)
Transaction,Transaction Header,Service Date,SVC_DATE,Date when the service was provided or transaction occurred,DATE
Finance,Financial Fact,Payment Amount,PMT_AMT,Total amount paid for the transaction,DECIMAL(10,2)
Finance,Financial Fact,Fee Amount,FEE_AMT,Service fee amount charged for the transaction,DECIMAL(8,2)
Product,Product Catalog,Product ID,PROD_ID,Unique identifier for each product in the catalog,VARCHAR(15)
Product,Product Catalog,Product Name,PROD_NAME,Display name of the product,VARCHAR(100)
Product,Product Catalog,Product Category,PROD_CATEGORY,Category classification for the product,VARCHAR(50)
Order,Order Header,Order ID,ORDER_ID,Unique identifier for each customer order,VARCHAR(20)
Order,Order Header,Order Date,ORDER_DATE,Date when the order was placed,DATE
Order,Order Details,Quantity,ORDER_QTY,Number of items ordered,INTEGER
Inventory,Inventory Tracking,Stock Level,STOCK_LEVEL,Current inventory count for the item,INTEGER
Inventory,Inventory Tracking,Warehouse Location,WAREHOUSE_LOC,Physical location code where inventory is stored,VARCHAR(10)
Analytics,Performance Metrics,Conversion Rate,CONVERSION_RATE,Percentage of visitors who complete desired action,DECIMAL(5,2)
Analytics,Performance Metrics,Session Duration,SESSION_DURATION,Average time spent in application session,INTEGER
Security,Access Control,User Role,USER_ROLE,Security role assigned to system user,VARCHAR(30)
Security,Access Control,Permission Level,PERMISSION_LEVEL,Access level granted to the user role,VARCHAR(20)
Configuration,System Settings,Configuration Key,CONFIG_KEY,Unique identifier for system configuration parameter,VARCHAR(50)
Configuration,System Settings,Configuration Value,CONFIG_VALUE,Value assigned to the configuration parameter,VARCHAR(200)
Audit,Audit Trail,Action Type,ACTION_TYPE,Type of action performed in the system,VARCHAR(50)
Audit,Audit Trail,Timestamp,AUDIT_TIMESTAMP,When the audited action occurred,TIMESTAMP`;