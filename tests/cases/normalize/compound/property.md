# Preval test case

# property.md

> Normalize > Compound > Property
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

## Pre Normal

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() {
    debugger;
    s += 'read;';
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    s += 'write[' + v + '];';
    a += v;
    return a;
  },
};
obj.x += 5;
$(a, s);
`````

## Normalized

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() {
    debugger;
    s = s + 'read;';
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpBinLhs = 'write[' + v;
    const tmpBinBothRhs = tmpBinLhs + '];';
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpCompoundAssignLhs = obj.x;
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````

## Output

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() {
    debugger;
    s = s + 'read;';
    return a;
  },
  set x($$0) {
    const v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpBinLhs = 'write[' + v;
    const tmpBinBothRhs = tmpBinLhs + '];';
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpCompoundAssignLhs = obj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
obj.x = tmpAssignMemRhs;
$(a, s);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 'read;write[5];'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
