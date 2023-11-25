// stack: linear data structure
// FILO => add/delete element at the end stack

class Stack {
    // initiate empty stack
    constructor() {
        this.items = []
    }

    // add element at the end
    push(item) {
        this.items.push(item)
    }

    // if the stack is not empty, remove the last element
    pop() {
        if (this.isEmpty()) {
            throw 'Stack is empty'
        }
        return this.items.pop()
    }

    // if the stack is not empty, read the last element
    getTop() {
        if (this.isEmpty()) {
            throw 'Stack is empty'
        }
        return this.items[this.items.length - 1]
    }

    // decide whether stack is empty or not
    isEmpty() {
        return this.items.length === 0
    }
}

// stack can be used to check if the brackets in string are matched
function bracketMatch(str) {
    let bracketMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    // get all the left brackets
    let leftBrackets = Object.keys(bracketMap)

    let strStack = new Stack()

    // iterate string
    for (let char of str) {
        // for any left bracket, push to stack
        if (leftBrackets.indexOf(char) !== -1) {
            strStack.push(char)
        }

        // for any right bracket, check the stack top
        else {
            // if there nothing in the stack, no matching left bracket, return false
            if (strStack.isEmpty()) {
                return false
            }
            // if the stack top match the right bracket, pop the stack
            else if (bracketMap[strStack.getTop()] === char) {
                strStack.pop()
            }
            // if the stack top does not match the right bracket, return false
            else {
                return false
            }
        }
    }

    // if after iterate all the brackets, the stack is empty => all brackets are matched and cancelled out in the stack
    return strStack.isEmpty()

}

console.log(bracketMatch('({]})'))
console.log(bracketMatch('({[]})'))
console.log(bracketMatch('()[]{([])}'))

