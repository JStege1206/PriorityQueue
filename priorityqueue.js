/**
 * PriorityQueueJS, a priority queue implementation in Javascript.
 * Supports queueing, dequeuing, fixed and variable capacity and removing
 * elements from the queue by value.
 *
 * @author jstege1206@gmail.com (Jelle Stege)
 */
if (typeof net === 'undefined') {
  var net = {};
}
if (!('jstege1206' in net)) {
  /**
   * Create namespace
   * @type {{}}
   */
  net.jstege1206 = {};
}

(function() {
  'use strict';

  /**
   * Default comparator, returns < 0 if b > a, > 0 if a > b and 0 if a == b.
   * @param {*} a The first object.
   * @param {*} b the second object.
   * @return {number} The value representing the comparison.
   */
  var DEFAULT_COMPARATOR = function(a, b) {
    return a - b;
  };

  /**
   * Default equals function, returns true if a == b. False if otherwise.
   * @param {*} a First object.
   * @param {*} b Second object.
   * @returns {boolean} True if a and b are equal, false if otherwise.
   */
  var DEFAULT_EQUALS = function(a, b) {
    return a == b;
  };

  /**
   * Default capacity, queue can not handle more elements than this.
   * Defaults to the maximum safe integer in Javascript (2^53 - 1).
   * @type {Number}
   */
  var DEFAULT_CAPACITY = (Math.pow(2, 53) - 1)|0;

  /**
   * The internal queue array.
   * @type {Array}
   */
  var queue;
  /**
   * The queue length, can not use queue.length since it does not represent
   * the actual queue length (adding and removing an element will still
   * result in queue.length == 1). Maintaining it manually will fix this.
   */
  var queueLength;

  /**
   * PriorityQueue constructor, constructs a new PriorityQueue. Options are a
   * simple JSON object with argument names. Argument names include:
   *  - comparator: The comparator to use, uses same implementation as the
   *      compareFunction implementation in Array.prototype.sort().
   *  - equals: The equals function to use.
   *  - capacity: The capacity of the queue, defines the maximum size of the
   *      queue. When the queue exceeds this size any new additions will
   *      throw an error.
   *  - data: The initial data to be used for the queue. Only accepts arrays.
   * @param {*} options options object,
   * @constructor
   */
  function PriorityQueue(options) {
    queue = [];
    queueLength = 0;
    if ('comparator' in options && typeof options.comparator == 'function') {
      this.comparator = options.comparator;
    } else {
      this.comparator = DEFAULT_COMPARATOR;
    }

    if ('equals' in options && typeof options.equals == 'function') {
      this.equals = options.equals;
    } else {
      this.equals = DEFAULT_EQUALS;
    }

    if ('capacity' in options &&
      typeof options.capacity == 'number' &&
      options.capacity >= 0) {
      this.capacity = options.capacity;
    } else {
      this.capacity = DEFAULT_CAPACITY;
    }

    if ('data' in options && typeof options.data == 'object' && options.data[0]) {
      options.data.forEach(function(val) {
        this.offer(val);
      });
    }
  }

  /**
   * Clears whole queue, removing all elements from it.
   */
  PriorityQueue.prototype.clear = function() {
    queue = [];
    queueLength = 0;
  };

  /**
   * Returns the first object in the queue, without removing it.
   * @returns {*} The first object in the queue.
   */
  PriorityQueue.prototype.peek = function() {
    if (queueLength == 0) {
      return null;
    }
    return queue[0];
  };

  /**
   * Returns the first object in the queue and removes it from the queue.
   * @returns {*} The first object in the queue.
   */
  PriorityQueue.prototype.poll = function() {
    if (queueLength == 0) {
      return null;
    }
    var s = --queueLength;
    var result = queue[0];
    var x = queue[s];
    queue[s] = null;
    if (s != 0) {
      _siftDown(0, x);
    }
    return result;
  };

  /**
   * Adds an object to the queue. Returns false if this is not possible due
   * to a full capacity.
   * @param obj The object to store in the queue.
   * @returns {boolean} True if the object is added, false if otherwise.
   */
  PriorityQueue.prototype.offer = function(obj) {
    if (queueLength == this.capacity) {
      //Throw error or something.
      return false;
    } else {
      queueLength++;
      if (queueLength - 1 == 0) {
        queue[0] = obj;
      } else {
        _siftUp(queueLength - 1, obj);
      }
      return true;
    }
  };

  /**
   * Removes an item from the queue by using the given object as identifier.
   * Will use the equals function of this PriorityQueue object to compare
   * objects.
   * @param obj The object to remove.
   * @returns {boolean} False if object was not found, true if it was found
   * and removed.
   */
  PriorityQueue.prototype.remove = function(obj) {
    var i = _indexOf(obj, this.equals);
    if (i == -1) {
      return false;
    } else {
      _removeAt(i);
      return true;
    }
  };

  /**
   * Returns whether or not the given object is in the queue or not.
   * @param obj The object to find.
   * @returns {boolean} True if the queue contains the object, false if
   * otherwise.
   */
  PriorityQueue.prototype.contains = function(obj) {
    return _indexOf(obj, this.equals) != -1;
  };

  /**
   * Restores the complete binary tree by sifting down the given object.
   * @param {Number} pos The position to start sifting down from.
   * @param {*} obj The object to sift down.
   * @private
   */
  function _siftDown(pos, obj) {
    var half = queueLength / 2;
    while (pos < half) {
      var lChild = pos * 2 + 1;
      var c = queue[lChild];
      var rChild = lChild + 1;
      if (rChild < queueLength && this.comparator(c, queue[rChild]) > 0) {
        lChild = rChild;
        c = queue[lChild];
      }
      if (this.comparator(obj, c) <= 0) {
        break;
      }
      queue[pos] = c;
      pos = lChild;
    }
  }

  /**
   * Restores the complete binary tree by sifting up the given object.
   * @param {Number} pos The position to start sifting up from.
   * @param {*} obj The object to sift up.
   * @private
   */
  function _siftUp(pos, obj) {
    while (pos > 0) {
      var parent = ((pos - 1) / 2)|0;
      var c = queue[parent];
      if (this.comparator(obj, c) >= 0) {
        break;
      }
      queue[pos] = c;
      pos = parent;
    }
  }

  /**
   * Remove an element at the given position. Will restore the complete binary
   * tree after removing the element.
   * @param pos The position from which to remove the element.
   * @returns {*} The element which was removed, or null if the element was
   * not found.
   * @private
   */
  function _removeAt(pos) {
    var s = queueLength - 1;
    if (s == pos) {
      queue[s] = null;
    } else {
      var moved = queue[s];
      queue[s] = null;
      _siftDown(pos, moved);
      if (this.equals(queue[pos], moved)) {
        _siftUp(pos, moved);
        if (!this.equals(queue[pos], moved)) {
          return moved;
        }
      }
    }
    return null;
  }

  /**
   * Returns the position of the given object in the queue.
   * @param obj The object to find.
   * @param equals The equals function to use.
   * @returns {number} The position in the queue the element is at, -1 if
   * not found.
   * @private
   */
  function _indexOf(obj, equals) {
    if (obj != null) {
      for (var i = 0; i < queueLength; i++) {
        if (equals(obj, queue[i])) {
          return i;
        }
      }
    }
    return -1;
  }

  net.jstege1206.PriorityQueue = PriorityQueue;
})();