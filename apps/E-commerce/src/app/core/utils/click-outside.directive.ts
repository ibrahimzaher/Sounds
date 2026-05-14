import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input() appClickOutsideEnabled = true;
  @Output() readonly appClickOutside = new EventEmitter<PointerEvent>();

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    const target = event.target;

    if (
      !this.appClickOutsideEnabled ||
      !(target instanceof Node) ||
      this.elementRef.nativeElement.contains(target)
    ) {
      return;
    }

    this.appClickOutside.emit(event);
  }
}