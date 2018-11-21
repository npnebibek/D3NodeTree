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
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
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


  constructor( private treeService: DriverTreeService,
  private contextMenuService: ContextMenuService) {
    treeService.setNodeChangedListener((node) => {
      this.onNodeChanged.emit(node);
    });
    treeService.setNodeSelectedListener((node) => {
      this.onNodeSelected.emit(node);
    });
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

}


