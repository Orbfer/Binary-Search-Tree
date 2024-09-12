class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr) {
    let sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    let arrLength = sortedArr.length;
    if (arrLength === 0) return null;
    const mid = Math.floor(arrLength / 2);
    const node = new Node(sortedArr[mid]);
    node.left = this.buildTree(sortedArr.slice(0, mid));
    node.right = this.buildTree(sortedArr.slice(mid + 1));
    return node;
  }
  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }
  deleteItem(value, node = this.root) {
    if (node === null) return node;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minNode = this.findMin(node.right);
      node.data = minNode.data;
      node.right = this.deleteItem(minNode.data, node.right);
    }
    return node;
  }
  findMin(node) {
    while (node.left !== null) node = node.left;
    return node;
  }
  find(value, node = this.root) {
    if (node === null) return node;
    if (value === node.data) {
      return node;
    }
    if (value < node.data) {
      return this.find(value, node.left);
    } else return this.find(value, node.right);
  }
  levelOrder(callback) {
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
  }
  inOrder(callback, node = this.root) {
    if (node !== null) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }
  preOrder(callback, node = this.root) {
    if (node !== null) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }
  postOrder(callback, node = this.root) {
    if (node !== null) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }
  prettyPrint() {
    const prettyPrintHelper = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrintHelper(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrintHelper(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    };
    prettyPrintHelper(this.root);
  }
}
let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(testArr);
tree.prettyPrint();
