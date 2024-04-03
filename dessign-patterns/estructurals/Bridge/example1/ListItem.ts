abstract class ListItemView {

    viewModel: IViewModel; // esto es el bridge

    constructor(viewModel : IViewModel) {
        this.viewModel = viewModel;
    }

    render(): void {
        console.log('default abstract render')
    }
}

interface IViewModel {
    title(): string;
    image(): string;
}

class WithThumbnailListItemView extends ListItemView {
    render(): void {
        console.log('-------------------------------')
        console.log(`Here render with thumbnail: ${this.viewModel.image()}`)
        console.log(`${this.viewModel.title()}`)
        console.log('-------------------------------')
        console.log(' ')
    }
} 

class JustTextListItemView extends ListItemView {
    render(): void {
        console.log('-------------------------------')
        console.log(`Just render title: ${this.viewModel.title()}`)
        console.log('-------------------------------')
        console.log(' ')
    }
}

class VideoViewModel implements IViewModel {
    video: any;

    constructor(video: any){
        this.video = video;
    }

    title(): string {
        return `(VIDEO) ${this.video.title}`;
    }

    image(): string {
        return `(VIDEO) ${this.video.image}`
    }
}

class StreamViewModel implements IViewModel {
    stream: any;

    constructor(stream : any) {
        this.stream = stream;
    }

    title(): string {
        return `(STREAM) ${this.stream.title} active viewers: ${this.stream.viewers}`;
    }

    image(): string {
        return `(STREAM) ${this.stream.image}`
    }
}

//Probando el patron bridge

const content = [
    {
        type:  'video',
        title: 'Egoland 2: Tirando misiles',
        image: 'Amazing image'
    },
    {
        type:  'stream',
        title: 'JUGANDO A POKÉMON, UNANSE!',
        image: 'Amazing image',
        viewers: 10
    },
    {
        type:  'stream',
        title: 'SÚPER EXTENSIBLE PROGRAMANDO UNA SUB UN BUG',
        image: 'Amazing image',
        viewers: 12034
    },
    {
        type:  'video',
        title: 'Campanadas Ibai 2034',
        image: 'Amazing image'
    },
    {
        type:  'video',
        title: 'Jorge Salvaje programando un Eroge',
        image: 'Amazing image'
    }
];

const listView: ListItemView[] = []

for (let item of content) {

    if(item.type === 'video') {
        listView.push(
            Math.random() > 0.5 ?
                new WithThumbnailListItemView(new VideoViewModel(item)):
                new JustTextListItemView(new VideoViewModel(item))
        );
    } else if (item.type === 'stream') {
        listView.push(
            Math.random() > 0.5 ?
                new WithThumbnailListItemView(new StreamViewModel(item)):
                new JustTextListItemView(new StreamViewModel(item))
        )
    }

}

for (let view of listView) {
    view.render()
}