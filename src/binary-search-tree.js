const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = this.insertNode(this._root, data);
  }

  insertNode(node, data) {
    if (node === null) {
      return new Node(data);
    }
    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    }
    return node;
  }

  has(data) {
    return this.search(this._root, data);
  }

  search(node, data) {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else {
      return this.search(node.right, data);
    }
  }

  find(data) {
    return this.findNode(this._root, data);
  }

  findNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this.findNode(node.left, data);
    } else {
      return this.findNode(node.right, data);
    }
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key === node.data) {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.removeNode(node.right, minRightNode.data);
      return node;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else {
      node.right = this.removeNode(node.right, key);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this.findMinNode(node.left);
  }

  min() {
    const minNode = this.findMinNode(this._root);
    return minNode ? minNode.data : null;
  }

  findMaxNode(node) {
    if (node.right === null) {
      return node;
    }
    return this.findMaxNode(node.right);
  }

  max() {
    const maxNode = this.findMaxNode(this._root);
    return maxNode ? maxNode.data : null;
  }
}

module.exports = {
  BinarySearchTree,
};
