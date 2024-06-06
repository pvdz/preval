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
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    s += `read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    s += `write[` + v + `];`;
    a += v;
    return a;
  },
};
obj.x += 5;
$(a, s);
`````

## Normalized


`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    const tmpStringConcatR = $coerce(s, `plustr`);
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinLhs = `write[${tmpStringConcatL}`;
    const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
    const tmpBinBothRhs = `${tmpStringConcatR$1}];`;
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
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    s = `${s}read;`;
    return a;
  },
  set x($$0) {
    const v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinBothRhs = `write[${tmpStringConcatL}];`;
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

## PST Output

With rename=true

`````js filename=intro
let a = "";
let b = 0;
const c = {
get x() {
    debugger;
    a = `${[object Object]}read;`;
    return b;
  },,
set x( $$0 ) {
    const d = e;
    debugger;
    const f = a;
    const g = $coerce( d, "plustr" );
    const h = `write[${[object Object]}];`;
    a = f + h;
    b = b + d;
    return b;
  },
;
const i = c.x;
const j = i + 5;
c.x = j;
$( b, a );
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
