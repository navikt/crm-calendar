Account acc1 = new Account();
acc1.name = 'Jedi Order'';
insert acc1;

Account acc2 = new Account();
acc2.name = 'The Empire';
insert acc2;

Account acc3 = new Account();
acc3.name = 'The Trade Federation';
insert acc3;

Account acc4 = new Account();
acc4.name = 'The Rebels';
insert acc4;

WorkOrder wo1 = new WorkOrder();
wo1.subject ='Arbeidsordre 1';
wo1.StartDate = Datetime.now();
wo1.EndDate= Datetime.now().addHours(1);
insert wo1;

WorkOrder wo2 = new WorkOrder();
wo2.subject ='Arbeidsordre 2';
wo2.StartDate = Datetime.now().addDays(1);
wo2.EndDate= Datetime.now().addDays(1).addHours(2);
insert wo2;

WorkOrder wo3 = new WorkOrder();
wo3.subject ='Arbeidsordre 3';
wo3.StartDate = Datetime.now().addDays(3);
wo3.EndDate= Datetime.now().addDays(3).addHours(4);
insert wo3;

WorkOrder wo4 = new WorkOrder();
wo4.subject ='Arbeidsordre 4';
wo4.StartDate = Datetime.now().addHours(5);
wo4.EndDate= Datetime.now().addHours(8);
insert wo4;

ServiceAppointment sa1 = new ServiceAppointment();
sa1.ParentRecordId = wo1.Id;
sa1.subject = 'Oppdrag 1';
sa1.EarliestStartTime = Datetime.now();
sa1.DueDate = Datetime.now().addHours(1);
insert sa1;

ServiceAppointment sa2 = new ServiceAppointment();
sa2.ParentRecordId = wo2.Id;
sa2.subject = 'Tolkeoppdrag';
sa2.EarliestStartTime = Datetime.now().addDays(1);
sa2.DueDate = Datetime.now().addDays(1).addHours(2);
insert sa2;

ServiceAppointment sa3 = new ServiceAppointment();
sa3.ParentRecordId = wo3.Id;
sa3.subject = 'Megaoppdrag i Bergen';
sa3.EarliestStartTime = Datetime.now().addDays(3);
sa3.DueDate = Datetime.now().addDays(3).addHours(4);
insert sa3;

ServiceAppointment sa4 = new ServiceAppointment();
sa4.ParentRecordId = wo4.Id;
sa4.subject = 'Tolk til foreldresamtale';
sa4.EarliestStartTime = Datetime.now().addHours(5);
sa4.DueDate = Datetime.now().addHours(8);
insert sa4;