// const Utils = require('./Utils');
import {create_buff} from '../Utils';

interface GraphInterface{
  data: number;
  children: GraphInterface[];
  visited: boolean;
}

class Graph implements GraphInterface{
  data: number;  
  children: Graph[];
  visited: boolean;

  constructor(data: number) {
    this.data = data;
    this.children = [];
    this.visited = false;
  }

  is_leaf() {
    const { data, children} = this;
    return data !== undefined && children.length == 0;;
  }
  
  get_child_by_value(data: number){
    return this.children.filter((child) => child.data === data)[0];
  }
  add_child(g: Graph){
    this.children.push(g);
  }
  create_children(data: number[]) {
    const parent = this;
    const children = data.map((datum) => {
      const g = new Graph(datum);;
      g.add_child(parent);
      return g;
    })
    this.children = children;
  }
  printBFS() {
    this._printBFS(this, 0);
  }
  _printBFS(startNode, level){
    if (startNode === undefined || startNode === null) {
      return;
    }
    if (!startNode.visited){
      console.log(create_buff(level) + startNode.data );
      startNode.visited = true;
    }
    let x = [];
    startNode.children
      .filter((child: Graph) => !child.visited)
      .forEach((child) => {
        console.log(create_buff(level) + child.data);
        x.push(child);
      })
      x.filter((child: Graph) => !child.visited)
      .forEach((child) => {
        child.visited = true;
        this._printBFS(child, level + 1);
      
    })
  }

  printDFS() {
    this._printDFS(this, 0);
  }

  _printDFS(startNode, level) {
    if (startNode === undefined || startNode === null) {
      return;
    }
    console.log(create_buff(level) + startNode.data));
    startNode.visited = true;
    startNode.children
      .filter((child: Graph) => !child.visited)
      .forEach((child) => {
      this._printDFS(child, level + 1);
      child.visited = true;
    })
  }

  build_balance_graph(levels, result = new Graph(1)) {

    if (levels === 0) {
      return result;
    }
    const new_levels = levels - 1;
    let { data } = result;
    let left = new Graph(data * 2);
    result.children.push(this.build_balance_graph(new_levels, left));
    let right = new Graph(data * 2 + 1);
    result.children.push(this.build_balance_graph(new_levels, right));
    return result;
  
  }
  
  // build_random_graph(levels, result = new Graph(1)) {
  
  //   if (levels === 0) {
  //     return result;
  //   }
  //   const new_levels = levels - 1;
  //   let value = 0;
  //   if (flip_coin()) {
  //     value = flip_coin() ? 0 : 1;
  //     result.left = this.build_random_graph(new_levels, new Graph(value));
  //   }
  //   if (flip_coin()) {
  //     value = flip_coin() ? 0 : 1;
  //     result.right = this.build_random_graph(new_levels, new Graph(value));
  //   }
  //   return result;
  
  // }

}

// module.exports = { Graph };
export default Graph;