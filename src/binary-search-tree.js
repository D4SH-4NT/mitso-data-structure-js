import { Node } from '../extensions/list-tree.js';

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
export default class BinarySearchTree {
  _root = null;
  
  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;

    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) return current;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    let parent = null;
    let current = this._root;

    while (current !== null && current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) return;

    // Случай 1: лист
    if (current.left === null && current.right === null) {
      if (parent === null) {
        this._root = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    // Случай 2: один ребёнок
    if (current.left === null || current.right === null) {
      const child = current.left !== null ? current.left : current.right;
      if (parent === null) {
        this._root = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }

    // Случай 3: два ребёнка — берём минимум из правого поддерева
    let minParent = current;
    let minNode = current.right;

    while (minNode.left !== null) {
      minParent = minNode;
      minNode = minNode.left;
    }

    current.data = minNode.data;

    if (minParent.left === minNode) {
      minParent.left = minNode.right;
    } else {
      minParent.right = minNode.right;
    }
  }

  min() {
    if (this._root === null) return null;

    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this._root === null) return null;

    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
};
