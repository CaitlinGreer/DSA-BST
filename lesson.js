class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key //if key is null object represents an empty tree
        this.value = value 
        this.parent = parent //if parent pointer is null you are dealing with a root node
        this.left = null
        this.right = null
    }

// Binary search trees support 3 operations: insert, remove, and find

//INSERTION
/* if no existing tree the 1st item we insert will be inserted as the root
   if existing tree we have to find the right place for the item we want to insert and then insert it.  
*/

    insert(key, value) {
        //if the tree is empty this key being inserted is the root node of the tree
        if (this.key === null) {
            this.key = key
            this.value = value
        }

        //if tree already exists, start at the root and compare to the key you want to insert.
        //if new key is < node's key new node needs to live in the left-hand branch
        else if (key < this.key) {
            //if exisiting node doesn't have left child, we can just instantiate and insert new node as left child
            //passing `this` as the parent
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            /* if node has an existing left child,
            we recursively call the `insert` method so the node is added further down the tree */
            else {
                this.left.insert(key, value)
            }
        }

        // If the new key is > the node's key 
        // then you do the same thing but on the right-hand side 
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            }
            else {
                this.right.insert(key, value)
            }
        }
    }

/* RETRIEVAL 
    follows the same pattern as insertion.  
    Check value of the key against key stored in a node in the BST 
    and recursively follow the left or right branch accordingly
*/
    find(key) {
        // if key is found at the root then return that value
        if (this.key == key) {
            return this.value
        }
        //if item is less than root follow left child, if there's an existing left child
        //recursively check it's left and/or right child until you find the item
        else if (key < this.key && this.left) {
            return this.left.find(key)
        }
        //if item is greater than root then follow right child...
        else if (key > this.key && this.right) {
            return this.right.find(key)
        }
        //if item is not in the tree
        else {
            throw new Error('Key Error')
        }
    }

// REMOVAL

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            }
            /* if node only has a left child, then replace node with it's left child */
            else if (this.left) {
                this._replaceWith(this.left)
            }
            /* if node only has right child, replace it with it's right child */
            else if (this.right) {
                this._replaceWith(this.right)
            }
            /* if node has no children remove it and any references to it */
            else {
                this._replaceWith(null)
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key)
        }
        else if (key > this.key && this.right) {
            this.right.remove(key)
        }
        else {
            throw new Error('Key error')
        }
    }

/*replaceWith() used to find the node you want to use to replace a node that has children. 
If the node you are replacing has a parent then you need to wire up the references from the 
parent to the replacement node, and the replacement node back to the parent. 
Otherwise, if the node is a root node then you simply copy over the properties of the replacement node*/ 

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            }
            else if (this == this.parent.right) {
                this.parent.right = node
            }
            if (node) {
                node.parent = this.parent
            }
        }
        else {
            if (node) {
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            }
            else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }
/* findMin() is used to find the minimum value from the right subtree. 
When you are removing a node from the tree that has 2 children, 
you want to replace the node with the smallest node from the right subtree. */

    _findMin() {
        if (!this.left) {
            return this
        }
        return this.left._findMin()
    }
}