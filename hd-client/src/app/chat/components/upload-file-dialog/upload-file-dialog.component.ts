import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileSelectEvent, FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrl: './upload-file-dialog.component.scss'
})
export class UploadFileDialogComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Input({ required: true })
  htmlAccept: string = ''

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  imagesToUploadEmmit = new EventEmitter<File[]>()

  @Output()
  videosToUploadEmmit = new EventEmitter<File[]>()

  @Output()
  filesToUploadEmmit = new EventEmitter<File[]>()

  selectedFiles: any[] = []

  constructor() {}

  onDialogVisibilityChange() {

    this.selectedFiles = []

    this.dialogVisibilityChange.emit(false)
  }

  onSelect(event: FileSelectEvent) {

    for(let file of event.files) {

      const fileSizeMB = file.size / 1024 / 1024
      const maxMB = 9.537

      if (fileSizeMB < maxMB) this.selectedFiles.push(file);
    }
  }

  onUploadFile() {
    if (this.htmlAccept === 'image/*') this.imagesToUploadEmmit.emit(this.selectedFiles)
    else if (this.htmlAccept === 'video/*')  this.videosToUploadEmmit.emit(this.selectedFiles)
    else this.filesToUploadEmmit.emit(this.selectedFiles)

    this.selectedFiles = []
  }

}
