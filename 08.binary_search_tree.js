// binary search tree: keys of left sub-tree are smaller than the node's key, while the right greater
// binary search tree combined with in-order travesal can sort the tree in order
// time complexity: O(logn) => if the tree is balanced

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
    // do not insert duplicated nodes
    // recursive
    insertByNode(node, value) {
        if (!this.root) {
            this.root = new BinaryTree(value)
        } else {
            if (!node) {
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

    // insert nodes following binary search tree pattern
    // do not insert duplicated nodes
    // non-recursive
    insert(value) {
        let node = this.root
        if (!node) {
            this.root = new BinaryTree(value)
        } else {
            while (true) {
                if (value < node.data) {
                    if (node.leftChild) {
                        node = node.leftChild
                    } else {
                        node.leftChild = new BinaryTree(value)
                        node.leftChild.parent = node
                        break
                    }
                } else if (value > node.data) {
                    if (node.rightChild) {
                        node = node.rightChild
                    } else {
                        node.rightChild = new BinaryTree(value)
                        node.rightChild.parent = node
                        break
                    }
                } else {
                    break
                }
            }
        }
    }

    // build binary search tree from arr
    fromArr(arr) {
        for (let item of arr) {
            this.insert(item)
        }
    }

    // use in_order travesal to sort binary search tree
    inOrder(root = this.root) {
        if (root) {
            this.inOrder(root.leftChild)
            process.stdout.write(`${root.data}`)
            this.inOrder(root.rightChild)
        }
    }

    // use pre_order & in_order to rebuild binary search tree => to verify AVL tree
    preOrder(root = this.root) {
        if (root) {
            process.stdout.write(`${root.data}`)
            this.preOrder(root.leftChild)
            this.preOrder(root.rightChild)
        }
    }

    // find certain node
    // mark if its the left_child or right_child => for deletion in the future
    query(value) {
        let node = this.root
        let child = null
        while (node) {
            if (node.data === value) {
                return { node, child }
            } else if (node.data > value) {
                node = node.leftChild
                child = 'leftChild'
            } else {
                node = node.rightChild
                child = 'rightChild'
            }
        }
        return null
    }

    // find the most left child (min node of a given tree)
    findMinNode(node) {
        while (node.leftChild) {
            node = node.leftChild
        }
        return node
    }

    // delete certain node
    delete(value) {
        if (!this.query(value)) {
            throw 'Cannot find the data'
        } else {
            let { node, child } = this.query(value)

            // if the node has no child node, set the node to null
            if (!node.leftChild && !node.rightChild) {
                if (!node.parent) {
                    this.root = null
                } else {
                    node.parent[child] = null
                }
            }

            // if the node has only left child
            // connect its parent with its left child
            else if (!node.rightChild) {
                if (!node.parent) {
                    this.root = node.leftChild
                    node.leftChild.parent = null
                } else {
                    node.parent[child] = node.leftChild
                    node.leftChild.parent = node.parent
                }
            }

            // if the node has only right child
            // connect its parent with its right child
            else if (!node.leftChild) {
                if (!node.parent) {
                    this.root = node.rightChild
                    node.rightChild.parent = null
                } else {
                    node.parent[child] = node.rightChild
                    node.rightChild.parent = node.parent
                }
            }

            // if the node has both left & right child
            else {
                let minNode = this.findMinNode(node.rightChild)
                let minChild = this.query(minNode.data).child

                // switch its value with the min-node of its right-sub-tree
                if (!node.parent) {
                    this.root.data = minNode.data
                } else {
                    node.parent[child].data = minNode.data
                }

                // if the min-node of its right-sub-tree has right child
                // connect min-node's parent with min-node's child  
                if (minNode.rightChild) {
                    minNode.parent[minChild] = minNode.rightChild
                    minNode.rightChild.parent = minNode.parent
                }

                // if the min-node of its right-sub-tree has no child
                // set the min-node to null 
                else {
                    minNode.parent[minChild] = null
                }
            }
        }
    }
}

export { BinaryTree, BST }
