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

        ServiceAppointment sa1 = new ServiceAppointment();
        sa1.ParentRecordId = wo1.Id;
        sa1.subject = 'Oppdrag 1';
        sa1.EarliestStartTime = Datetime.now();
        sa1.DueDate = Datetime.now().addHours(1);
        insert sa1;
    }

    @isTest
    static void workOrdersListNotEmpty() {
        //Henter data fra test-databasen og legger den i en WorkOrder-liste
        List<ServiceAppointment> allWorkOrders = CalendarWorkOrdersController.getObjects(
            'subject',
            'EarliestStartTime',
            'DueDate',
            'ServiceAppointment'
        );

        //Sjekker at listen har 1 entry.
        System.assertEquals(1, allWorkOrders.size());
        //System.assertNotEquals(2, allWorkOrders.size());
    }

    @isTest
    static void workOrderListSubjectMatches() {
        //Henter data fra test-databasen og legger den i en WorkOrder-liste
        List<WorkOrder> allWorkOrders = CalendarWorkOrdersController.getObjects(
            'subject',
            'StartDate',
            'EndDate',
            'WorkOrder'
        );

        //Sjekker at første entry sitt subject er 'Arbeidsordre 1'
        System.assertEquals('Arbeidsordre 1', allWorkOrders[0].subject);
        System.assertNotEquals('Arbekjdsårdre 1', allWorkOrders[0].subject);
    }
}
