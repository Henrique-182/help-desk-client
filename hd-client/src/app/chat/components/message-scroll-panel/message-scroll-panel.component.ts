import { Component, Input } from '@angular/core';
import { MessageRoom } from '../../model/room/message-room';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-scroll-panel',
  templateUrl: './message-scroll-panel.component.html',
  styleUrl: './message-scroll-panel.component.scss'
})
export class MessageScrollPanelComponent {

  userType: string

  @Input({ required: true })
  message: MessageRoom = {} as MessageRoom

  constructor (
    private _route: ActivatedRoute,
  ) {
    this.userType = this._route.snapshot.paramMap.get('type') || ''
  }

  onDownloadFile(event: any) {
    // Converte o base64 para um Blob
    const base64 = event.split(',')[1]

    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/octet-stream' })

    // Cria um link temporário para o download
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)

    const filename = event.substring(9, event.indexOf(';data'))
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

}
