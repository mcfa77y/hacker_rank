#!/bin/python3

import math
import os
import random
import re
import sys


class Point:
    def __init__(self, row, col):
        self.row = row
        self.col = col

    def equal(self, other):
        return self.col == other.col and self.row == other.row

    def clone(self):
        return Point(self.row, self.col)

    def move(self, dir):
        drow = 0
        dcol = 0
        if "N" == dir:
            drow = 1
        elif "S" == dir:
            drow = -1
        elif "E" == dir:
            dcol = 1
        elif "W" == dir:
            dcol = -1
        self.update(drow, dcol)
        return self

    def update(self, drow, dcol):
        self.row += drow
        self.col += dcol
        return self

    def __str__(self):
        return str(self.row) + " "+str(self.col)


class Game:
    def __init__(self, grid, goal_pt):
        self.grid = grid
        self.goal_pt = goal_pt
        self.dirs = ["N", "E", "W", "S"]
        self.visited = {}
        self.update_grid(goal_pt, "$");

    def add_to_visited(self, pt):
        if pt.row not in self.visited:
            self.visited[pt.row] = set()
        self.visited[pt.row].add(pt.col)

    def is_visited(self, pt):
        if pt.row in self.visited:
            return pt.col in self.visited[pt.row]
        return False

    def get_symbol(self, pt):
        return grid[pt.row][pt.col]

    def is_valid_move(self, pt):
        mn = 0
        mx = len(self.grid)
        is_in_bounds = mn <= pt.col and pt.col < mx and mn <= pt.row and pt.row < mx
        is_wall = self.get_symbol(pt) == 'X' if is_in_bounds else True
        return is_in_bounds and not is_wall

    def possible_pts(self, pt):
        valid_d = [ d for d in self.dirs if self.is_valid_move(
            pt.clone().move(d)) if not self.is_visited(pt.clone().move(d)) ]
        # valid_pts = [ pt.clone().move(d) for d in valid_d ]
        self.update_grid(pt)
        # for p in valid_pts:
        #     self.add_to_visited(p)
        #     self.update_grid(p, '+')
        valid_pts = []
        for d in valid_d:
            tmp = pt.clone().move(d)
            while self.is_valid_move(tmp):
                valid_pts.append(tmp.clone())
                self.add_to_visited(tmp)
                self.update_grid(tmp, '+')
                tmp.move(d)
        # new_pt = []

        # # run with it
        # for d in valid_dir:
        #     tmp = pt.clone()
        #     while self.is_valid_move(tmp):
        #         prev_tmp = tmp.clone()
        #         tmp.move(d)
        #         if not self.is_valid_move(tmp) or self.is_goal(tmp):
        #             if not self.is_visited(prev_tmp):
        #                 new_pt.append(prev_tmp)
        #         self.update_grid(prev_tmp)
                
        # return new_pt
        return valid_pts

    def update_grid(self, pt, replacement='*'):
        row_text = self.grid[pt.row]
        updated_row = '%s%s%s' % (row_text[:pt.col], replacement, row_text[pt.col+1:])
        self.grid[pt.row] = updated_row
        self.print_grid()

    def show_pt(self, pt):
        old_symbol = self.get_symbol(pt)
        self.update_grid(pt, '@')
        # self.update_grid(pt, old_symbol)
    def print_trail(self, pts):
        for p in pts:
            self.show_pt(p)
        
    def print_grid(self):
        print("\n")
        for row in self.grid:
            print(row)

    def is_goal(self, pt):
        return pt.equal(self.goal_pt)

    def find_goal(self, pt, moves=[]):
        moves.append(pt)
        self.add_to_visited(pt)
        if self.is_goal(pt):
            return len(moves)

        for p in self.possible_pts(pt):
            self.find_goal(p, moves)

        

    def find_goal_old(self, pt, moves=[]):
        moves.append(pt)
        self.add_to_visited(pt)
        self.update_grid(pt, '^')

        pm = self.possible_pts(pt)

        while len(pm) > 0:
            new_pm = []
            for p in pm:
                self.add_to_visited(p)
                if self.is_goal(p):
                    return len(moves)
                new_pm.extend(self.possible_pts(p))
            pm = new_pm


# Complete the minimumMoves function below.
def minimumMoves(grid, startX, startY, goalX, goalY):
    game = Game(grid, Point(goalX, goalY))
    return game.find_goal(Point(startX, startY)) - 1


if __name__ == '__main__':
    fptr = open('out.txt', 'w')

    n = int(input())

    grid = []

    for _ in range(n):
        grid_item = input()
        grid.append(grid_item)

    startXStartY = input().split()

    startX = int(startXStartY[0])

    startY = int(startXStartY[1])

    goalX = int(startXStartY[2])

    goalY = int(startXStartY[3])

    result = minimumMoves(grid, startX, startY, goalX, goalY)

    fptr.write(str(result) + '\n')

    fptr.close()
