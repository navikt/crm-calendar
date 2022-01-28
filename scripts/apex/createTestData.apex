Person__c person = HOT_TestDataFactory.createPerson();
person.Name = '12015678999';
insert person;
Person__c person2 = HOT_TestDataFactory.createPerson();
person2.Name = '12015677455';
insert person2;
Account personAccount = HOT_TestDataFactory.createAccount(true);
personAccount.INT_PersonIdent__c = '12015678999';
personAccount.CRM_Person__c = person.Id;
insert personAccount;
Account personAccount2 = HOT_TestDataFactory.createAccount(true);
personAccount2.INT_PersonIdent__c = '12015677455';
personAccount2.CRM_Person__c = person2.Id;
insert personAccount2;
Account businessAccount = HOT_TestDataFactory.createAccount(false);
businessAccount.INT_OrganizationNumber__c = '987654321';
insert businessAccount;
Account businessAccount2 = HOT_TestDataFactory.createAccount(false);
businessAccount2.INT_OrganizationNumber__c = '667654321';
insert businessAccount2;

WorkType workType = HOT_TestDataFactory.createWorkType();
insert workType;

HOT_Request__c request = HOT_TestDataFactory.createRequest('Forespørsel 2', workType);
insert request;

HOT_Request__c request = HOT_TestDataFactory.createRequest('Testforespørsel', workType);
insert request;
request.Status__c = 'Godkjent';
update request;

HOT_Request__c request = HOT_TestDataFactory.createRequest('Forespørsel 2', workType);
insert request;
request.Status__c = 'Godkjent';
update request;