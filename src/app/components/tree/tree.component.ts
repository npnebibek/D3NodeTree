import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { DataModel } from 'src/app/model/data.model';

export const margin = { top: 30, right: 120, bottom: 30, left: 120 };
export const width = 960 - margin.right - margin.left;
export const height = 800 - margin.top - margin.bottom;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  template: '<svg></svg>',
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  private treeLayout;
  public  root;
  private svg;

  @Input()
  data: DataModel[];

  constructor() { }

  ngOnInit() {
    d3.json('../../assets/data.json').then(data => {

      this.root = d3.hierarchy(data);
      this.root.x0 = height / 2;
      this.root.y0 = 0;

      const collapse = function (d) {
          if (d.children) {
              d._children = d.children;
              d._children.forEach(collapse);
              d.children = null;
          }
      };

      this.root.children.forEach(collapse);

      this.update(this.root);
  });

  this.svg = d3.select('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top                     + ')');

this.treeLayout = d3.tree().size([height, width]);

}

update(source) {
let i = 0;
const duration = 750;

const treeData = this.treeLayout(this.root);
const nodes = treeData.descendants();
const links = treeData.descendants().slice(1);

nodes.forEach(d => d.y = d.depth * 180);

const node = this.svg.selectAll('g.node')
  .data(nodes, d =>  d.id || (d.id = ++i) );

const nodeEnter = node.enter().append('g')
  .attr('class', 'node')
  .attr('transform', d => 'translate(' + source.y0 + ',' + source.x0 + ')')
  .on('click', this.click);

nodeEnter.append('circle')
  .attr('class', 'node')
  .attr('r', 1e-6)
  .style('fill', d => d._children ? 'lightsteelblue' : '#fff');

const nodeUpdate = nodeEnter.merge(node);

nodeUpdate.transition()
  .duration(duration)
  .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')');

nodeUpdate.select('circle.node')
  .attr('r', 10)
  .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
  .attr('cursor', 'pointer');

const nodeExit = node.exit().transition()
  .duration(duration)
  .attr('transform', d => 'translate(' + source.y + ',' + source.x + ')')
  .remove();

nodeExit.select('circle')
  .attr('r', 1e-6);

nodeExit.select('text')
  .style('fill-opacity', 1e-6);

const link = this.svg.selectAll('path.link')
  .data(links, d => d.id);

const linkEnter = link.enter().insert('path', 'g')
  .attr('class', 'link')
  .attr('d', d => {
      const o = { x: source.x0, y: source.y0 };
      return this.diagonal(o, o);
  });

const linkUpdate = linkEnter.merge(link);

linkUpdate.transition()
  .duration(duration)
  .attr('d', d => {
      return this.diagonal(d, d.parent);
  });

const linkExit = link.exit().transition()
  .duration(duration)
  .attr('d', d => {
      const o = { x: source.x, y: source.y };
      return this.diagonal(o, o);
  })
  .remove();

nodes.forEach(d => {
  d.x0 = d.x;
  d.y0 = d.y;
});

}

click(d) {
if (d.children) {
  d._children = d.children;
  d.children = null;
} else {
  d.children = d._children;
  d._children = null;
}

  this.update(this.root); // this.update is not recognized as a function on clicking the node
}

diagonal(s, d) {
const path = `M ${s.y} ${s.x}
      C ${(s.y + d.y) / 2} ${s.x},
        ${(s.y + d.y) / 2} ${d.x},
        ${d.y} ${d.x}`;

return path;
}
}
