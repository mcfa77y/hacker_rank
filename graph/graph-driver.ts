import Graph from './Graph';


const t = new Graph(1);

t.create_children([0,2,6])
t.get_child_by_value(2).create_children([3,4,9]);
t.get_child_by_value(6).create_children([7,8])
t.get_child_by_value(2).get_child_by_value(4).create_children([5]);
t.printBFS();
