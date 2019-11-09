// const Utils = require('./Utils');
import { create_buff } from '../Utils';

interface GraphInterface {
  data: number;
  neighbors: GraphInterface[];
  visited: boolean;
}

class Graph implements GraphInterface {
  data: number;
  neighbors: Graph[];
  visited: boolean;

  constructor(data: number) {
    this.data = data;
    this.neighbors = [];
    this.visited = false;
  }

  is_leaf() {
    const { data, neighbors } = this;
    return data !== undefined && neighbors.length == 0;;
  }

  get_neighbor_by_value(data: number) {
    return this.neighbors.filter((neighbor) => neighbor.data === data)[0];
  }
  add_neighbor(g: Graph) {
    this.neighbors.push(g);
  }
  create_neighbors(data: number[]) {
    const parent = this;
    const neighbors = data.map((datum) => {
      const g = new Graph(datum);;
      g.add_neighbor(parent);
      return g;
    })
    this.neighbors = this.neighbors.concat(neighbors);
    return this;
  }
  _not_visited(neighbor: Graph) {
    return !neighbor.visited;
  }
  printBFS() {
    let level = 0;
    console.log(create_buff(level) + this.data);
    this.visited = true;
    level += 1;
    let next_neighbors: Graph[] = this.neighbors
      .reduce((acc: Graph[], neighbor: Graph) => {
        console.log(create_buff(level) + neighbor.data);
        neighbor.visited = true;
        return acc.concat(neighbor.neighbors);
      }, [])
    while (next_neighbors.length > 0){
      level += 1;
      next_neighbors = next_neighbors
        .filter(this._not_visited)
        .reduce((acc: Graph[], neighbor: Graph) => {
          console.log(create_buff(level) + neighbor.data);
          neighbor.visited = true;
          return acc.concat(neighbor.neighbors);
        }, [])
    }
    // this._printBFS(next_neighbors.filter(this._not_visited), level + 1);
  }

  printDFS() {
    this._printDFS(this, 0);
  }

  _printDFS(startNode, level) {
    if (startNode === undefined || startNode === null) {
      return;
    }
    console.log(create_buff(level) + startNode.data);
    startNode.visited = true;
    startNode.neighbors
      .filter((neighbor: Graph) => !neighbor.visited)
      .forEach((neighbor: Graph) => {
        this._printDFS(neighbor, level + 1);
        neighbor.visited = true;
      })
  }

  build_balance_graph(levels, result = new Graph(1)) {

    if (levels === 0) {
      return result;
    }
    const new_levels = levels - 1;
    let { data } = result;
    let left = new Graph(data * 2);
    result.neighbors.push(this.build_balance_graph(new_levels, left));
    let right = new Graph(data * 2 + 1);
    result.neighbors.push(this.build_balance_graph(new_levels, right));
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