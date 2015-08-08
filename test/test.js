window.addEventListener('load', function() {
  log('Starting Tests...', 'h2');

  test(
      'Testing priority sorting',
      'Checks whether or not the sorting based on priority happens correctly.',
      testEquality
  );

  test(
      'Testing comparator',
      'Checks if the priority queue also works correctly when using arbitrary' +
      ' objects.',
      testComparator
  );

  test(
      'Testing removing objects',
      'Checks if object is correctly removed from the queue. Also tests equal' +
      ' function.',
      testRemove
  );

  test(
      'Testing clearing queue',
      'Checks whether the queue is empty after calling clear().',
      testClear
  );

  test(
      'Test contains()',
      'Checks if the queue contains certain elements',
      testContains
  );

  test(
      'Test peek()',
      'Checks if peeking on the queue does not alter the queue.',
      testPeek
  );

  test(
      'Test clone()',
      'Checks whether the clone is actually copied by value.',
      testClone
  );

  test(
      'Test setData()',
      'Tests whether setData() returns a proper PriorityQueue when given' +
      ' 10000 random numbers.',
      testSetData
  );
});

function log(txt, el) {
  if (document) {
    el = document.createElement(el ? el : 'pre');
    el.innerText = txt;
    document.getElementById('body').appendChild(el);
  }
  console.log(txt);
}

function test(testname, desc, callback) {
  log('Starting test: ' + testname, 'h3');
  log(desc, 'p');
  var error;
  try {
    callback();
  } catch (e) {
    error = e.message;
  }
  log('Testing done. ' + (error ? 'FAIL' : 'SUCCESS'), 'p');
  if (error) {
    log(error, 'pre');
  }
}

function testEquality() {
  var queue = new net.jstege1206.PriorityQueue();
  var rand, i;
  var arr = [];
  for (i = 0; i < 10000; i++) {
    rand = (Math.random() * 101) | 0;
    queue.offer(rand);
    arr.push(rand);
  }
  arr.sort(function(a, b) { return a - b; });
  for (i = 0; i < 100; i++) {
    var q = queue.poll();
    if (arr[i] != q) {
      throw new Error('Elements are not equal: ' + arr[i] + '-' + q);
    }
  }
}

function testComparator() {
  var createObject = function(val) {this.value = val;};
  var queue = new net.jstege1206.PriorityQueue({
    comparator: function(a, b) {return a.value - b.value;}
  });
  var rand, i;
  var arr = [];
  for (i = 0; i < 10000; i++) {
    rand = (Math.random() * 101) | 0;
    queue.offer(new createObject(rand));
    arr.push(new createObject(rand));
  }
  arr.sort(function(a, b) { return a.value - b.value; });
  for (i = 0; i < 100; i++) {
    var q = queue.poll();
    if (arr[i].value != q.value) {
      throw new Error('Elements are not equal: ' +
          arr[i].value + '-' + q.value);
    }
  }
}

function testRemove() {
  var createObject = function(val) {this.value = val;};
  var queue = new net.jstege1206.PriorityQueue({
    comparator: function(a, b) {return a.value - b.value;},
    equals: function(a, b) {return a.value == b.value}
  });
  queue.offer(new createObject(0));
  queue.offer(new createObject(1));
  queue.offer(new createObject(2));

  queue.remove(new createObject(1));
  if (queue.size() != 2) {
    throw new Error('Error when removing object. ' + queue.getData());
  }
  console.log(queue.getData());
  queue.poll();
  if (queue.poll().value != 2) {
    throw new Error('Error when removing object. ' + queue.getData());
  }
}

function testClear() {
  var queue = new net.jstege1206.PriorityQueue();
  var rand, i;
  for (i = 0; i < 10000; i++) {
    rand = (Math.random() * 101) | 0;
    queue.offer(rand);
  }
  var qs = queue.size();
  queue.clear();
  if (qs != 0 && queue.size() != 0) {
    throw new Error('Error when clearing the queue. Queue not empty. ' +
        queue.getData());
  }
}

function testContains() {
  var createObject = function(val) {this.value = val;};
  var queue = new net.jstege1206.PriorityQueue({
    comparator: function(a, b) {return a.value - b.value;},
    equals: function(a, b) {return a.value == b.value}
  });
  queue.offer(new createObject(0));
  queue.offer(new createObject(1));
  queue.offer(new createObject(2));

  if (!queue.contains(new createObject(0))) {
    throw new Error('Error checking if queue contains 0. Should return true.');
  }
  if (!queue.contains(new createObject(1))) {
    throw new Error('Error checking if queue contains 1. Should return true.');
  }
  if (!queue.contains(new createObject(2))) {
    throw new Error('Error checking if queue contains 2. Should return true.');
  }
  if (queue.contains(new createObject(3))) {
    throw new Error('Error checking if queue contains 2. Should return false.');
  }
}

function testPeek() {
  var queue = new net.jstege1206.PriorityQueue();
  if (queue.peek() != null) {
    throw new Error('Error while peeking. Peeking on an empty queue should' +
        ' return null. Returns ' + queue.peek());
  }
  queue.offer(2);
  if (queue.peek() != 2) {
    throw new Error('Error while peeking. Should return 2, returns ' +
        queue.peek());
  }
  if (queue.size() != 1) {
    throw new Error('Error while peeking. Peeking altered queue size.');
  }
}

function testClone() {
  var queue = new net.jstege1206.PriorityQueue();
  queue.offer(1);
  var queue2 = queue.clone();
  queue2.offer(2);
  if (queue.getData(true) == queue2.getData(true)) {
    throw new Error('Error while cloning. Queues are still the same object.');
  }
}


function testSetData() {
  var queue = new net.jstege1206.PriorityQueue();
  var rand, i;
  var arr = [];
  for (i = 0; i < 10000; i++) {
    rand = (Math.random() * 101) | 0;
    arr.push(rand);
  }
  queue.setData(arr);
  arr.sort(function(a, b) { return a - b; });
  for (i = 0; i < 100; i++) {
    var q = queue.poll();
    if (arr[i] != q) {
      throw new Error('Elements are not equal: ' + arr[i] + '-' + q);
    }
  }
}
