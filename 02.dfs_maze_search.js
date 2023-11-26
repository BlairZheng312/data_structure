// use depth first search 
// => start at root node, explore along a branch
// => when there are no further way out, go back to previous node and try a different branch 
// can use stack data structure

// assume 1 is wall and 0 is path
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function mazeSearch(xStart, yStart, xEnd, yEnd) {
    // push start point to the stack
    let stack = []
    stack.push([xStart, yStart])

    // mark start point as visited
    maze[xStart][yStart] = 2

    let mazeSize = maze.length

    // while the stack is not empty => there are nodes left in the visited path => can go back and explore different directions
    while (stack.length > 0) {
        let currentNode = stack[stack.length - 1]
        let [x, y] = [currentNode[0], currentNode[1]]

        // if the current node is the end point, exit
        if (x === xEnd && y === yEnd) {
            console.log(stack)
            return true
        }

        to_pop: {
            // explore 4 different directions of current node
            for ([x, y] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
                // if the next node is outside of maze, try the nodes in other directions
                if (x < 0 || x >= mazeSize || y < 0 || y >= mazeSize) {
                    continue
                }

                // if the next node is not wall, add the node to stack, mark the node as visited, stop trying other directions
                if (maze[x][y] === 0) {
                    stack.push([x, y])
                    maze[x][y] = 2
                    break to_pop
                }
            }

            // if none of the directions of next node works, go back to previous node
            stack.pop()
        }
    }

    // if the stack is empty, there are no possible nodes to explore, no way out of maze
    console.log('No possible way out')
    return false
}

mazeSearch(1, 1, 8, 8)
