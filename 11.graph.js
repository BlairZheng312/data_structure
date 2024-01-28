class Graph {
    constructor(vNum) {
        this.vNum = vNum
        this.adjacencyMatrix = Array.from({ length: this.vNum }, () => Array.from({ length: this.vNum }, () => 0))
    }

    addEdge(v1, v2) {
        this.adjacencyMatrix[v1][v2] = 1
        this.adjacencyMatrix[v2][v1] = 1
    }

    dfs(v1 = 0, visited = Array.from({ length: this.vNum }, () => 0)) {
        visited[v1] = 1
        console.log(v1)
        for (let v2 = 0; v2 < this.vNum; v2++) {
            if (this.adjacencyMatrix[v1][v2] !== 0 && !visited[v2]) {
                this.dfs(v2, visited)
            }
        }
    }

    bfs() {
        let visited = Array.from({ length: this.vNum }, () => 0)
        let queue = []
        let v1 = 0
        queue.push(v1)
        visited[v1] = 1
        while (queue.length > 0) {
            let v1 = queue.shift()
            console.log(v1)
            for (let v2 = 0; v2 < this.vNum; v2++) {
                if (this.adjacencyMatrix[v1][v2] !== 0 && !visited[v2]) {
                    queue.push(v2)
                    visited[v2] = 1
                }
            }
        }
    }
}

let g = new Graph(6)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(0, 3)
g.addEdge(1, 4)
g.addEdge(2, 4)
g.addEdge(3, 5)
g.dfs()
console.log('----')
g.bfs()
