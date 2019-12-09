import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tagHighlight'
})
export class TagHighlightPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const tagRegex = /#\b\S+?(\s|$)/gm
    return value ? value.replace(tagRegex, '<span class="tag">$&</span>&nbsp;') : ''
  }
}
