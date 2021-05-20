const BinarySearchTree = require ('./BST')

function main() {

    const treeOne = new BinarySearchTree()

    treeOne.insert(3)
    treeOne.insert(1)
    treeOne.insert(4)
    treeOne.insert(6)
    treeOne.insert(9)
    treeOne.insert(2)
    treeOne.insert(5)
    treeOne.insert(7)

    return treeOne
}

main()