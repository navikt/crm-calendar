public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getObjects(String param) {
        String variable = param;
        List<SObject> objects = (List<SObject>) Database.query(
            'SELECT Id, StartDate, EndDate, Subject FROM ' + variable
        );
        return objects;
    }

    /*    @AuraEnabled(cacheable=true)
    public static List<WorkOrder> getAllWorkOrders() {
        //dette er måten å få tak i iden til innlogget bruker på.
        // Id userId = UserInfo.getUserId(); ++ denne på query: WHERE xxxx = :userId
        List<WorkOrder> allWorkOrders = Database.query('SELECT FIELDS(STANDARD) FROM WorkOrder');
        return allWorkOrders;
    }
    //Accounts
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        List<Account> allAccounts = Database.query('SELECT FIELDS(STANDARD) FROM ACCOUNT');
        return allAccounts;
    }
    //ServiceAppointments
    @AuraEnabled(cacheable=true)
    public static List<ServiceAppointment> getAllServiceAppointments() {
        List<ServiceAppointment> allServiceAppointments = Database.query(
            'SELECT FIELDS(STANDARD) FROM ServiceAppointment'
        );
        return allServiceAppointments;
    } */
}
