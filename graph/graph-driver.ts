import Graph from './Graph';


const t = new Graph(1);

t.create_neighbors([0,2,6])
t.get_neighbor_by_value(2).create_neighbors([3,4,9]);
t.get_neighbor_by_value(6).create_neighbors([7,8])
t.get_neighbor_by_value(2).get_neighbor_by_value(4).create_neighbors([5]);
t.printBFS();
