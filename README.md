# PriorityQueue
PriorityQueue is a Javascript implementation of a min PriorityQueue.

## Documentation
### Constructor
```javascript
var queue = new PriorityQueue(options)
```
The constructor checks if the given options object contains one of the following fields:
* comperator:
  **function** The comparator to use when comparing elements in the queue. This is used for
  sorting the queue. When adding elements which can not be easily compared, supply a comparator
  which is able to compare the given object. Not using a right comparator will result in
  undefined behaviour, possibly not giving the right results. Remember to take null or undefined
  values into account. Default comparator is as follows:
```javascript
function compare(a, b) {
    if (typeof a == 'undefined' || a == null) {
        return 1;
    }
    if (typeof b == 'undefined' || b == null) {
        return -1;
    }
    return a - b;
}
```
* data:
  **array** The initial dataset to use to create a priority queue from. Accepts an array.
* equals:
  **function** The equals function to use. This is used for checking whether or not an element is
   in the queue. By default, equals will check if 2 values are equal by a simple `a == b` check.
   If this is not enough, write your own equals function.

### Methods
* `clear()`:
  Clears the complete queue, removing all elements, restoring the internal queue to an empty array.
* `peek()`:
  Returns the first element in the queue (nb. The 'least' element) without removing it from the
  head of the queue.
* `poll()`:
  Returns the first element in the queue (nb. The 'least' element) and removes it from the head
  of the queue. The queue will then return to a complete binary tree.
* `offer(obj)`:
  Adds the given `obj` to the queue, at it's rightful position.
* `remove(obj)`:
  Removes the given `obj` from the queue, when present. After removal it will return to a
  complete binary tree.
* `contains(obj)`:
  Checks if the given `obj` is present in the queue.
* `getData(reference)`:
  Returns the internal queue array. Mostly usable for debugging purposes. The reference argument
  indicates whether the returned array is passed by reference or if a copy is returned. This
  argument is optional. Note that this will not return a sorted array, it will return the
  internal representation of the queue.
* `setData(data)`:
  Sets the data of the queue. Will return to a complete binary tree after adding.
* `size()`:
  Returns the amount of objects in the queue, is not equal to getArray().length. The internal
  array might be a lot longer when objects are polled/removed from the queue.
* `clone()`:
  Copies the queue by value into a new PriorityQueue object with the same values as the original
  queue.
* `setComparator(func)`:
  Sets the comparator to be used.
* `getComparator()`:
  Returns the comparator used.
* `setEquals(func)`
  Sets the equals function to be used.
* `getEquals()`
  Returns the equals function used.

## License
This code is released in the public domain. I do not claim any ownership and waive all my rights.