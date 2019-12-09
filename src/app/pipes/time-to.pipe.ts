import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'timeTo'
})
export class TimeToPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date(value) - +new Date()) / 1000)
      if (seconds > -29 && seconds < 29) {
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now'
      }
      const intervals = [
        ['year', 31536000],
        ['month', 2592000],
        ['week', 604800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1]
      ]
      let counter
      let duration = null
      let index = -1
      while (++index < intervals.length && !duration) {
        let suffix = ''
        counter = seconds / Number(intervals[index][1])
        if (seconds < 0) {
          suffix = 'overdue'
          counter = Math.ceil(counter)
        } else {
          counter = Math.floor(counter)
          suffix = 'left'
        }
        counter = Math.abs(counter)
        if (counter > 0) {
          duration = `${counter} ${intervals[index][0]}${counter === 1 ? '' : 's'} ${suffix}`
        }
      }
      if (duration) {
        return duration
      }
    }
    return value
  }
}
