// binary tree: for each node in the tree, its maximum degree is 2 (each parent node has no more than 2 children nodes)

class BinaryTree {
    constructor(node) {
        this.node = node
        this.leftChild = null
        this.rightChild = null
    }
}

let a = new BinaryTree('A')
let b = new BinaryTree('B')
let c = new BinaryTree('C')
let d = new BinaryTree('D')
let e = new BinaryTree('E')
let f = new BinaryTree('F')
let g = new BinaryTree('G')

a.leftChild = b
b.rightChild = c
c.leftChild = d
c.rightChild = e
a.rightChild = f
f.rightChild = g

let root = a

// 4 types of travesal of binary-tree
function preOrder(root) {
    if (root) {
        console.log(root.node)
        preOrder(root.leftChild)
        preOrder(root.rightChild)
    }
}

function inOrder(root) {
    // recursive
    if (root) {
        inOrder(root.leftChild)
        console.log(root.node)
        inOrder(root.rightChild)
    }

    // // non-recursive
    // let stack = []
    // let node = root
    // while (node || stack.length !== 0) {
    //     if (node) {
    //         stack.push(node)
    //         node = node.leftChild
    //     } else {
    //         node = stack.pop()
    //         console.log(node.node)
    //         node = node.rightChild
    //     }
    // }
}

function postOrder(root) {
    if (root) {
        postOrder(root.leftChild)
        postOrder(root.rightChild)
        console.log(root.node)
    }
}

function levelOrder(root) {
    let queue = []
    queue.push(root)
    while (queue.length > 0) {
        let root = queue.shift()
        console.log(root.node)
        if (root.leftChild) {
            queue.push(root.leftChild)
        }
        if (root.rightChild) {
            queue.push(root.rightChild)
        }
    }
}

// preOrder(root)
inOrder(root)
// postOrder(root)
// levelOrder(root)