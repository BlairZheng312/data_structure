// use breadth first search 
// => start at root node, explore every possible child nodes
// => the branch reaches the end point first is the shortest path
// can use queue data structure

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
    // third parameter => mark the previous node in the recorded path map
    let queue = []
    queue.push([xStart, yStart, -1])

    // use path map to store all the previous nodes
    let path = []

    let mazeSize = maze.length

    while (queue.length > 0) {
        let currentNode = queue.shift()
        path.push(currentNode)
        let [x, y] = [currentNode[0], currentNode[1]]

        // if the current node is the end point
        // => read the third parameter of currentNode to find its previous node from the recorded path map
        // => push the previous node into the final path, then read its third parameter
        // => repeat the process until find the third parameter equals to -1, which is the start point of the maze
        if (x === xEnd && y === yEnd) {
            let finalPath = []
            finalPath.push(currentNode.slice(0, 2))
            while (currentNode[2] != -1) {
                finalPath.push(path[currentNode[2]].slice(0, 2))
                currentNode = path[currentNode[2]]
            }
            console.log(finalPath.reverse())
            return true
        }

        for ([x, y] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
            // if the next node is outside of maze, try the nodes in other directions
            if (x < 0 || x >= mazeSize || y < 0 || y >= mazeSize) {
                continue
            }

            // if the next node is not wall, add the node to queue
            // put the position of previous node in recorded path map as third parameter
            // mark the node as visited
            if (maze[x][y] === 0) {
                queue.push([x, y, path.length - 1])
                maze[x][y] = 2
            }
        }
    }

    // if the queue is empty, there are no possible nodes to explore, no way out of maze
    console.log('No possible way out')
    return false
}

mazeSearch(1, 1, 8, 8)