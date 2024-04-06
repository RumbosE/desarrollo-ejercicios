class VideoConverter{
    
    constructor(protected fileName: string, protected format: string){
        this.fileName = fileName;
        this.format = format;
    }

    public convertVideo(fileName: string, format: string): string {
        let file = new VideoFile(fileName);
        let sourceCodec = CodecFactory.extract(file);
        
        if(format === 'mp4'){
            return `Convert ${sourceCodec} to mp4`;
        }else if(format === 'ogg'){
            return `Convert ${sourceCodec} to ogg`;
        }
        return 'Format not supported';
    }
}

class VideoFile{
    constructor( public fileName: string ){
        this.fileName = fileName;
    }
    
    getFileName(): string{
        return this.fileName;
    }
}

class CodecFactory{
    static extract(file: VideoFile): string{
        return file.getFileName();
    }
}