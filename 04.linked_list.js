// linked_list: connect nodes of data 
// each node is store randomly in memory (array data is stored one next to another)
// => do not require fixed space, suitable for dynamic data

class Node {
    constructor(item) {
        this.item = item
        this.next = null
    }
}

export class LinkedList {
    constructor(node) {
        this.head = node != undefined ? new Node(node) : null
    }

    length() {
        let length = 0
        let node = this.head
        while (node) {
            length++
            node = node.next
        }
        return length
    }

    // assume add node from the head
    add(item) {
        let node = new Node(item)
        node.next = this.head
        this.head = node
    }

    // iterate from head of the linkedlist
    find(index) {
        let length = this.length()
        if (index < 0 || index > length - 1) {
            throw 'out of boundary'
        } else {
            let node = this.head
            for (let i = 0; i < index; i++) {
                node = node.next
            }
            return node
        }
    }

    // iterate from head of the linkedlist
    findByValue(item) {
        let node = this.head
        let listLength = this.length()
        for (let index = 0; index < listLength; index++) {
            if (node.item === item) {
                return index
            } else {
                node = node.next
            }
        }
        return -1
    }

    // connect new node with current next node
    // then break the connection between current node and current next node
    // then connect current node with new node
    insert(item, index) {
        if (index === 0) {
            this.add(item)
        } else {
            let currentNode = this.find(index - 1)
            let newNode = new Node(item)
            newNode.next = currentNode.next
            currentNode.next = newNode
        }
    }

    // connect current previous node with current next node
    // so that current node is no longer linked in the list
    remove(index) {
        let currentNode = this.find(index - 1)
        currentNode.next = currentNode.next.next
    }

    // read data from an array and store it in linked-list
    fromArray(arr) {
        for (let item of arr) {
            this.add(item)
        }
    }

    // read data from a linked-list and store it in array
    toArray() {
        let node = this.head
        let arr = []
        while (node != null) {
            arr.push(node.item)
            node = node.next
        }
        return arr
    }
}