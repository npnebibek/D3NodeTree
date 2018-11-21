import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  title = 'app';
  data: any[];
  constructor(private http: Http,
  private contextMenuService: ContextMenuService) {
    this.http.get('../assets/data.json').subscribe(res => this.data = res.json());
  }

  selectedNode: any;
  nodeUpdated(node: any) {
    // tslint:disable-next-line:no-console
    console.info('app detected node change');
  }
  nodeSelected(node: any) {
    // tslint:disable-next-line:no-console
    console.info('app detected node selected', node);
    this.selectedNode = node;
  }

  onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({ event: $event, item: item });
    $event.preventDefault();
  }

}
