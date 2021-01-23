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
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryLeft;
    var tmpBinaryLeft$1;
    var tmpBinaryRight;
    tmpBinaryLeft = s;
    tmpBinaryLeft$1 = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft$1 + '];';
    s = tmpBinaryLeft + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpCompoundAssignLhs = obj.x;
tmpAssignMemLhsObj = obj;
tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, s);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
let s = '';
let a = 0;
const obj = {
  get x() {
    s = s + 'read;';
    return a;
  },
  set x(v) {
    var tmpBinaryLeft;
    var tmpBinaryLeft$1;
    var tmpBinaryRight;
    tmpBinaryLeft = s;
    tmpBinaryLeft$1 = 'write[' + v;
    tmpBinaryRight = tmpBinaryLeft$1 + '];';
    s = tmpBinaryLeft + tmpBinaryRight;
    a = a + v;
    return a;
  },
};
tmpCompoundAssignLhs = obj.x;
tmpAssignMemLhsObj = obj;
tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, s);
`````

## Result

Should call `$` with:
 - 0: 5,"read;write[5];"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
