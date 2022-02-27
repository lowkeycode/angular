import { Directive, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    console.log(eventData);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    console.log(eventData);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent')
  }
}
