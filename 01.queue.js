// queue: FIFO => add element at the end, delele element from the front
// array queue => dequeue leaves space empty, enqueue makes array grow
// circular queue => fixed sized array, enqueue uses space from dequeue

class Queue {
    // initiate circular queue with certain length
    constructor(size) {
        this.items = Array(size)
        this.size = size
        this.rear = 0
        this.front = 0
    }

    // if the queue is full, throw error
    // otherwize point queue rear to next position, add element at queue rear
    enqueue(item) {
        if (!this.isFull()) {
            this.rear = (this.rear + 1) % this.size
            this.items[this.rear] = item
        } else {
            throw 'Queue is full'
        }
    }

    // if the queue is empty, throw error
    // otherwize point queue front to next position
    // return the value pointed by queue front as removed element
    dequeue() {
        if (!this.isEmpty()) {
            this.front = (this.front + 1) % this.size
            return this.items[this.front]
        } else {
            throw 'Queue is empty'
        }
    }

    // decide whether queue is empty or not
    isEmpty() {
        return this.rear === this.front
    }

    // decide whether queue is full or not
    isFull() {
        return (this.rear + 1) % this.size === this.front
    }
}

let queue = new Queue(6)
for (let i = 0; i < 5; i++) {
    queue.enqueue(i)
}
console.log(queue.isFull())
console.log(queue.dequeue())
