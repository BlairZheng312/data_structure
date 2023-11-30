class Node {
    // default type is dir
    constructor(name, type = 'dir') {
        this.name = name
        this.type = type
        this.children = []
        this.parent = null
    }
}

class FileSystem {
    // init current dir as root dir
    constructor() {
        this.root = new Node('/')
        this.current = this.root
    }

    // to create new dir, dir name should end with '/'
    // add new dir as the child of current dir, and current dir as the parent of new dir
    mkdir(name) {
        if (name.slice(-1) !== '/') {
            name = name.concat('/')
        }
        let newDir = new Node(name)
        this.current.children.push(newDir)
        newDir.parent = this.current
    }

    ls() {
        // print out all children dir of current dir
        let dirList = []
        for (let item of this.current.children) {
            dirList.push(item.name)
        }
        console.log(dirList)
    }

    // direct to dir by relative path
    cd(name) {
        // dir name should end with '/'
        if (name.slice(-1) !== '/') {
            name = name.concat('/')
        }

        // cd('..') to go up to parent dir, if the parent dir is root dir, stop going up
        if (name === '../') {
            this.current = this.current.parent ? this.current.parent : this.root
            return
        }

        // iterate children dir of current dir, find the desired child dir, make it current dir
        for (let child of this.current.children) {
            if (child.name === name) {
                this.current = child
                return
            }
        }

        // cannot find the desired child dir, throw error
        throw 'cannot find the file'
    }
}

let file = new FileSystem()

file.mkdir('hello')
file.mkdir('world')
file.mkdir('123')
file.ls()

file.cd('hello')
file.mkdir('abc')
file.mkdir('def')
file.ls()

// file.cd('abc2')
file.cd('abc')
file.ls()

file.cd('..')
file.ls()