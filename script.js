class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }   
}

class Tree {
    constructor(array) {
        if (array.length === 0) {
            this.root = null        
        } else {
            this.root = this.buildTree(array, 0, array.length - 1);
        }
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        const middle = Math.floor((start + end) / 2);
        const newNode = new Node(array[middle]);

        newNode.left = this.buildTree(array, start, middle - 1);
        newNode.right = this.buildTree(array, middle + 1, end);

        return newNode;

    };

    insert(value) {
        this.root = this.insertRec(this.root, value);
    }

    insertRec(root, value) {
        if (root == null) {
            root = new Node(value);
            return root;
        }

        if (value < root.data) {
            root.left = this.insertRec(root.left, value);
        } else if (value > root.data) {
            root.right = this.insertRec(root.right, value);
        }

        return root;
    }

    inOrder(root) {
        if (root !== null) {
            this.inOrder(root.left);
            console.log(root.data);
            this.inOrder(root.right);
        }
    }

    deleteNode(root, data) {
        if (root === null) {
            return root;
        }
    
        if (root.data > data) {
            root.left = this.deleteNode(root.left, data);
        } else if (root.data < data) {
            root.right = this.deleteNode(root.right, data);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
    
            let successor = this.findMin(root.right);
            root.data = successor.data;
            root.right = this.deleteNode(root.right, successor.data);
        }
    
        return root;
    }
    
    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    

    prettyPrint() {
        const printNode = (newNode, prefix = "", isLeft = true) => {
            if (newNode === null) {
              return;
            }
            if (newNode.right !== null) {
              printNode(newNode.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${newNode.data}`);
            if (newNode.left !== null) {
              printNode(newNode.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
          };

    printNode(this.root);
    }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = array.sort((a,b) => a - b)

console.log(sortedArray);

const t = new Tree(sortedArray);

t.insert(236);
t.insert(12);
t.deleteNode(t.root, 236);
t.deleteNode(t.root, 5);
t.inOrder(t.root);
t.prettyPrint(); 