import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent {
  id: string = '';
  constructor(private route: ActivatedRoute){
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id') || ''
  }

}
