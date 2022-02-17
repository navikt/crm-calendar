public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<WorkOrder> getAllWorkOrders() {
        //dette er måten å få tak i iden til innlogget bruker på.
        // Id userId = UserInfo.getUserId(); ++ denne på query: WHERE xxxx = :userId
        List<WorkOrder> allWorkOrders = [SELECT FIELDS(STANDARD) FROM WorkOrder];
        return allWorkOrders;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        List<Account> allAccounts = [SELECT FIELDS(STANDARD) FROM ACCOUNT];
        return allAccounts;
    }
}
