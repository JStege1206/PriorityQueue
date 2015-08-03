/**
 * PriorityQueueJS, a priority queue implementation in Javascript.
 * Supports queueing, dequeuing, fixed and variable capacity and removing
 * elements from the queue by value.
 *
 * @author jellestege@gmail.com (Jelle Stege)
 */
if (typeof net === 'undefined') {
  var net = {};
}
if (!('queue' in net)) {
  /**
   * Queue namespace
   * @type {{}}
   */
  net.queue = {};
}

(function() {
  'use strict';

  var DEFAULT_COMPARATOR = function(a, b) {
    return a - b;
  };
  var DEFAULT_CAPACITY = Number.MAX_VALUE;

  /**
   * HeapNode, the internal storage data structure that stores the given
   * object.
   * @param {*} obj The object to store, can be anything.
   * @constructor
   */
  function HeapNode(obj) {
    this.value = obj;
    this.left = null;
    this.right = null;
  }

  /**
   * PriorityQueue constructor, constructs a new PriorityQueue. Options are a
   * simple JSON object with argument names. Argument names include:
   *  - comparator: The comparator to use, uses same implementation as the
   *      compareFunction implementation in Array.prototype.sort().
   *  - capacity: The capacity of the queue, defines the maximum size of the
   *      queue. When the queue exceeds this size the last element is removed.
   * @param {*} options options object,
   * @constructor
   */
  function PriorityQueue(options) {
    if ('comparator' in options && typeof options.comparator == 'function') {
      this.comparator = options.comparator;
    } else {
      this.comparator = DEFAULT_COMPARATOR;
    }

    if ('capacity' in options &&
      typeof options.capacity == 'number' &&
      options.capacity >= 0) {
      this.capacity = options.capacity;
    } else {
      this.capacity = DEFAULT_CAPACITY;
    }

    this.root = null;
  }

  PriorityQueue.prototype.queue = function(obj) {
    var he = new HeapNode(obj)
    if (this.root == null) {
      this.root = he;
    }
  }
})();