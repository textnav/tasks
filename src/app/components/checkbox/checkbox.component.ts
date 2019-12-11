import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  @Input() checked = false
  @Input() text: string
  @Input() dueDate: Date
  @Output() toggleCheckbox = new EventEmitter<boolean>()
  constructor() {}

  ngOnInit() {}

  toggle() {
    this.checked = !this.checked
    this.toggleCheckbox.emit(this.checked)
  }
}
