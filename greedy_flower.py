#!/bin/python3

import math
import os
import random
import re
import sys

 
# Complete the getMinimumCost function below.
def getMinimumCost(k, c):
    c.sort(reverse = True)
    total = 0
    prev_cost = 0
    for index, cost in enumerate(c):
        
        if (index != 0) and (index & k == 0):
            prev_cost += 1
        total += (prev_cost + 1) * cost;
    return total
    

        
    

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nk = input().split()

    n = int(nk[0])

    k = int(nk[1])

    c = list(map(int, input().rstrip().split()))

    minimumCost = getMinimumCost(k, c)

    fptr.write(str(minimumCost) + '\n')

    fptr.close()
