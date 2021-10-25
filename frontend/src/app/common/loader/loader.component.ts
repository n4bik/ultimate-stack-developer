import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from './services/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @ViewChild('loader') private loaderElemRef: ElementRef;
    @ViewChild('loaderText') private loaderTextElemRef: ElementRef;
    loading: boolean;
    currentTime;

    constructor(private loaderService: LoaderService) {
        this.loaderService.isLoading.subscribe((isLoading) => {
            if (isLoading) {
                this.resetLoaderIntroAnimation();
                this.setLoaderTextAnimation();
            }
            this.loading = isLoading;
        });
    }

    ngOnInit() {
    }

    private resetLoaderIntroAnimation() {
        // Generation of the random number prevents browser from
        // stopping this one-shot gif animation on last frame
        // (if you'd like to see how it looks like, just comment
        // out content of this method)

        this.currentTime = new Date().getTime();
        this.loaderElemRef.nativeElement.src =
            'assets/animations/loader-intro.gif?a=' + this.currentTime;
    }

    private setLoaderTextAnimation() {
        this.loaderTextElemRef.nativeElement.src =
            'assets/animations/loading-text.gif';
    }
}
