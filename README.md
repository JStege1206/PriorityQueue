# PriorityQueue
PriorityQueue is a Javascript implementation of a min PriorityQueue.

## Documentation
### Constructor
```javascript
var queue = new PriorityQueue(options)
```
The constructor checks if the given options object contains one of the following fields:
* capacity:
  **number** Defines the maximum capacity of the queue. Defaults to the maximum safe integer in
  javascript, which is 2<sup>53</sup>=9007199254740991. When the queue is at maximum length, it
  is no longer possible to add elements to it.
* comperator:
  **function** The comparator to use when comparing elements in the queue. This is used for
  sorting the queue. When adding elements which can not be easily compared, supply a comparator
  which is able to compare the given object. For example, when you have a data type which looks
  like the following:
```javascript
var obj = {
  "value": 4
};
```
  You might want to add a comparator which looks like the following:
```javascript
function comparator(a, b) {
  return a.value - b.value;
}
```
  Not using a right comparator will result in undefined behaviour, possibly not giving the right
  results.
* data:
  **array** The initial dataset to use to create a priority queue from. Accepts an array and
  will add each element seperately.
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

## License
This code is released in the public domain. I do not claim any ownership and waive all my rights.