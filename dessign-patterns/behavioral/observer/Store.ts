class Store {
    private readonly notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    newItemPromotion() {
        this.notificationService.notify();
    }

    getService() {
        return this.notificationService;
    }
}

class NotificationService{
    private readonly customers : EventListener[] = [];

    subscribe(listener: EventListener) {
        this.customers.push(listener);
    }

    unSubscribe(listener: EventListener) {
        this.customers.slice(this.customers.indexOf(listener), 1);
    }

    notify() {
        this.customers.forEach(listener => listener.update("New item promotion"));
    }
}

interface EventListener {
    update(algo : string): string;
}

class MobileAppListener implements EventListener {

    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
    
    update(a: string): string {
        return `New item promotion: ${a}`;
    }

}


// Uso del patron observer en typeScript
