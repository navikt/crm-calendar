@isTest
private class CalendarWorkOrdersControllerTest {
    @TestSetup
    static void makeData() {
        //Legger til test-workOrder
        WorkOrder wo1 = new WorkOrder();
        wo1.subject = 'Arbeidsordre 1';
        wo1.StartDate = Datetime.now();
        wo1.EndDate = Datetime.now().addHours(1);
        insert wo1;

        //Legger til test-Account
        Account acc1 = new Account();
        acc1.Name = 'Jedi Order';
        insert acc1;
    }

    @isTest
    static void workOrdersListNotEmpty() {
        //Henter data fra test-databasen og legger den i en WorkOrder-liste
        List<WorkOrder> allWorkOrders = CalendarWorkOrdersController.getObjects('WorkOrder');

        //Sjekker at listen har 1 entry.
        System.assertEquals(1, allWorkOrders.size());
        //System.assertNotEquals(2, allWorkOrders.size());
    }

    @isTest
    static void workOrderListSubjectMatches() {
        //Henter data fra test-databasen og legger den i en WorkOrder-liste
        List<WorkOrder> allWorkOrders = CalendarWorkOrdersController.getObjects('WorkOrder');

        //Sjekker at første entry sitt subject er 'Arbeidsordre 1'
        System.assertEquals('Arbeidsordre 1', allWorkOrders[0].subject);
        System.assertNotEquals('Arbekjdsårdre 1', allWorkOrders[0].subject);
    }
}
