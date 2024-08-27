import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AnimationDirection, AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottie-standalone',
  template: ` <div class="lottie-container" [ngStyle]="{'width': width + 'px', 'height': height + 'px'}">
                <ng-lottie [options]="options"></ng-lottie>
              </div> `,
  standalone: true,
  imports: [
    LottieComponent,
    CommonModule
  ],
  styles: [
    `.lottie-container {
      width: 50px;
      height: 50px;
    }
    ng-lottie {
      width: 100%;
      height: 100%;
    }`
  ]
})
export class LottieStandaloneComponent implements OnInit, OnDestroy {

  @Input() animationPath!: string;
  @Input() width: string = '150';
  @Input() height: string = '150';

  private animationItem!: AnimationItem;

  options!: AnimationOptions;
  styles!: Partial<CSSStyleDeclaration>;

  constructor() {
    console.log('LottieStandaloneComponent constructor');

  }

  ngOnInit(): void {
    console.log('LottieStandaloneComponent ngOnInit');
    this.options = {
      path: this.animationPath,
      loop: true
    }
    this.styles = {
      width: this.width + 'px',
      height: this.height + 'px',
    }
  }

  ngOnDestroy(): void {
    console.log('LottieStandaloneComponent ngOnDestroy');
    this.destroy();
  }

  init(): void {
    this.options = {
    };

    this.play();

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.animationItem = animationItem
  }

  play(): void {
    this.animationItem.play();
  }

  stop(): void {
    this.animationItem.stop();
  }

  pause(): void {
    this.animationItem.pause();
  }

  setSpeed(speed: number): void {
    this.animationItem.setSpeed(speed);
  }

  setDirection(direction: AnimationDirection): void {
    this.animationItem.setDirection(direction);
  }

  goToAndStop(value: number, isFrame: boolean): void {
    this.animationItem.goToAndStop(value, isFrame);
  }

  goToAndPlay(value: number, isFrame: boolean): void {
    this.animationItem.goToAndPlay(value, isFrame);
  }

  setSubframe(enabled: boolean): void {
    this.animationItem.setSubframe(enabled);
  }

  destroy(): void {
    this.animationItem?.destroy();
  }

  getDuration(inFrames: boolean): number {
    return this.animationItem.getDuration(inFrames);
  }
}
