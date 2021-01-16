# Preval test case

# property.md

> normalize > compound > property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() { 
    s += 'read;';
    return a;
  },
  set x(v) {
    s += 'write[' + v + '];';
    a += v;
    return a;
  }
};

obj.x += 5; // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft_1;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryRight;
    var tmpBinaryLeft;
    tmpBinaryLeft = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft + '];';
    s = s + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpBinaryLeft_1 = obj.x;
obj.x = tmpBinaryLeft_1 + 5;
$(a, s);
`````

## Output

`````js filename=intro
var tmpBinaryLeft_1;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryRight;
    var tmpBinaryLeft;
    tmpBinaryLeft = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft + '];';
    s = s + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpBinaryLeft_1 = obj.x;
obj.x = tmpBinaryLeft_1 + 5;
$(a, s);
`````
