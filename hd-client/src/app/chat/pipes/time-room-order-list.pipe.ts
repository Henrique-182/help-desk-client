import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRoomOrderList'
})
export class TimeRoomOrderListPipe implements PipeTransform {

  transform(datetime: Date): string {

    let returningTime = '00:00'

    if (datetime) {
      let date: Date = new Date(datetime)
      
      let hours = date.getHours()
      let minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()

      returningTime = hours + ':' + minutes
    }

    return returningTime
  }

}
