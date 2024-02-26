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
    };

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
    };

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
    };

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
    };
    
    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    };

    find(value) {
        return this.findRec(this.root, value);
    };

    findRec(root, value) {
        if (root === null || root.data === value) {
            return root;
        }

        if (value < root.data) {
            return this.findRec(root.left, value);
        } else {
            return this.findRec(root.right, value);
        }
    };

    levelOrder(callback) {
        const resultArray = [];
        const queue = [];
        
        if (this.root !== null) {
            queue.push(this.root);

            while (queue.length > 0) {
                const currentNode = queue.shift();
                resultArray.push(currentNode.data);

                if (callback) {
                    callback(currentNode)
                }

                if (currentNode.left !== null) {
                    queue.push(currentNode.left);
                }

                if (currentNode.right !== null) {
                    queue.push(currentNode.right);
                }
            }

            return resultArray;
        }
    };

    inOrder(callback) {
        const resultArray = [];

        const inOrderTraversal = (node) => {
            if (node !== null) {
                inOrderTraversal(node.left);

                resultArray.push(node.data);

                if (callback && typeof callback === 'function') {
                    callback(node);
                }

                inOrderTraversal(node.right);
            }
        };

        inOrderTraversal(this.root);
        
        return resultArray;   
    };

    preOrder(callback) {
        const resultArray = [];

        const preOrderTraversal = (node) => {
            if (node !== null) {
                resultArray.push(node.data);
                
                if (callback) {
                    callback(node);
                }

                preOrderTraversal(node.left);
                preOrderTraversal(node.right);
            }
        };

        preOrderTraversal(this.root);

        return resultArray;
    }

    postOrder(callback) {
        const resultArray = [];

        const postOrderTraversal = (node) => {
            if (node !== null) {
                postOrderTraversal(node.left);
                postOrderTraversal(node.right);

                resultArray.push(node.data);

                if (callback) {
                    callback(node);
                }

                
            }
        };

        postOrderTraversal(this.root);

        return resultArray;
    };

    height(root) {
        if (root === null) {
            return -1;
        } else {
            const leftHeight = root.left ? this.height(root.left) : -1;
            const rightHeight = root.right ? this.height(root.right) : -1;

            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    depth(root, value) {
        return this.depthRec(this.root, value, 0);
    };

    depthRec(node, value, currentDepth) {
        if (node === null) {
            return -1;
        }

        if (node.data === value) {
            return currentDepth;
        } else if (value < node.data) {
            return this.depthRec(node.left, value, currentDepth + 1);
        } else {
            return this.depthRec(node.right, value, currentDepth + 1);
        }
    };

    isBalanced(root) {
        if (root === null) {
            return true;
        }

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)) {
           return true; 
        } else {
            return false;
        }
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
//t.deleteNode(t.root, 236);
t.deleteNode(t.root, 12);
t.inOrder(t.root);
/*
const searchResult = t.find(23);
const searchResult2 = t.find(56);

if (searchResult2) {
    console.log('The value exist in the tree.');
} else {
    console.log(`The value does not exist in the tree.`);
}

const resultArray = t.levelOrder(node => {
    console.log(node.data);
})*/
console.log('Level Order Result: ', t.levelOrder());

console.log('In Order result: ', t.inOrder());

console.log('Pre Order result: ', t.preOrder());

console.log('Post Order result: ', t.postOrder());

console.log('Height of the Tree: ', t.height(t.root));

const depthOfValue = t.depth(this.root, 236);

if (depthOfValue !== -1) {
    console.log(`Depth of the value: ${depthOfValue}`);
} else {
    console.log('Value not found in the tree.');
}
console.log(t.isBalanced(t.root));

t.prettyPrint(); 