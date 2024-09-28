import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerDialogUploadFile'
})
export class HeaderDialogUploadFilePipe implements PipeTransform {

  transform(value: string): string {

    return value === 'image/*' ? 'as imagens'
          : value === 'video/*' ? 'os vídeos'
          : 'os arquivos'
  }

}
