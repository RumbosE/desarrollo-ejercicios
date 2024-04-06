interface IVideoDownloader {    
    getVideo(videoName: string): Video;
}

class Video {
    constructor(public name: string) {}
}

class RealVideoDownloader implements IVideoDownloader {
    getVideo(videoName: string): Video {
        console.log(`connecting to https://www.youtube.com/`);
        console.log(`downloading video`);
        console.log('Retrieving video metadata');
        console.log(' ');
        console.log('--------------------');
        return new Video(videoName);
    }
}

class ProxyVideoDownloader implements IVideoDownloader {
    private downloader: IVideoDownloader;
    private cache: Map<string, Video>;

    constructor() {
        this.downloader = new RealVideoDownloader();
        this.cache = new Map<string, Video>();
    }

    getVideo(videoName: string): Video {
        if (!this.cache.has(videoName)) {
            const video = this.downloader.getVideo(videoName);
            this.cache.set(videoName, video);
        }
        return<Video> this.cache.get(videoName);
    }
}

// Usage
const downloader: IVideoDownloader = new ProxyVideoDownloader();

downloader.getVideo('video1');
downloader.getVideo('video2');
downloader.getVideo('video1');
downloader.getVideo('video1');
downloader.getVideo('video1');
downloader.getVideo('video2');

