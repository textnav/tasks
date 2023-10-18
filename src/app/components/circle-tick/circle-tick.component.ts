import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-circle-tick',
  templateUrl: './circle-tick.component.svg',
  styleUrls: ['./circle-tick.component.css']
})
export class CircleTickComponent {
  @Input() dim: boolean
  @Input() circleIndex = 1
  @Input() tickIndex = 1
  @Input() eraserIndex = 0
}
