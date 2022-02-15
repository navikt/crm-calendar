public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<WorkOrder> getAllWorkOrders() {
        List<WorkOrder> allWorkOrders = [SELECT FIELDS(STANDARD) FROM WorkOrder];
        return allWorkOrders;
    }
}
