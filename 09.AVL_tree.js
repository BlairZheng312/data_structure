import { BinaryTree, BST } from "./08.binary_search_tree.js";

// if the binary search tree is not balanced, time complexity will be higher than O(logn)
// AVL tree => self-balanced binary search tree
// the difference between sub tree is no more than 1

class AVLNode extends BinaryTree {
    constructor(data) {
        super(data)
        this.height = 1
    }
}

class AVLTree extends BST {
    getHeight(pNode) {
        if (pNode) {
            return pNode.height
        } else {
            return 0
        }
    }

    updateHeight(pNode) {
        pNode.height = 1 + Math.max(this.getHeight(pNode.leftChild), this.getHeight(pNode.rightChild))
    }

    // balance factor => rightSubTree.height - leftSubTree.height
    // should be -1, 0, 1, otherwize rotate tree to achieve balance
    getBalanceFactor(pNode) {
        return this.getHeight(pNode?.rightChild) - this.getHeight(pNode?.leftChild)
    }

    // get the most left sub tree
    getFirstSubTree(pNode) {
        if (pNode.leftChild) {
            return this.getFirstSubTree(pNode.leftChild)
        } else {
            return pNode
        }
    }

    // get the most right sub tree
    getLastSubTree(pNode) {
        if (pNode.rightChild) {
            return this.getLastSubTree(pNode.rightChild)
        } else {
            return pNode
        }
    }

    // get the successor of given node
    getSuccessor(pNode) {
        if (pNode.rightChild) {
            return this.getFirstSubTree(pNode.rightChild)
        }
        while (pNode.parent && pNode === pNode.parent.rightChild) {
            pNode = pNode.parent
        }
        return pNode.parent
    }

    // get the predecessor of given node
    getPredecessor(pNode) {
        if (pNode.leftChild) {
            return this.getLastSubTree(pNode.leftChild)
        }
        while (pNode.parent && pNode === pNode.parent.leftChild) {
            pNode = pNode.parent
        }
        return pNode.parent
    }

    // insert to the right child of the right sub tree => break the balance
    // left rotate
    rotateLeft(pNode) {
        let cNode = pNode.rightChild
        let cLeft = cNode.leftChild

        pNode.rightChild = cLeft
        if (cLeft) {
            cLeft.parent = pNode
        }

        cNode.leftChild = pNode
        pNode.parent = cNode

        this.updateHeight(pNode)
        this.updateHeight(cNode)

        return cNode
    }

    // insert to the left child of the left sub tree => break the balance
    // right rotate
    rotateRight(pNode) {
        let cNode = pNode.leftChild
        let cRight = cNode.rightChild

        pNode.leftChild = cRight
        if (cRight) {
            cRight.parent = pNode
        }

        cNode.rightChild = pNode
        pNode.parent = cNode

        this.updateHeight(pNode)
        this.updateHeight(cNode)

        return cNode
    }

    rebalance(pNode) {
        let bf = this.getBalanceFactor(pNode)
        let cNode
        // given tree is more right heavy, rotate left
        if (bf === 2) {
            // if the sub tree of given tree is more left heavy, rotate right first
            if (this.getBalanceFactor(pNode.rightChild) < 0) {
                let cNode = this.rotateRight(pNode.rightChild)
                pNode.rightChild = cNode
                cNode.parent = pNode
            }
            return this.rotateLeft(pNode)
        }
        // given tree is more left heavy, rotate right
        else if (bf === -2) {
            // if the sub tree of given tree is more right heavy, rotate left first
            if (this.getBalanceFactor(pNode.rightChild) > 0) {
                cNode = this.rotateLeft(pNode.leftChild)
                pNode.rightChild = cNode
                cNode.parent = pNode
            }
            return this.rotateRight(pNode)
        }
    }

    maintain(pNode) {
        let aNode = pNode.parent
        let rotatedNode = this.rebalance(pNode)
        if (rotatedNode) {
            // to connect the grand-parent node with the rotated node
            rotatedNode.parent = aNode

            // if there is grand-parent node, the rotated node will be its child node
            if (aNode) {
                if (pNode === aNode.leftChild) {
                    aNode.leftChild = rotatedNode
                } else {
                    aNode.rightChild = rotatedNode
                }
            }

            // if there is no grand-parent node, the rotated node will be the root
            else {
                this.root = rotatedNode
                rotatedNode.parent = null
            }
        }

        this.updateHeight(pNode)

        // maintain the nodes along the tree
        if (pNode.parent) {
            this.maintain(pNode.parent)
        }
    }

    insert(value) {
        // insert the node as BST pattern
        let pNode = this.root
        let cNode = null
        if (!pNode) {
            this.root = new AVLNode(value)
        } else {
            while (true) {
                if (value < pNode.data) {
                    if (pNode.leftChild) {
                        pNode = pNode.leftChild
                    } else {
                        cNode = new AVLNode(value)
                        pNode.leftChild = cNode
                        cNode.parent = pNode
                        this.maintain(pNode)
                        break
                    }
                } else if (value > pNode.data) {
                    if (pNode.rightChild) {
                        pNode = pNode.rightChild
                    } else {
                        cNode = new AVLNode(value)
                        pNode.rightChild = cNode
                        cNode.parent = pNode
                        this.maintain(pNode)
                        break
                    }
                } else {
                    return
                }
            }
        }
    }

    deleteByNode(pNode) {
        // if the node has no child node, set the node to null
        if (!pNode.leftChild && !pNode.rightChild) {
            if (!pNode.parent) {
                this.root = null
            } else {
                let aNode = pNode.parent
                if (pNode === aNode.leftChild) {
                    aNode.leftChild = null
                } else {
                    aNode.rightChild = null
                }
                this.maintain(aNode)
            }
        } else {
            // if the node has left child, swap it with its predecessor, then delete the predecessor
            // if the node has only right child, swap it with its successor, then delete the successor
            let cNode
            if (pNode.leftChild) {
                cNode = this.getPredecessor(pNode)
            } else {
                cNode = this.getSuccessor(pNode)
            }
            let temp = cNode.data
            cNode.data = pNode.data
            pNode.data = temp
            this.deleteByNode(cNode)
        }
    }

    delete(value) {
        if (!this.query(value)) {
            throw 'Cannot find the data'
        } else {
            let { node } = this.query(value)
            this.deleteByNode(node)
        }
    }
}

let avl = new AVLTree()

avl.fromArr([4, 2, 3, 1, 7, 9, 8, 6, 5])
// avl.fromArr([9, 8, 7, 6, 5, 4, 3, 2, 1])

avl.delete(5)
avl.delete(4)
avl.inOrder()
console.log('')
avl.preOrder()
console.log('')