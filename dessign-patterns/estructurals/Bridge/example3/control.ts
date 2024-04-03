class Remote implements IDevice{
    private d: IDevice | null = null;
    constructor(device: IDevice){
        this.d = device;
    }

    public isEnable(): boolean{
        return this.d!.isEnable();
    }

    public enable(){
        this.d!.enable();
    }

    public disable(){
        this.d!.disable();
    }

    public getVolume(){
        return this.d!.getVolume();
    }

    public setVolume(volume: number){
        this.d!.setVolume(volume);
    }

    public getChannel(){
        return this.d!.getChannel();
    }

    public setChannel(channel: number){
        this.d!.setChannel(channel);
    }

    public togglePower(){
        if(this.d!.isEnable()){
            this.d!.disable();
        }else{
            this.d!.enable();
        }
    }

    public volumeDown(){
        this.d!.setVolume(this.d!.getVolume() - 1);
    }

    public volumeUp(){
        this.d!.setVolume(this.d!.getVolume() + 1);
    }

    public channelDown(){
        this.d!.setChannel(this.d!.getChannel() - 1);
    }

    public channelUp(){
        this.d!.setChannel(this.d!.getChannel() + 1);
    }
}

interface IDevice{
    isEnable() : boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(volume: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

class RadioDevice implements IDevice{
    private volume: number = 1;
    private channel: number = 1;
    private active: boolean = false;

    public isEnable(): boolean{
        return this.active;
    }

    public enable(){
        this.active = true;
    }

    public disable(){
        this.active = false;
    }

    public getVolume(){
        return this.volume;
    }

    public setVolume(volume: number){
        this.volume = volume;
    }

    public getChannel(){
        return this.channel;
    }

    public setChannel(channel: number){
        this.channel = channel;
    }
}

class TvDevice implements IDevice{
    private volume: number = 1;
    private channel: number = 1;
    private active: boolean = false;

    public isEnable(): boolean{
        return this.active;
    }

    public enable(){
        this.active = true;
    }

    public disable(){
        this.active = false;
    }

    public getVolume(){
        return this.volume;
    }

    public setVolume(volume: number){
        this.volume = volume;
    }

    public getChannel(){
        return this.channel;
    }

    public setChannel(channel: number){
        this.channel = channel;
    }
}

class  AdvancedRemote extends Remote{
    public mute(){
        this.setVolume(0);
    }
}

// uso de los dispositivos

const radio = new RadioDevice();
const remote = new Remote(radio);

remote.enable();
remote.setVolume(10);
remote.setChannel(100);
console.log(remote.isEnable());
console.log(remote.getVolume());
console.log(remote.getChannel());

const advancedRemote = new AdvancedRemote(radio);
advancedRemote.mute();
console.log(advancedRemote.getVolume());

const tv = new TvDevice();
const advanceRemoteTv = new AdvancedRemote(tv);

advanceRemoteTv.enable();
advanceRemoteTv.setVolume(20);
advanceRemoteTv.setChannel(50);
advanceRemoteTv.volumeDown();

console.log(`the volume of the tv is: ${advanceRemoteTv.getVolume()}`);
console.log(advanceRemoteTv.getChannel());