public with sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static WorkOrder getWorkOrder() {
        WorkOrder myWorkOrders = [SELECT subject, StartDate, EndDate FROM WorkOrder];
        return myWorkOrders;
    }
}
