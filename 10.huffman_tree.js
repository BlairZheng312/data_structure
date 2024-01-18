// Huffman tree => to contruct the binary tree with minimum WPL (weighted path length)

class HuffmanTreeNode {
    constructor(weight) {
        this.weight = weight
        this.leftChild = null
        this.rightChild = null
        this.parent = null
    }
}

class HuffmanTree {
    initHuffmanNode(arr) {
        let huffmanNode = []
        for (let item of arr) {
            huffmanNode.push(new HuffmanTreeNode(item))
        }
        return huffmanNode
    }

    // selecte the two smallest nodes
    selectNode(arr) {
        let length = arr.length
        let first = length - 1
        let second = length - 1
        for (let i = length - 1; i >= 0; i--) {
            if (arr[i].weight < arr[first].weight && arr[i].parent === null) {
                first = i
            }
        }
        for (let i = length - 1; i >= 0; i--) {
            if (arr[i].weight < arr[second].weight && arr[i].parent === null) {
                if (i === first) {
                    continue
                }
                second = i
            }
        }
        return { first, second }
    }

    fromArr(arr) {
        let huffmanNode = this.initHuffmanNode(arr)
        let leafCount = huffmanNode.length
        let nodeCount = 2 * leafCount - 1
        for (let i = leafCount; i < nodeCount; i++) {
            // find the smallest two nodes to create new sub tree
            let { first, second } = this.selectNode(huffmanNode)
            let weight = huffmanNode[first].weight + huffmanNode[second].weight
            let newHuffmanNode = new HuffmanTreeNode(weight)

            // link new node with child nodes
            newHuffmanNode.leftChild = first
            newHuffmanNode.rightChild = second
            huffmanNode.push(newHuffmanNode)

            // link child nodes with new node
            huffmanNode[first].parent = i
            huffmanNode[second].parent = i
        }
        return huffmanNode
    }

}

let huffmanTree = new HuffmanTree

console.log(huffmanTree.fromArr([7, 5, 5, 2, 4]))

