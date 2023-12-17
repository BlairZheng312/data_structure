import { BinaryTree, BST } from "./08.binary_search_tree.js";

// if the binary search tree is not balanced, time complexity will be higher than O(logn)
// AVL tree => self-balanced binary search tree
// the difference between sub tree is no more than 1

class AVLNode extends BinaryTree {
    constructor(data) {
        super(data)
        // balance factor 
        // => right sub tree higher then left sub tree: 1
        // => left sub tree higher then right sub tree: -1
        // => balanced: 0
        this.bf = 0
    }
}

class AVLTree extends BST {
    // insert to the right child of the right sub tree => break the balance
    // left rotate
    rotateLeft(pNode, cNode) {
        let cLeft = cNode.leftChild
        pNode.rightChild = cLeft
        if (cLeft) {
            cLeft.parent = pNode
        }

        cNode.leftChild = pNode
        pNode.parent = cNode

        cNode.bf = 0
        pNode.bf = 0

        return cNode
    }

    // insert to the left child of the left sub tree => break the balance
    // right rotate
    rotateRight(pNode, cNode) {
        let cRight = cNode.rightChild
        pNode.leftChild = cRight
        if (cRight) {
            cRight.parent = pNode
        }

        cNode.rightChild = pNode
        pNode.parent = cNode

        cNode.bf = 0
        pNode.bf = 0

        return cNode
    }

    // insert to the left child of the right sub tree => break the balance
    // first right rotate, then left rotate
    rotateRightLeft(pNode, cNode) {
        let gNode = cNode.leftChild

        let gRight = gNode.rightChild
        cNode.leftChild = gRight
        if (gRight) {
            gRight.parent = cNode
        }

        gNode.rightChild = cNode
        cNode.parent = gNode

        let gLeft = gNode.leftChild
        pNode.rightChild = gLeft
        if (gLeft) {
            gLeft.parent = pNode
        }

        gNode.leftChild = pNode
        pNode.parent = gNode

        if (gNode.bf > 0) {
            cNode.bf = 0
            pNode.bf = -1
        } else if (gNode.bf < 0) {
            cNode.bf = 1
            pNode.bf = 0
        } else {
            cNode.bf = 0
            pNode.bf = 0
        }
        gNode.bf = 0
        return gNode
    }

    // insert to the right child of the left sub tree => break the balance
    // first left rotate, then right rotate
    rotateLeftRight(pNode, cNode) {
        let gNode = cNode.rightChild

        let gLeft = gNode.leftChild
        cNode.rightChild = gLeft
        if (gLeft) {
            gLeft.parent = cNode
        }

        gNode.leftChild = cNode
        cNode.parent = gNode

        let gRight = gNode.rightChild
        pNode.leftChild = gRight
        if (gRight) {
            gRight.parent = pNode
        }

        gNode.rightChild = pNode
        pNode.parent = gNode

        if (gNode.bf > 0) {
            cNode.bf = -1
            pNode.bf = 0
        } else if (gNode.bf < 0) {
            cNode.bf = 0
            pNode.bf = 1
        } else {
            cNode.bf = 0
            pNode.bf = 0
        }

        gNode.bf = 0
        return gNode
    }

    insert(value) {
        // insert the node as BST pattern
        let node = this.root
        let cNode = null
        if (!node) {
            cNode = new AVLNode(value)
            this.root = cNode
        } else {
            while (true) {
                if (value < node.data) {
                    if (node.leftChild) {
                        node = node.leftChild
                    } else {
                        cNode = new AVLNode(value)
                        node.leftChild = cNode
                        cNode.parent = node
                        break
                    }
                } else if (value > node.data) {
                    if (node.rightChild) {
                        node = node.rightChild
                    } else {
                        cNode = new AVLNode(value)
                        node.rightChild = cNode
                        cNode.parent = node
                        break
                    }
                } else {
                    return
                }
            }
        }

        // update the balance factor for the tree
        // rotate the tree based on the balance factor
        while (cNode.parent) {
            let aNode
            let node
            let pNode

            // if the node is from the left sub tree, balance factor influence will be -1
            if (cNode.parent.leftChild === cNode) {
                // if the parent tree is left-twisted (bf === -1)
                // after updated, bf will be -2
                // => need to rotate to retore balance
                if (cNode.parent.bf < 0) {
                    aNode = cNode.parent.parent
                    pNode = cNode.parent
                    
                    // if the current tree is right-twisted, rotate left first then rotate right
                    if (cNode.bf > 0) {
                        node = this.rotateLeftRight(cNode.parent, cNode)
                    }

                    // if the node is left-twisted, rotate right
                    else {
                        node = this.rotateRight(cNode.parent, cNode)
                    }
                }

                // if the tree is right-twisted (bf === 1)
                // after updated, bf will be 0
                // tree will be balanced, break from the loop
                else if (cNode.parent.bf > 0) {
                    cNode.parent.bf = 0
                    break
                }

                // if the tree is balanced (bf === 0)
                // after updated, bf will be -1 (still balanced)
                // move node up to parent node to make any rotation as needed
                // skip current loop
                else {
                    cNode.parent.bf = -1
                    cNode = cNode.parent
                    continue
                }
            }

            // the opposite of above situation
            else {
                if (cNode.parent.bf > 0) {
                    aNode = cNode.parent.parent
                    pNode = cNode.parent
                    if (cNode.bf < 0) {
                        node = this.rotateRightLeft(cNode.parent, cNode)
                    } else {
                        node = this.rotateLeft(cNode.parent, cNode)
                    }
                } else if (cNode.parent.bf < 0) {
                    cNode.parent.bf = 0
                    break
                } else {
                    cNode.parent.bf = 1
                    cNode = cNode.parent
                    continue
                }
            }

            // to connect the grand-parent node with the rotated node
            node.parent = aNode

            // if there is grand-parent node, the rotated node will be its child node
            if (aNode) {
                if (pNode === aNode.leftChild) {
                    aNode.leftChild = node
                } else {
                    aNode.rightChild = node
                }
                break
            } 

            // if there is no grand-parent node, the rotated node will be the root
            else {
                this.root = node
                break
            }
        }
    }
}

let avl = new AVLTree()

avl.fromArr([4, 2, 3, 1, 7, 9, 8, 6, 5])
// avl.fromArr([9, 8, 7, 6, 5, 4, 3, 2, 1])

avl.inOrder()
console.log('')
avl.preOrder()
console.log('')
