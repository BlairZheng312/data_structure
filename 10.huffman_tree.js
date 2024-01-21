// Huffman tree => to contruct the binary tree with minimum WPL (weighted path length)

class HuffmanTreeNode {
    constructor(char, weight) {
        this.char = char
        this.weight = weight
        this.leftChild = null
        this.rightChild = null
        this.parent = null
        this.code = null
    }
}

class HuffmanTree {
    initHuffmanNode(arr) {
        let huffmanNode = []
        for (let item of arr) {
            huffmanNode.push(new HuffmanTreeNode(item.char, item.weight))
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
            let newHuffmanNode = new HuffmanTreeNode(null, weight)

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

    // left branch => 0, right branch => 1
    huffmanEncode(arr) {
        let charTable = this.fromArr(arr)
        let charCount = arr.length
        for (let i = 0; i < charCount; i++) {
            let charPath = []
            let charNode = charTable[i]
            while (charNode.parent !== null) {
                if (charTable[charTable[charNode.parent].leftChild] === charNode) {
                    charPath.push(0)
                } else {
                    charPath.push(1)
                }
                charNode = charTable[charNode.parent]
            }
            charTable[i].code = charPath.reverse().join('')
        }
        return charTable
    }
}

let huffmanTree = new HuffmanTree

console.log(huffmanTree.huffmanEncode([
    { char: 'A', weight: 7 },
    { char: 'B', weight: 5 },
    { char: 'C', weight: 5 },
    { char: 'D', weight: 2 },
    { char: 'E', weight: 4 },
]))

