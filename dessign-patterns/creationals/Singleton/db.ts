class Singleton {

    private static dbinstance: Singleton;

    private constructor() { }

    public static getInstance(): Singleton {
        if (!Singleton.dbinstance) {
            Singleton.dbinstance = new Singleton();
        }
        return Singleton.dbinstance;
    }

}