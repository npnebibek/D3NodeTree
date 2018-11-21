import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {DriverTreeService} from '../../services/tree.service';
import {ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-driver-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @ViewChild('rightClickMenu') public rightClickMenu: ContextMenuComponent;
  @Input() treeData: any = [];

  @Input() items: any[] = [
    {name: 'Rename node'},
    {name: 'delete node'},
    {name: 'create node'}

  ];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNodeChanged: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNodeSelected: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() contextMenu: EventEmitter<any> = new EventEmitter();


  constructor( private treeService: DriverTreeService, private contextMenuService: ContextMenuService) {
  }


  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.seedTree();
  }

  seedTree() {
    if (!!this.treeData) {
      this.treeService.createChart(this.chartContainer, this.treeData);
      this.treeService.update();
    }
  }

    public onMenuSelect($event: MouseEvent, item: any): void {
        if ($event.toElement.nodeName === 'circle') {
            this.contextMenuService.show.next( {
                // Optional - if unspecified, all context menu components will open
                contextMenu: this.rightClickMenu,
                event: $event,
                item: item,
            });
            $event.stopPropagation();
        }
        $event.preventDefault();
    }

}


