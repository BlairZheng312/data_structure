// direct addressing table: map data by keys in arrays
// => drawback: large key range but small data small => waste space; key is not number => doesn't map in array

// hash table can help with the issue => use hash function h(k) to map all values into a fixed size addressing table 
// => drawback: hash collision: different key map into same address
// => solution: 
// 1) open addressing -> map to next opening address 
// 2) chaining -> for keys mapped into same address, stored in linked-list

import { LinkedList } from "./04.linked_list.js"

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

    fromArray(arr) {
        for (let item of arr) {
            this.insert(item)
        }
    }

    print() {
        for (let item of this.hashTable) {
            // console.log(item.toArray())
            console.log(item.head)
        }
    }
}

let hashTable = new HashTable(10)
hashTable.fromArray([2, 3, 12, 22, 7, 47])
// hashTable.insert(7)
hashTable.print()





