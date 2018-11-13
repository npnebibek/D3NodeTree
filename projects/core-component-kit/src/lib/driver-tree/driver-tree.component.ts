import { Component, OnInit, OnChanges, ViewChild, ElementRef,
  Input, Output, EventEmitter} from '@angular/core';
import {DriverTreeService} from './driver-tree.service';

@Component({
  selector: 'cck-driver-tree',
  template: `
    <div
      class="cck-driver-tree"
      #chart></div>
  `,
  styleUrls: ['./driver-tree.component.css']
})
export class DriverTreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any = [];
  @Output() onNodeChanged: EventEmitter<any> = new EventEmitter();
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
