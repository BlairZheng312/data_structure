// binary search tree: keys of left sub-tree are smaller than the node's key, while the right greater
// binary search tree combined with in-order travesal can sort the tree in order

class BinaryTree {
    constructor(data) {
        this.data = data
        this.leftChild = null
        this.rightChild = null
        this.parent = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    // insert nodes following binary search tree pattern
    insert(node, value) {
        if (this.root === null) {
            this.root = new BinaryTree(value)
        } else {
            if (node === null) {
                node = new BinaryTree(value)
            } else if (value < node.data) {
                node.leftChild = this.insert(node.leftChild, value)
                node.leftChild.parent = node
            } else if (value > node.data) {
                node.rightChild = this.insert(node.rightChild, value)
                node.rightChild.parent = node
            }
            return node
        }
    }

    fromArr(arr) {
        for (let item of arr) {
            this.insert(this.root, item)
        }
    }

    inOrder(root) {
        if (root !== null) {
            this.inOrder(root.leftChild)
            console.log(root.data)
            this.inOrder(root.rightChild)
        }
    }
}

let bts = new BST()

bts.fromArr([4, 2, 3, 1, 7, 9, 8, 6, 5])
bts.inOrder(bts.root)
