import { Injectable } from '@angular/core';
import {DriverTreeModel} from './driver-tree.model';

@Injectable({
  providedIn: 'root'
})
export class DriverTreeService {
  driverTreeModal: DriverTreeModel = new DriverTreeModel();

  constructor() { }

  createChart(chartContainer: any, treeData: any): void {
    const element = chartContainer.nativeElement;
    element.innerHTML = '';
    this.driverTreeModal.addSvgToContainer(chartContainer);

    this.driverTreeModal.createLayout();

    this.driverTreeModal.createTreeData(treeData);

  }

  update() {
    this.driverTreeModal.update(this.driverTreeModal.root);
  }

  setNodeChangedListener(callable) {
    this.driverTreeModal.nodechanged = callable;
  }
  setNodeSelectedListener(callable) {
    this.driverTreeModal.nodeselected = callable;
  }

  addNode(node: any) {
    this.driverTreeModal.addNode(node);
  }
}
