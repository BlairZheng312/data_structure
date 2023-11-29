// direct addressing table: map data by keys in arrays
// => drawback: large key range but small data small => waste space; key is not number => doesn't map in array

// hash table can help with the issue => use hash function h(k) to map all values into a fixed size addressing table 
// => drawback: hash collision: different key map into same address
// => solution: 
// 1) open addressing -> map to next opening address 
// 2) chaining -> for keys mapped into same address, stored in linked-list

class Node {
    constructor(item) {
        this.item = item
        this.next = null
    }
}

class LinkedList {
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
    // then connect current with new node
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

class HashTable {
    constructor(size) {
        this.size = size
        this.hashTable = Array.from({ length: this.size }, () => new LinkedList())
    }

    // design hash function to map keys to hash table
    hash(k) {
        return k % this.size
    }

    insert(k) {
        // use hash function to find the index of hash table
        let hashIndex = this.hash(k)
        let hashList = this.hashTable[hashIndex]

        // if key not exists, add the key to linked-list under the above hash index
        if (hashList.findByValue(k) === -1) {
            hashList.add(k)
        }

        // if key already exist, throw error 
        else {
            throw 'duplicated entry'
        }
    }

    print() {
        for (let item of this.hashTable) {
            console.log(item.toArray())
        }
    }
}

let hashTable = new HashTable(10)

hashTable.insert(2)
hashTable.insert(3)
hashTable.insert(12)
hashTable.insert(22)
// hashTable.insert(22)
hashTable.print()





