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
array.sort((a,b) => a - b)
const t = new Tree(array);


t.prettyPrint();