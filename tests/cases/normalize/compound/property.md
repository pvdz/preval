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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft_2;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryLeft;
    var tmpBinaryRight;
    var tmpBinaryLeft_1;
    tmpBinaryLeft = s;
    tmpBinaryLeft_1 = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft_1 + '];';
    s = tmpBinaryLeft + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpAssignMemLhsObj = obj;
tmpBinaryLeft_2 = obj.x;
tmpAssignMemRhs = tmpBinaryLeft_2 + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft_2;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryLeft;
    var tmpBinaryRight;
    var tmpBinaryLeft_1;
    tmpBinaryLeft = s;
    tmpBinaryLeft_1 = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft_1 + '];';
    s = tmpBinaryLeft + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpAssignMemLhsObj = obj;
tmpBinaryLeft_2 = obj.x;
tmpAssignMemRhs = tmpBinaryLeft_2 + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````

## Result

Should call `$` with:
[[5, 'read;write[5];'], null];

Normalized calls: Same

Final output calls: Same
