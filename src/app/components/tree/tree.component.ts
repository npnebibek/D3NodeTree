import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {DriverTreeService} from '../../services/tree.service';

@Component({
  selector: 'app-driver-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any = [];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNodeChanged: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNodeSelected: EventEmitter<any> = new EventEmitter();

  constructor( private treeService: DriverTreeService ) {
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
